# Medical Device Classification Prediction System

A comprehensive system for predicting medical device severity classifications using machine learning.

## 📁 Project Structure

```
dsp_model/
├── 📁 ml/                          # Machine Learning Components
│   ├── catboost_model_6.pkl          # Trained CatBoost model
│   ├── model_evaluator.py          # Model performance evaluation script
├── 📁 backend/                     # Flask API Backend
│   ├── app.py                      # Main Flask application
│   ├── requirements.txt            # Python dependencies
│   └── test_api.py                 # API testing script
├── 📁 frontend/                    # React Frontend
│   ├── src/                        # Source code
│   ├── public/                     # Static assets
│   ├── package.json                # Node.js dependencies
│   └── vite.config.js              # Vite configuration
├── 📁 dataset/                     # Data Files
│   ├── master_v5.csv               # Main dataset
│   └── combined_v11_fixed.csv      # Additional dataset
└── 📄 Setup & Utility Scripts
    ├── start_application.bat       # Start both frontend & backend
    ├── evaluate_model.bat          # Run model evaluation
    └── README.md                   # This file
```

## 🚀 Quick Start

### Option 1: Automated Setup
Run the automated setup script:
```bash
start_application.bat
```

### Option 2: Manual Setup

#### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python app.py
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 📊 Model Performance & Metrics

### Real-time Metrics Display
The Flask backend provides comprehensive logging and metrics display in the terminal:

- **Detailed Prediction Logs**: Every prediction shows input features, confidence, and method used
- **Performance Statistics**: Automatic calculation every 10 predictions
- **Feature Analysis**: Distribution of input features and predictions
- **Confidence Tracking**: Average confidence scores and trends

### Terminal Output Example
```
================================================================================
🔍 PREDICTION DETAILS - 2024-01-27 14:30:15
================================================================================
📊 Input Features:
   • Name: Test Device
   • Name Manufacturer: Test Company
   • Classification: Class II
   • Implanted: no

🎯 Prediction Results:
   • Severity Class: 2
   • Confidence: 75.00%
   • Method Used: rule-based

📈 Recent Performance (Last 10 predictions):
   • Prediction Distribution:
     - Class 1: 3 (30.0%)
     - Class 2: 4 (40.0%)
     - Class 3: 3 (30.0%)
   • Average Confidence: 73.50%
   • Method Usage:
     - rule-based: 10 (100.0%)
================================================================================
```

### Model Evaluation Script
Run comprehensive model evaluation:
```bash
evaluate_model.bat
```

Or manually:
```bash
cd ml
python model_evaluator.py
```

This generates:
- **Accuracy, Precision, Recall, F1-Score**
- **Per-class performance metrics**
- **Confusion matrix**
- **Detailed classification report**
- **Saved evaluation report file**

### API Endpoints for Metrics

- `GET /health` - System health and status
- `GET /metrics` - Current prediction statistics
- `GET /performance` - Trigger performance display
- `POST /reset_metrics` - Reset prediction history

## 🎯 Features

### Input Fields
- **Device Name**: Searchable dropdown from dataset
- **Manufacturer Name**: Searchable dropdown from dataset  
- **Classification**: Device classification categories
- **Implanted**: Yes/No radio selection

### Prediction Output
- **Severity Class**: Predicted classification (1-4)
- **Confidence Score**: Model confidence percentage
- **Method Used**: Model or rule-based prediction

### Performance Monitoring
- **Real-time logging** of all predictions
- **Statistical analysis** of prediction patterns
- **Confidence trend tracking**
- **Feature distribution analysis**

## 🔧 Technical Details

### Backend (Flask)
- **Model Loading**: CatBoost model with fallback rule system
- **Data Encoding**: Label encoders for categorical features
- **Metrics Logging**: Comprehensive prediction tracking
- **CORS Enabled**: Cross-origin requests supported

### Frontend (React + Vite)
- **Searchable Dropdowns**: Real-time filtering of options
- **Form Validation**: Required field checking
- **API Integration**: Async prediction requests
- **Error Handling**: User-friendly error messages

### Machine Learning
- **Model**: CatBoost classifier
- **Features**: 4 categorical features (name, manufacturer, classification, implanted)
- **Target**: Medical device severity classification
- **Evaluation**: Multiple metrics with detailed reporting

## 📈 Monitoring & Logging

### Console Output
All predictions are logged to the terminal with:
- Timestamp
- Input features
- Prediction results
- Confidence scores
- Performance statistics

### File Logging
- `prediction_log.txt` - All prediction details
- `model_evaluation_TIMESTAMP.txt` - Evaluation reports

### Performance Analysis
- Automatic statistics every 10 predictions
- Trend analysis for confidence scores
- Feature usage patterns
- Prediction distribution tracking

## 🛠️ Troubleshooting

### Common Issues
1. **CatBoost not installed**: System uses rule-based fallback
2. **CSV not found**: Check dataset folder and file paths
3. **CORS errors**: Ensure backend is running on port 5000
4. **Port conflicts**: Frontend will use alternative port automatically

### Dependencies
- **Python**: 3.7+
- **Node.js**: 14+
- **Flask**: 2.3+
- **React**: 18+
- **CatBoost**: 1.2+ (optional)

## 📞 API Reference

### POST /predict
```json
{
  "name": "Device Name",
  "name_manufacturer": "Manufacturer",
  "classification": "Class II",
  "implanted": "no"
}
```

Response:
```json
{
  "severity_class": "2",
  "probability": 0.75,
  "method": "rule-based",
  "prediction_count": 15
}
```

---

**Note**: This system provides comprehensive monitoring and evaluation capabilities for medical device classification predictions, with detailed metrics displayed in VS Code terminal output.
