import os
import pandas as pd
from model import predict_bill

# Define categorical features (must match training)
cat_features = ["Month", "Postal_Code", "Billing_Type"]

# Correct base directory — no double ML_model
base_dir = os.path.dirname(__file__)

def predict_tiered_bill(input_dict):
    input_df = pd.DataFrame([input_dict])
    model_path = os.path.join(base_dir, "tiered_model.cbm")
    return predict_bill(model_path, input_df, cat_features)

def predict_tou_bill(input_dict):
    input_df = pd.DataFrame([input_dict])
    model_path = os.path.join(base_dir, "tou_model.cbm")
    return predict_bill(model_path, input_df, cat_features)

def predict_ulo_bill(input_dict):
    input_df = pd.DataFrame([input_dict])
    model_path = os.path.join(base_dir, "ulo_model.cbm")
    return predict_bill(model_path, input_df, cat_features)

def ML_total(frontend_input):
    """
    Parent function to process frontend input and return TOU bill prediction score.
    Score = peakTotal / predicted_bill
    """
    peak_total = float(frontend_input.get("peakTotal", 0))

    tou_input = {
        "Billing_Type": "TOU",
        "Month": frontend_input.get("month", ""),
        "Postal_Code": frontend_input.get("zipCode", ""),
        "Num_People": int(frontend_input.get("residents", 0)),
        "Num_Children": 0,
        "SqFt": int(frontend_input.get("homeSize", 0)),
        "Monthly_Income": 0,
        "Usage_kWh": peak_total +
                     float(frontend_input.get("midPeakTotal", 0)) +
                     float(frontend_input.get("offPeakTotal", 0)),
        "On_Peak_kWh": peak_total,
        "Mid_Peak_kWh": float(frontend_input.get("midPeakTotal", 0)),
        "Off_Peak_kWh": float(frontend_input.get("offPeakTotal", 0)),
        "Delivery_Charge": 0,
        "Regulatory_Charge": 0,
        "Rebate_Amount": 0
    }

    prediction = predict_tou_bill(tou_input)
    score = (prediction[0] / peak_total)*100 if prediction[0] != 0 else 0
    return score
    
"""
# Optional test block
if __name__ == "__main__":
    example_frontend_input = {
        "id": "1234567890",
        "month": "January",
        "year": "2025",
        "billType": "TOU",
        "peakRate": "0.20",
        "peakTotal": "300",
        "offPeakRate": "0.10",
        "offPeakTotal": "400",
        "midPeakRate": "0.15",
        "midPeakTotal": "280",
        "tier1Rate": "",
        "tier1Total": "",
        "tier2Rate": "",
        "tier2Total": "",
        "flatRate": "",
        "flatTotal": "",
        "homeSize": "1200",
        "residents": "3",
        "zipCode": "M5V"
    }

    score = ML_total(example_frontend_input)
    print(f" Score:{score:.2f}")
    """
