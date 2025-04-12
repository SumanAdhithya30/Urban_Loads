from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
import joblib
import tensorflow as tf

app = Flask(__name__)

# Load trained LSTM model and scaler
model = tf.keras.models.load_model('energy_predictor_2features.keras')
scaler = joblib.load('scaled_2features.save')

# Load historical data once at startup
historical_df = pd.read_csv('/Users/batcomputer/Downloads/historical_data.csv')[['power_demand', 'temp']]

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    user_input = data.get('input')  # Expecting a single [power_demand, temp] pair

    if not user_input or len(user_input) != 2:
        return jsonify({'error': 'Expected a single list with [power_demand, temp]'}), 400

    # Use last 23 rows from historical data
    if len(historical_df) < 23:
        return jsonify({'error': 'Not enough historical data'}), 500

    auto_filled = historical_df.tail(23).values.tolist()
    
    # Combine user input at the end (or beginning if desired)
    sequence = auto_filled + [user_input]  # 23 historical + 1 user = 24

    # Prepare features
    features = np.array(sequence).reshape(1, 24, 2)

    # Scale
    scaled = scaler.transform(features[0]).reshape(1, 24, 2)

    # Predict
    prediction_scaled = model.predict(scaled)

    # Inverse transform only power demand (index 0)
    dummy = np.zeros((1, 2))
    dummy[0][0] = prediction_scaled[0][0]
    prediction_actual = scaler.inverse_transform(dummy)[0][0]

    return jsonify({
        'predicted_power_demand': float(prediction_actual),
        # Optional: to debug the input sequence
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)
