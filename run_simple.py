#!/usr/bin/env python3
import os
import sys
from flask import send_from_directory

# Add backend directory to Python path
current_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.join(current_dir, 'backend')
sys.path.insert(0, backend_dir)

# Import the existing Flask app
from app import app

# Configure static folder for the existing app
app.static_folder = os.path.join(current_dir, 'static')
app.static_url_path = ''

# Add route for serving React app
@app.route('/')
def index():
    """Serve the React app index"""
    return send_from_directory(app.static_folder, 'index.html')

# Add a debug endpoint
@app.route('/debug')
def debug_info():
    """Debug endpoint to check deployment status"""
    import json
    info = {
        "status": "running",
        "static_folder": app.static_folder,
        "static_exists": os.path.exists(app.static_folder),
        "files_in_static": os.listdir(app.static_folder) if os.path.exists(app.static_folder) else [],
        "routes": [str(rule) for rule in app.url_map.iter_rules()]
    }
    return json.dumps(info, indent=2)

# Catch-all route for React Router (SPA support) - This must be LAST
@app.route('/<path:path>')
def catch_all(path):
    """
    Serve static files if they exist, otherwise serve React app for client-side routing
    """
    # Try to serve static file first
    static_file_path = os.path.join(app.static_folder, path)
    if os.path.isfile(static_file_path):
        return send_from_directory(app.static_folder, path)
    
    # For any other path (React routes), serve the React app
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    debug = os.environ.get("FLASK_ENV", "production") == "development"
    
    # Debug information
    print(f"🚀 Starting SafeIntel on port {port}")
    print(f"🔧 Debug mode: {debug}")
    print(f"📁 Static folder: {app.static_folder}")
    print(f"📂 Static folder exists: {os.path.exists(app.static_folder)}")
    
    if os.path.exists(app.static_folder):
        files = os.listdir(app.static_folder)
        print(f"📄 Files in static: {len(files)} files")
        print(f"🎯 index.html exists: {'index.html' in files}")
        if len(files) <= 20:
            print(f"📋 All files: {files}")
    
    # List some key routes
    print("🛣️  Key routes:")
    for rule in app.url_map.iter_rules():
        if any(keyword in rule.rule for keyword in ['/', 'predict', 'api', 'static']):
            print(f"   {rule.rule} -> {rule.endpoint} [{', '.join(rule.methods)}]")
    
    app.run(host="0.0.0.0", port=port, debug=debug)
