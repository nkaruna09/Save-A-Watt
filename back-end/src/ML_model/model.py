import os
import pandas as pd
from catboost import CatBoostRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import numpy as np

def train_and_evaluate(file_path, model_name, cat_features):
    """
    Trains a CatBoost model with train-test split and evaluates RMSE.

    Parameters:
    - file_path (str): Path to the .txt dataset
    - model_name (str): Name of the output model file
    - cat_features (list): List of categorical column names
    """
    # Resolve full path
    base_dir = os.path.dirname(__file__)
    full_path = os.path.join(base_dir, file_path)

    # Load data
    df = pd.read_csv(full_path)

    # Print row count before filtering
    print(f"📄 {file_path} — original rows: {len(df)}")

    # Filter only rows where Total_Bill is truly missing (not misaligned)
    if "Total_Bill" in df.columns:
        df = df[df["Total_Bill"].notnull()]
    else:
        raise ValueError(f"❌ Column 'Total_Bill' not found in {file_path}")

    print(f"✅ {file_path} — retained rows: {len(df)}")

    # Separate features and target
    X = df.drop(columns=["Total_Bill"])
    y = df["Total_Bill"]

    # Split into train and test
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    # Initialize model
    model = CatBoostRegressor(
        iterations=500,
        learning_rate=0.05,
        depth=6,
        verbose=100
    )

    # Train
    model.fit(X_train, y_train, cat_features=cat_features)

    # Predict on test set
    y_pred = model.predict(X_test)

    # Calculate RMSE as percentage of mean actual
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    mean_actual = np.mean(y_test)
    rmse_percent = (rmse / mean_actual) * 100
    print(f"📊 {model_name} RMSE: {rmse_percent:.2f}% of mean actual")

    # Save model
    model_path = os.path.join(base_dir, model_name)
    model.save_model(model_path)
    print(f"💾 Saved: {model_name}")

# Define categorical    features
cat_features = ["Month", "Postal_Code", "Billing_Type"]

# Train and evaluate each model
train_and_evaluate("Tiered_HTV.txt", "tiered_model.cbm", cat_features)
train_and_evaluate("ULO_HTV.txt", "ulo_model.cbm", cat_features)
train_and_evaluate("TOU_HTV.txt", "tou_model.cbm", cat_features)