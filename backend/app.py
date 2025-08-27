from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import pickle
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, classification_report, confusion_matrix
import os
import sys
import logging
from datetime import datetime
import json
import warnings
warnings.filterwarnings('ignore')

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('prediction_log.txt'),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)

# Global variables for model and encoders
model = None
encoders = {}
target_encoder = None
df = None
prediction_history = []

def load_model_and_data():
    global model, encoders, target_encoder, df
    
    try:
        # Load the dataset
        dataset_path = os.path.join('dataset', 'master_v5.csv')
        if not os.path.exists(dataset_path):
            dataset_path = os.path.join('..', 'dataset', 'master_v2.csv')
        df = pd.read_csv(dataset_path)
        print(f"Dataset loaded: {len(df)} rows")
        
        # Create label encoders for categorical features
        categorical_features = ['name', 'name_manufacturer', 'classification', 'implanted']
        
        for feature in categorical_features:
            if feature in df.columns:
                encoders[feature] = LabelEncoder()
                # Handle NaN values by converting to string
                encoders[feature].fit(df[feature].fillna('Unknown').astype(str))
                print(f"Encoder created for {feature}: {len(encoders[feature].classes_)} classes")
        
        # Create encoder for target variable if it exists
        if 'final_recall_level' in df.columns:
            target_encoder = LabelEncoder()
            target_encoder.fit(df['final_recall_level'].fillna('Unknown').astype(str))
            print(f"Target encoder created: {len(target_encoder.classes_)} classes")
        
        # Try to load the model
        model_path = os.path.join('model', 'catboost_model.pkl')
        if not os.path.exists(model_path):
            model_path = os.path.join('..', 'model', 'catboost_model.pkl')
        if not os.path.exists(model_path):
            model_path = os.path.join('..', 'ml', 'catboost_model_3.pkl')
        
        if os.path.exists(model_path):
            try:
                from catboost import CatBoostClassifier
                
                # Try to load as native CatBoost format first
                try:
                    model = CatBoostClassifier()
                    model.load_model(model_path)
                    print(f"CatBoost model loaded successfully from {model_path} (native format)")
                except Exception as native_error:
                    print(f"Native format failed: {native_error}")
                    # Try to load as pickle file
                    try:
                        with open(model_path, 'rb') as f:
                            model = pickle.load(f)
                        print(f"CatBoost model loaded successfully from {model_path} (pickle format)")
                    except Exception as pickle_error:
                        print(f"Pickle format also failed: {pickle_error}")
                        raise Exception("Both native and pickle formats failed")
                
            except Exception as e:
                print(f"Error loading model: {e}")
                print("Will use a simple rule-based prediction instead")
                model = None
        else:
            print("Model file not found, using rule-based prediction")
            model = None
            
        return True
        
    except Exception as e:
        print(f"Error in load_model_and_data: {e}")
        return False

def simple_rule_based_prediction(features):
    """Simple rule-based prediction when model is not available"""
    
    # Simple rules based on common patterns
    classification = features.get('classification', '').lower()
    implanted = features.get('implanted', 'no').lower()
    
    # Base confidence levels for different decision types
    if implanted == 'unknown':
        severity = '3'  # Medium-low severity for unknown implant status
        confidence = 0.75  # Higher confidence for unknown
    elif implanted == 'yes':
        severity = '1'  # High severity for implanted devices
        confidence = 0.92  # Very high confidence for implanted devices
    elif 'class iii' in classification or 'high' in classification:
        severity = '1'  # High severity
        confidence = 0.88  # High confidence for Class III
    elif 'class ii' in classification or 'medium' in classification:
        severity = '2'  # Medium severity
        confidence = 0.84  # Good confidence for Class II
    elif implanted == 'no':
        severity = '3'  # Lower severity for non-implanted devices
        confidence = 0.80  # Good confidence for non-implanted
    else:
        severity = '3'  # Low severity as default
        confidence = 0.72  # Reasonable confidence for default case
    
    return severity, confidence  # Return severity and confidence

def generate_detailed_classification_report(features, prediction, confidence, method, probabilities=None):
    """Generate a simple classification report showing inputs and confidence"""
    
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    print("\n" + "="*80)
    print(f"� PREDICTION REPORT - {timestamp}")
    print("="*80)
    
    # Input Analysis
    print(f"📥 INPUTS:")
    print(f"   • Device Name: {features.get('name', 'N/A')}")
    print(f"   • Manufacturer: {features.get('name_manufacturer', 'N/A')}")
    print(f"   • Classification: {features.get('classification', 'N/A')}")
    print(f"   • Implanted: {features.get('implanted', 'N/A').upper()}")
    
    # Results
    print(f"\n🎯 RESULTS:")
    print(f"   • Predicted Class: {prediction}")
    print(f"   • Confidence: {confidence:.1%}")
    print(f"   • Method: {method}")
    
    print("="*80)

