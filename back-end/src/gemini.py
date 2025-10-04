import requests

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