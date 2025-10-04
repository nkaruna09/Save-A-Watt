from flask import Flask, request, jsonify
import pdfplumber 
import re # helps search for patterns

app = Flask(__name__)

# Function to extract text from PDF
def extract_text_from_pdf(file_path):
    text = "" 
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"

    bill_data = {} 

    if "Time-of-Use" in text or "Peak" in text: 
        bill_data["bill_type"] = "TOU"
        peak = peak = re.search(r"Peak.*?([\d,.]+)\s?kWh", text)
        off_peak = re.search(r"Off[- ]Peak.*?([\d,.]+)\s?kWh", text)
        mid_peak = re.search(r"Mid[- ]Peak.*?([\d,.]+)\s?kWh", text)
        bill_data["Peak_kWh"] = float(peak.group(1).replace(",", "")) if peak else 0
        bill_data["OffPeak_kWh"] = float(off_peak.group(1).replace(",", "")) if off_peak else 0
        bill_data["MidPeak_kWh"] = float(mid_peak.group(1).replace(",", "")) if mid_peak else 0
    elif "Tier 1" in text and "Tier 2" in text:
        bill_data["bill_type"] = "Tiered"
        tier1 = re.search(r"Tier 1.*?([\d,.]+)\s?kWh", text)
        tier2 = re.search(r"Tier 2.*?([\d,.]+)\s?kWh", text)
        bill_data["Tier1_kWh"] = float(tier1.group(1).replace(",", "")) if tier1 else 0
        bill_data["Tier2_kWh"] = float(tier2.group(1).replace(",", "")) if tier2 else 0
    elif "Total Usage" in text:
        bill_data["bill_type"] = "Flat/ULO"
        total = re.search(r"Total Usage.*?([\d,.]+)\s?kWh", text)
        bill_data["Total_kWh"] = float(total.group(1).replace(",", "")) if total else 0
    else: 
        # if none of the expected keywords are not found, return invalid 
        return {"error": "Invalid PDF: Could not detect a valid electricity bill."}
    
    cost = re.search(r"Total Amount Due[:\s\$]*([\d,.]+)", text)
    bill_data["Total_Cost"] = float(cost.group(1).replace(",", "")) if cost else None

    # Additional validation: if key usage fields are all zero, treat as invalid
    usage_values = [v for k, v in bill_data.items() if "_kWh" in k]
    if all(val == 0 for val in usage_values):
        return {"error": "Invalid PDF: No electricity usage data found."}
    
    return bill_data