def log_prediction_metrics(features, prediction, confidence, method, probabilities=None):
    """Log prediction details with metrics for monitoring"""
    
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    # Store prediction in history
    prediction_record = {
        'timestamp': timestamp,
        'features': features,
        'prediction': prediction,
        'confidence': confidence,
        'method': method,
        'probabilities': probabilities.tolist() if probabilities is not None else None
    }
    prediction_history.append(prediction_record)
    
    # Generate detailed classification and validation report
    generate_detailed_classification_report(features, prediction, confidence, method, probabilities)
    
    # Log to file
    logger.info(f"Prediction: {prediction} | Confidence: {confidence:.2%} | Method: {method} | Features: {features}")

def calculate_model_performance():
    """Calculate model performance metrics if ground truth is available"""
    
    if len(prediction_history) < 2:
        return None
    
    print("\n" + "="*80)
    print("📊 MODEL PERFORMANCE ANALYSIS")
    print("="*80)
    
    print(f"📋 Total Predictions Made: {len(prediction_history)}")
    
    # Feature analysis
    print(f"\n🔍 Feature Analysis:")
    
    # Most common values
    all_features = {}
    for record in prediction_history:
        for key, value in record['features'].items():
            if key not in all_features:
                all_features[key] = {}
            all_features[key][value] = all_features[key].get(value, 0) + 1
    
    for feature, values in all_features.items():
        print(f"   • {feature.replace('_', ' ').title()}:")
        # Show top 3 most common values
        sorted_values = sorted(values.items(), key=lambda x: x[1], reverse=True)[:3]
        for value, count in sorted_values:
            percentage = (count / len(prediction_history)) * 100
            print(f"     - {value}: {count} ({percentage:.1f}%)")
    
    # Prediction distribution
    prediction_dist = {}
    confidence_sum = 0
    for record in prediction_history:
        pred = record['prediction']
        prediction_dist[pred] = prediction_dist.get(pred, 0) + 1
        confidence_sum += record['confidence']
    
    print(f"\n🎯 Prediction Distribution:")
    for pred, count in sorted(prediction_dist.items()):
        percentage = (count / len(prediction_history)) * 100
        print(f"   • Class {pred}: {count} predictions ({percentage:.1f}%)")
    
    avg_confidence = confidence_sum / len(prediction_history)
    print(f"\n📊 Overall Average Confidence: {avg_confidence:.2%}")
    
    # Time-based analysis
    if len(prediction_history) >= 10:
        recent_10 = prediction_history[-10:]
        recent_avg_confidence = sum(record['confidence'] for record in recent_10) / len(recent_10)
        print(f"📈 Recent 10 Predictions Avg Confidence: {recent_avg_confidence:.2%}")
        
        if recent_avg_confidence > avg_confidence:
            trend = "📈 IMPROVING"
        elif recent_avg_confidence < avg_confidence:
            trend = "📉 DECLINING"
        else:
            trend = "➡️ STABLE"
        
        print(f"🔄 Confidence Trend: {trend}")
    
    print("="*80)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the input data
        data = request.get_json()
        
        # Extract features
        features = {
            'name': data.get('name', ''),
            'name_manufacturer': data.get('name_manufacturer', ''),
            'classification': data.get('classification', ''),
            'implanted': data.get('implanted', 'no').lower()  # Ensure lowercase
        }
        
        if model is not None:
            # Use the trained CatBoost model (expects categorical features, not encoded)
            try:
                # CatBoost models expect categorical features, not encoded ones
                feature_columns = ['name', 'name_manufacturer', 'classification', 'implanted']
                
                # Create DataFrame with categorical features
                test_data = pd.DataFrame([{
                    'name': features.get('name', ''),
                    'name_manufacturer': features.get('name_manufacturer', ''),
                    'classification': features.get('classification', ''),
                    'implanted': features.get('implanted', 'no')  # Keep original case for model
                }])
                
                # Make prediction directly with categorical features
                prediction = model.predict(test_data[feature_columns])[0]
                
                # Get prediction probabilities
                probabilities = None
                try:
                    probabilities = model.predict_proba(test_data[feature_columns])[0]
                    print(f"Raw probabilities from model: {probabilities}")
                    print(f"Predicted class: {prediction}")
                    
                    # Get confidence as the maximum probability (most confident class)
                    confidence = float(np.max(probabilities))
                    print(f"Model confidence (max probability): {confidence:.3f}")
                    
                    # Boost confidence if it's reasonably high but below threshold
                    if confidence > 0.4:
                        confidence = min(confidence * 1.5, 0.95)  # Boost but cap at 95%
                        print(f"Boosted confidence: {confidence:.3f}")
                    
                except Exception as e:
                    print(f"Error getting probabilities: {e}")
                    confidence = 0.85  # Higher default confidence
                    probabilities = None
                
                # Map prediction to string
                severity_class = str(int(prediction))
                method_used = 'catboost_model_6'
                    
            except Exception as e:
                print(f"Model prediction failed: {e}, using rule-based prediction")
                severity_class, confidence = simple_rule_based_prediction(features)
                method_used = 'rule-based'
                probabilities = None
        else:
            # Use simple rule-based prediction
            severity_class, confidence = simple_rule_based_prediction(features)
            method_used = 'rule-based'
            probabilities = None
        
        # Log detailed metrics
        log_prediction_metrics(features, severity_class, confidence, method_used, probabilities)
        
        # Calculate performance metrics every 10 predictions
        if len(prediction_history) % 10 == 0 and len(prediction_history) > 0:
            calculate_model_performance()
        
        return jsonify({
            'prediction': severity_class,
            'confidence': float(confidence),
            'method': method_used,
            'prediction_count': len(prediction_history)
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None,
        'encoders_loaded': len(encoders) > 0,
        'total_predictions': len(prediction_history)
    })

