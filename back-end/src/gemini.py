import os
import json
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash") 

# Ultra-minimal schema (only widely accepted keys)
SCHEMA = {
    "type": "object",
    "properties": {
        "tips": {
            "type": "object",
            "properties": {
                "currentUsage": {"type": "integer"},
                "currentBill": {"type": "number"},
                "estimatedSavings": {"type": "integer"},
                "percentageSaving": {"type": "integer"},
                "efficiencyScore": {"type": "integer"},
                "tips": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "title": {"type": "string"},
                            "savings": {"type": "string"},       # "$15/month"
                            "description": {"type": "string"},
                            "cost": {"type": "string"},          # "$30 upfront" | "$0"
                            "payback": {"type": "string"},       # "Immediate" | "2 months" | "1 year"
                            "category": {"type": "string"}       # "TOU" | "Tiered" | "Flat/ULO" | "Personal" | "Combined"
                        },
                        "required": [
                            "title", "savings", "description",
                            "cost", "payback", "category"
                        ]
                    }
                }
            },
            "required": [
                "currentUsage", "currentBill", "estimatedSavings",
                "percentageSaving", "efficiencyScore", "tips"
            ]
        },
        "subsidies": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "name": {"type": "string"},
                    "amount": {"type": "string"},        # e.g., "Up to $8,000" or "$35–$75/month"
                    "description": {"type": "string"},
                    "eligibility": {"type": "string"},
                    "howToApply": {"type": "string"},     # single string (not array)
                    "status": {"type": "string"},         # "Available" | "Paused" | "Varies"
                    "url": {"type": "string"}
                },
                "required": [
                    "name", "amount", "description", "eligibility",
                    "howToApply", "status", "url"
                ]
            }
        }
    },
    "required": ["tips", "subsidies"]
}

def call_gemini_api(bill_data):
    if not GEMINI_API_KEY:
        return "Error: GEMINI_API_KEY is not set in your .env"

    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel(GEMINI_MODEL)

    prompt = f"""
    You are an energy-cost assistant for Ontario, Canada. Write at a grade-6 reading level. Be concise. No emojis.

    CONTEXT (verbatim JSON from the app):
    {bill_data}

    RETURN FORMAT
    Return ONLY valid JSON with this exact shape and key names:

    {{
    "tips": {{
        "currentUsage": <integer>,            // parse from bill_data.data.monthlyUsage; default 850
        "currentBill": <number>,              // parse from bill_data.data.monthlyBill; default 125
        "estimatedSavings": <integer>,        // total realistic (slightly exagerrated) $/month from all tips (not a simple sum)
        "percentageSaving": <integer>,        // round(estimatedSavings / currentBill * 100)
        "efficiencyScore": <integer>,         // 0–100, conservative estimate
        "tips": [
        {{
            "title": <string>,
            "savings": <string>,              // "$<number>/month"
            "description": <string>,          // 1–2 short sentences, ≤ 20 words total
            "cost": <string>,                 // "$<number> upfront" or "$0"
            "payback": <string>,              // "Immediate" | "<N> months" | "<N> years"
            "category": <string>              // one of: ( "TOU" or "Tiered" or "Flat/ULO" ) | "Personal" | "Combined"
        }}
        // exactly 3 tips total, one per category listed above, no duplicates
        ]
    }},
    "subsidies": [
        {{
        "name": <string>,
        "amount": <string>,                 // e.g., "Up to $8,000"
        "description": <string>,            // one concise sentence
        "eligibility": <string>,            // short, plain criteria
        "howToApply": <string>,             // short steps in one line; include phone/site if known
        "status": <string>,                 // "Available" | "Paused" | "Varies"
        "url": <string>                     // official link; if unsure use "(check eligibility at official site)"
        }}
        // 2–3 Ontario electricity affordability/efficiency programs
    ]
    }}

    TASKS
    1) If bill_type = "TOU": include 1 unique tip that shifts use to off-peak + low-cost actions. category="TOU".
    2) If bill_type = "Tiered": include 1 unique tip to stay within lower-cost tier. category="Tiered".
    3) If bill_type = "Flat/ULO": include 1 unique tip to reduce overall kWh. category="Flat/ULO".
    4) Include 1 unique tip based on personal information (e.g., household size, appliances). category="Personal".
    5) Include 1 unique tip that uses BOTH bill_type and personal info. category="Combined".
    6) Add 2–3 Ontario assistance programs (e.g., OESP, LEAP, relevant rebates).
    7) Add a short action-first summary (3–5 bullets).

    RULES
    - Ontario only for programs. Do not invent programs; if unsure, set url to "(check eligibility at official site)".
    - Tips must be in concise, simple language and not repeat the same idea.
    - If a field is missing, infer gently or use "not available".
    - Output ONLY the JSON object, no markdown or extra text.

    NUMBERS
    - currentUsage = int(bill_data.data.monthlyUsage or 850)
    - currentBill  = float(bill_data.data.monthlyBill or 125)
    - estimatedSavings = conservative, whole dollars/month across all tips (consider overlap).
    - percentageSaving = round(estimatedSavings / currentBill * 100).
    """.strip()

    try:
        response = model.generate_content(
            prompt,
            generation_config=genai.types.GenerationConfig(
                temperature=0.3,
                top_p=1,
                max_output_tokens=5000,
                response_mime_type="application/json",
                response_schema=SCHEMA,  # minimal schema, no minItems/maxItems/etc.
            ),
        )

        # Primary path
        text = getattr(response, "text", None)
        if text and text.strip():
            try:
                data = json.loads(text)
                return data 
            except json.JSONDecodeError:
                return f"Error: Model returned non-JSON text: {text[:1000]}"

        # Fallback: inspect candidates/parts
        cands = getattr(response, "candidates", []) or []
        if cands:
            cand = cands[0]
            finish_reason = getattr(cand, "finish_reason", None) or getattr(cand, "finishReason", None)
            content = getattr(cand, "content", None)
            parts = getattr(content, "parts", None) if content else None
            if parts:
                combined = "".join(getattr(p, "text", "") for p in parts if getattr(p, "text", None)).strip()
                if combined:
                    try:
                        data = json.loads(combined)
                        err = _validate_counts(data)
                        return data if not err else {"error": err, "raw": data}
                    except json.JSONDecodeError:
                        return f"Error: Model returned non-JSON text: {combined[:1000]}"

            if str(finish_reason).endswith("MAX_TOKENS") or finish_reason == 2:
                return ("Error: Model stopped at MAX_TOKENS and returned no JSON. "
                        "Increase max_output_tokens or shorten the prompt/input.")
            if str(finish_reason).endswith("SAFETY"):
                return "Error: Response blocked by safety filters."

        return f"Error: Empty response. Raw: {response!r}"

    except Exception as e:
        return f"Error calling Gemini: {e}"
