from flask import Flask, request, jsonify
import pdfplumber 
import re # helps search for patterns
import requests

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

# Function to call Gemini API
def call_gemini_api(bill_data): 
    prompt = f"""
    The household bill details are as follows:
    {bill_data}  # Replace this with the parsed dictionary from the PDF (TOU/Tiered/Flat)
    Instructions:
    1. Analyze the electricity usage and costs.
    2. For **Time-of-Use (TOU) bills**, give tips on shifting usage to off-peak hours and other low-cost energy-saving strategies.
    3. For **Tiered bills**, give tips on keeping monthly usage under the lower-cost tier.
    4. For **Flat/ULO bills**, give tips on reducing overall consumption with cost-effective measures.
    5. Identify relevant subsidy or energy assistance programs available in Ontario for low-income households (e.g., LEAP, Time-of-Use discounts, energy-efficient appliance rebates). Explain in **plain language** how to apply or benefit from them.
    6. Provide a **short summary (3–5 bullet points)** that the household can act on immediately.
    7. Avoid technical jargon; use simple, easy-to-understand language.


    Example Output Format:
    ---
    Energy-Saving Tips:
    - Tip 1
    - Tip 2
    - Tip 3


    Subsidy / Assistance Programs:
    - Program 1: Short explanation + application guidance
    - Program 2: Short explanation + application guidance
    ---
    """

    api_url = ""
    headers = {"Authorization": "Bearer YOUR_GEMINI_API_KEY"}
    payload = {"prompt": prompt, "max_tokens": 1000}

    response = requests.post(api_url, headers=headers, json=payload)
    if response.status_code == 200:
        return response.json()["text"]  # assuming Gemini returns 'text'
    else:
        return f"Error: {response.status_code} - {response.text}"
