import os
import pandas as pd
from catboost import CatBoostRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import numpy as np

def train_and_evaluate(file_path, model_name, cat_features):
    """
    Trains a CatBoost model with train-test split and evaluates RMSE.
    Use only when you manually want to retrain models.
    """
    base_dir = os.path.dirname(__file__)
    full_path = os.path.join(base_dir, file_path)

    # Load dataset
    df = pd.read_csv(full_path)
    print(f"📄 {file_path} — original rows: {len(df)}")

    if "Total_Bill" not in df.columns:
        raise ValueError(f"❌ Column 'Total_Bill' not found in {file_path}")

    df = df[df["Total_Bill"].notnull()]
    print(f"✅ {file_path} — retained rows: {len(df)}")

    # Separate features and target
    X = df.drop(columns=["Total_Bill"])
    y = df["Total_Bill"]

    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train CatBoost model
    model = CatBoostRegressor(iterations=500, learning_rate=0.05, depth=6, verbose=100)
    model.fit(X_train, y_train, cat_features=cat_features)

    # Evaluate model
    y_pred = model.predict(X_test)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    mean_actual = np.mean(y_test)
    rmse_percent = (rmse / mean_actual) * 100
    print(f"📊 {model_name} RMSE: {rmse_percent:.2f}% of mean actual")

    # Save trained model
    model_path = os.path.join(base_dir, model_name)
    model.save_model(model_path)
    print(f"💾 Saved model: {model_name}")

def predict_bill(model_path, input_df, cat_features):
    """
    Loads a trained CatBoost model and predicts total bill for new input data.
    """
    model = CatBoostRegressor()
    model.load_model(model_path)

    # Ensure input is a DataFrame
    if not isinstance(input_df, pd.DataFrame):
        input_df = pd.DataFrame([input_df])

    prediction = model.predict(input_df)
    return prediction

# 🔒 Safe import — no training unless run directly
if __name__ == "__main__":
    print("✅ model.py loaded successfully — no training performed.")

    