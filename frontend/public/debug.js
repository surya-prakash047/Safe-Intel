// Debug frontend API connection
console.log("🔍 Testing Frontend API Connection...");

// Test if we can reach the backend
fetch('http://localhost:5000/health')
  .then(response => {
    console.log("Health check status:", response.status);
    return response.json();
  })
  .then(data => {
    console.log("✅ Backend health:", data);
    
    // Test the prediction endpoint
    console.log("🧪 Testing prediction endpoint...");
    return fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: "Covidien Shiley Tracheostomy Tube, Cuffed with Inner Cannula",
        name_manufacturer: "welch allyn inc",
        classification: "Anesthesiology Devices",
        implanted: "NO"
      })
    });
  })
  .then(response => {
    console.log("Prediction response status:", response.status);
    return response.json();
  })
  .then(data => {
    console.log("✅ Prediction response:", data);
    console.log("📊 Parsed prediction:", {
      severityClass: data.prediction,
      confidence: (data.confidence * 100).toFixed(2) + "%",
      method: data.method
    });
  })
  .catch(error => {
    console.error("❌ Error:", error);
  });
