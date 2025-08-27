#!/usr/bin/env python3
"""
Cloud Run startup script for SafeIntel
Serves both the React frontend and Flask API
"""

import os
from flask import send_from_directory

# Import the existing Flask app
from app import app

# Configure static file serving for the built React app
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_static(path):
    """Serve static files for the React frontend"""
    static_dir = os.path.join(os.getcwd(), 'static')
    
    # If the path exists as a static file, serve it
    if path != "" and os.path.exists(os.path.join(static_dir, path)):
        return send_from_directory(static_dir, path)
    
    # For all other routes (React routing), serve index.html
    return send_from_directory(static_dir, 'index.html')

# Override CORS for production
@app.after_request
def after_request(response):
    """Add CORS headers for production"""
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

if __name__ == '__main__':
    # Cloud Run provides PORT environment variable
    port = int(os.environ.get('PORT', 8080))
    
    print(f"🚀 Starting SafeIntel on port {port}")
    print("📊 Frontend: Serving React app from /static")
    print("🔌 Backend: API available at /predict, /health, /metrics")
    
    # Run the app
    app.run(
        host='0.0.0.0',
        port=port,
        debug=False,
        threaded=True
    )
