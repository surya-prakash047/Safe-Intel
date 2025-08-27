#!/usr/bin/env python3
import os
import sys
from flask import Flask, send_from_directory

# Add backend directory to Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

# Create new Flask app with static folder configured
app = Flask(__name__, static_folder='static', static_url_path='')

# Import and register all the backend routes
from backend.app import app as backend_app

# Copy all the backend routes to our production app
for rule in backend_app.url_map.iter_rules():
    if rule.endpoint != 'static':
        # Get the view function
        view_func = backend_app.view_functions[rule.endpoint]
        # Add the rule to our app
        app.add_url_rule(
            rule.rule, 
            rule.endpoint, 
            view_func, 
            methods=rule.methods
        )

# Import all the necessary variables from backend
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

# Serve React App for root and catch-all routes
@app.route('/')
def serve_index():
    """Serve the main React app"""
    static_dir = os.path.join(app.root_path, 'static')
    index_path = os.path.join(static_dir, 'index.html')
    print(f"📄 Serving index.html from: {index_path}")
    print(f"📁 File exists: {os.path.exists(index_path)}")
    return send_from_directory('static', 'index.html')

@app.route('/<path:filename>')
def serve_static_or_spa(filename):
    """Serve static files or fallback to React app for SPA routing"""
    static_dir = os.path.join(app.root_path, 'static')
    file_path = os.path.join(static_dir, filename)
    
    # If it's a static file that exists, serve it
    if os.path.exists(file_path) and os.path.isfile(file_path):
        return send_from_directory('static', filename)
    
    # For API routes, don't interfere
    if filename.startswith('api/'):
        return "API endpoint not found", 404
    
    # For everything else (React routes), serve the React app
    return send_from_directory('static', 'index.html')

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    debug = os.environ.get("FLASK_ENV") != "production"
    
    # Debug information
    static_dir = os.path.join(app.root_path, 'static')
    print(f"🚀 Starting SafeIntel on port {port}")
    print(f"🔧 Debug mode: {debug}")
    print(f"📁 Static directory: {static_dir}")
    print(f"📂 Static dir exists: {os.path.exists(static_dir)}")
    
    if os.path.exists(static_dir):
        files = os.listdir(static_dir)
        print(f"📄 Static files: {files[:10]}")  # Show first 10 files
        index_exists = 'index.html' in files
        print(f"🎯 index.html exists: {index_exists}")
    
    # Print registered routes
    print("🛣️  Registered routes:")
    for rule in app.url_map.iter_rules():
        print(f"   {rule.rule} -> {rule.endpoint}")
    
    app.run(host="0.0.0.0", port=port, debug=debug)
