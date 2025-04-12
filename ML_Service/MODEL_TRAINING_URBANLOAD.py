import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
import matplotlib.pyplot as plt
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Input
from tensorflow.keras.optimizers import Adam
import joblib

# Load and inspect data
data = pd.read_csv('/Users/batcomputer/Downloads/powerdemand_5min_2021_to_2024_with weather.csv')
print("Available columns:", data.columns)

# Define only the two relevant features
features = ['Power demand', 'temp']

# Drop rows with missing values
data = data[features].dropna()

# Normalize
scaler = MinMaxScaler()
scaled_data = scaler.fit_transform(data)
joblib.dump(scaler, 'scaled_2features.save')

# Create sequences
def create_sequences(data, seq_length=24):
    X, y = [], []
    for i in range(len(data) - seq_length):
        X.append(data[i:i+seq_length])
        y.append(data[i+seq_length][0])  # Predict only power demand
    return np.array(X), np.array(y)

X, y = create_sequences(scaled_data)

# Clean up
X = np.nan_to_num(X)
y = np.nan_to_num(y)

# Define the model
model = Sequential([
    Input(shape=(X.shape[1], X.shape[2])),  # shape = (24, 2)
    LSTM(64, return_sequences=True),
    LSTM(32),
    Dense(1)
])

model.compile(optimizer=Adam(learning_rate=0.001), loss='mae')
history = model.fit(X, y, epochs=15, batch_size=32, verbose=1)

# Save the trained model
model.save('energy_predictor_2features.keras')

# Plot training loss
plt.plot(history.history['loss'])
plt.title('Training Loss')
plt.xlabel('Epoch')
plt.ylabel('MAE Loss')
plt.show()

# Predict using last 24 records
last_sequence = scaled_data[-24:]  # (24, 2)
last_sequence = last_sequence.reshape(1, 24, len(features))
prediction = model.predict(last_sequence)

# Inverse transform only power demand
scaler = joblib.load('scaled_2features.save')
predicted_scaled = np.zeros((1, len(features)))
predicted_scaled[0][0] = prediction[0][0]  # only power demand
prediction_actual = scaler.inverse_transform(predicted_scaled)[0][0]

print("Predicted Power Demand (actual units):", prediction_actual)

