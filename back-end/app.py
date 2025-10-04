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
    else:
        bill_data["bill_type"] = "Flat/ULO"
        total = re.search(r"Total Usage.*?([\d,.]+)\s?kWh", text)
        bill_data["Total_kWh"] = float(total.group(1).replace(",", "")) if total else 0

    cost = re.search(r"Total Amount Due[:\s\$]*([\d,.]+)", text)
    bill_data["Total_Cost"] = float(cost.group(1).replace(",", "")) if cost else None

    return bill_data

