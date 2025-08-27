// Test frontend-backend connection
fetch('http://localhost:5000/health')
  .then(response => response.json())
  .then(data => {
    console.log('Backend Health Check:', data);
    
    // Test prediction endpoint
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
  .then(response => response.json())
  .then(data => {
    console.log('Prediction Test:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