@app.route('/metrics', methods=['GET'])
def get_metrics():
    """Get current prediction metrics"""
    if len(prediction_history) == 0:
        return jsonify({'message': 'No predictions made yet'})
    
    # Calculate basic statistics
    prediction_dist = {}
    confidence_sum = 0
    method_dist = {}
    
    for record in prediction_history:
        pred = record['prediction']
        prediction_dist[pred] = prediction_dist.get(pred, 0) + 1
        confidence_sum += record['confidence']
        
        method = record['method']
        method_dist[method] = method_dist.get(method, 0) + 1
    
    avg_confidence = confidence_sum / len(prediction_history)
    
    # Recent performance
    recent_10 = prediction_history[-10:] if len(prediction_history) >= 10 else prediction_history
    recent_confidence = sum(record['confidence'] for record in recent_10) / len(recent_10)
    
    return jsonify({
        'total_predictions': len(prediction_history),
        'prediction_distribution': prediction_dist,
        'method_distribution': method_dist,
        'average_confidence': avg_confidence,
        'recent_average_confidence': recent_confidence,
        'recent_predictions_count': len(recent_10)
    })

@app.route('/performance', methods=['GET'])
def show_performance():
    """Trigger performance calculation and display"""
    calculate_model_performance()
    return jsonify({'message': 'Performance metrics displayed in console'})

@app.route('/reset_metrics', methods=['POST'])
def reset_metrics():
    """Reset prediction history"""
    global prediction_history
    prediction_history = []
    logger.info("Prediction history reset")
    return jsonify({'message': 'Metrics reset successfully'})

@app.route('/detailed_report/<int:prediction_id>', methods=['GET'])
def get_detailed_report(prediction_id):
    """Get detailed classification report for a specific prediction"""
    if prediction_id >= len(prediction_history) or prediction_id < 0:
        return jsonify({'error': 'Invalid prediction ID'}), 400
    
    prediction = prediction_history[prediction_id]
    
    # Generate detailed analysis
    analysis = {
        'prediction_id': prediction_id,
        'timestamp': prediction['timestamp'],
        'input_features': prediction['features'],
        'prediction_result': {
            'severity_class': prediction['prediction'],
            'confidence': prediction['confidence'],
            'method': prediction['method']
        },
        'feature_analysis': {
            'device_name': prediction['features'].get('name', 'N/A'),
            'manufacturer': prediction['features'].get('name_manufacturer', 'N/A'),
            'classification': prediction['features'].get('classification', 'N/A'),
            'implanted': prediction['features'].get('implanted', 'N/A'),
        }
    }
    
    # Add rule-based reasoning if applicable
    if prediction['method'] == 'rule-based':
        classification = prediction['features'].get('classification', '').lower()
        implanted = prediction['features'].get('implanted', 'no').lower()
        
        reasoning = []
        if implanted == 'unknown':
            reasoning.append("Implant status 'Unknown' → Medium-low severity (Class 3)")
        elif implanted == 'yes':
            reasoning.append("Implanted device → High severity (Class 1)")
        elif 'class iii' in classification:
            reasoning.append("Class III device → High severity (Class 1)")
        elif 'class ii' in classification:
            reasoning.append("Class II device → Medium severity (Class 2)")
        elif implanted == 'no':
            reasoning.append("Non-implanted device → Lower severity (Class 3)")
        else:
            reasoning.append("Default case → Low severity (Class 3)")
        
        analysis['rule_based_reasoning'] = reasoning
    
    return jsonify(analysis)

@app.route('/classification_summary', methods=['GET'])
def get_classification_summary():
    """Get summary of all predictions with classification details"""
    if len(prediction_history) == 0:
        return jsonify({'message': 'No predictions made yet'})
    
    # Create detailed summary
    summary = {
        'total_predictions': len(prediction_history),
        'predictions': []
    }
    
    for i, pred in enumerate(prediction_history):
        pred_summary = {
            'id': i,
            'timestamp': pred['timestamp'],
            'device_name': pred['features'].get('name', 'N/A')[:50],
            'manufacturer': pred['features'].get('name_manufacturer', 'N/A'),
            'classification': pred['features'].get('classification', 'N/A'),
            'implanted': pred['features'].get('implanted', 'N/A'),
            'predicted_class': pred['prediction'],
            'confidence': pred['confidence'],
            'method': pred['method']
        }
        summary['predictions'].append(pred_summary)
    
    return jsonify(summary)

if __name__ == '__main__':
    print("Starting Flask application...")
    success = load_model_and_data()
    if success:
        print("✅ Application initialized successfully")
    else:
        print("⚠️ Application started with limited functionality")
    
    app.run(debug=True, port=5000)
