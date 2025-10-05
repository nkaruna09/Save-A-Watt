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

# Optional test block
if __name__ == "__main__":
    example_input = {
        "Billing_Type": "Tiered",
        "Month": "January",
        "Postal_Code": "M5V",
        "Num_People": 3,
        "Num_Children": 1,
        "SqFt": 1200,
        "Monthly_Income": 4800,
        "Usage_kWh": 980,
        "Lower_Tier_kWh": 980,
        "Upper_Tier_kWh": 0
    }

    print("🔹 Tiered Bill:", predict_tiered_bill(example_input))