import os
import requests
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
COHERE_MODEL = os.getenv("COHERE_MODEL", "command-a-03-2025")

# Function to call Gemini API
def call_gemini_api(bill_data): 
    if not GEMINI_API_KEY:
        return "Error: GEMINI_API_KEY is not set in your .env"

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

    api_url = "https://api.cohere.com/v1/chat"
    headers = {
        "Authorization": f"Bearer {GEMINI_API_KEY}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": COHERE_MODEL,
        "message": prompt, 
        "max_tokens": 600,
        "temperature": 0.3,
    }

    response = requests.post(api_url, headers=headers, json=payload, timeout=30)
    if response.status_code == 200:
        # /v1/generate returns: { generations: [ { text: "..."} ], ... }
        data = response.json()

        # Cohere chat can return either top-level "text" or a "message" object.
        if isinstance(data, dict):
            if "text" in data and isinstance(data["text"], str):
                return data["text"].strip()

            msg = data.get("message")
            if isinstance(msg, dict):
                # message.content is a list of content parts: [{"type":"text","text":"..."}]
                parts = msg.get("content") or []
                texts = [p.get("text", "") for p in parts if p.get("type") == "text"]
                if texts:
                    return "\n".join(t.strip() for t in texts if t.strip())
    else:
        return f"Error: {response.status_code} - {response.text}"