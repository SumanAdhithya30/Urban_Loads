import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import load_model

# Load the trained model
model = load_model('/Users/batcomputer/energy_predictor_2features.keras')  # Make sure the model path is correct

# Define features used for training
features = ['Power demand', 'temp']

# Load and preprocess the test data
data = pd.read_csv("/Users/batcomputer/Downloads/powerdemand_5min_2021_to_2024_with weather.csv")  # Replace with your test data path
data = data[features]

# Normalize using the same scaler setup as training
import joblib
scaler = joblib.load('/Users/batcomputer/scaled_2features.save')  # Use correct path
scaled_data = scaler.transform(data)


# Create sequences of length 24 (like in training)
sequence_length = 24
X_test = []
for i in range(len(scaled_data) - sequence_length):
    X_test.append(scaled_data[i:i+sequence_length])

X_test = np.array(X_test)

# Predict
y_pred_scaled = model.predict(X_test)

# Inverse transform the prediction only for the 'Power demand' column
# We need to inverse only that column, so we build dummy arrays
dummy = np.zeros((len(y_pred_scaled), len(features)))
dummy[:, 0] = y_pred_scaled[:, 0]
y_pred = scaler.inverse_transform(dummy)[:, 0]

# Display the last prediction
print(f"Predicted Power Demand: {y_pred[-1]}")

