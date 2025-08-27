#!/usr/bin/env python3
import os
import sys

# Add backend directory to Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

# Import the Flask app
from app import app

# Add static file serving for production
from flask import send_from_directory

@app.route('/')
def serve_react_app():
    """Serve the main React app"""
    return send_from_directory('static', 'index.html')

@app.route('/<path:path>')
def serve_static_files(path):
    """Serve static files or fallback to React app for SPA routing"""
    try:
        return send_from_directory('static', path)
    except:
        # Fallback to React app for client-side routing
        return send_from_directory('static', 'index.html')

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    debug = os.environ.get("FLASK_ENV") != "production"
    
    print(f"🚀 Starting SafeIntel on port {port}")
    print(f"🔧 Debug mode: {debug}")
    print(f"📁 Static files: {os.path.abspath('static')}")
    
    app.run(host="0.0.0.0", port=port, debug=debug)
