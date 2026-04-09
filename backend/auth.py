"""
Authentication system for XG Sports App
"""

import os
import hashlib
from datetime import datetime, timedelta
from functools import wraps
from flask import request, jsonify

# Simple password hashing (in production, use bcrypt)
def hash_password(password: str) -> str:
    """Hash password using SHA256"""
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(password: str, password_hash: str) -> bool:
    """Verify password against hash"""
    return hash_password(password) == password_hash

# Hardcoded credentials for now (will be replaced with database)
VALID_CREDENTIALS = {
    "Thiiiago023": hash_password("213249")
}

def check_credentials(username: str, password: str) -> bool:
    """Check if credentials are valid"""
    if username not in VALID_CREDENTIALS:
        return False
    return verify_password(password, VALID_CREDENTIALS[username])

def require_auth(f):
    """Decorator to require authentication"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth = request.headers.get('Authorization')
        
        if not auth:
            return jsonify({"error": "Missing authorization header"}), 401
        
        try:
            # Simple auth: "Basic username:password"
            if auth.startswith('Basic '):
                import base64
                credentials = base64.b64decode(auth[6:]).decode('utf-8')
                username, password = credentials.split(':')
                
                if check_credentials(username, password):
                    request.user = username
                    return f(*args, **kwargs)
        except Exception as e:
            pass
        
        return jsonify({"error": "Invalid credentials"}), 401
    
    return decorated_function

def require_token(f):
    """Decorator to require API token"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get('X-API-Token')
        
        if not token:
            return jsonify({"error": "Missing API token"}), 401
        
        # Simple token validation (in production, use JWT)
        if token == os.getenv('API_TOKEN', 'default-token'):
            return f(*args, **kwargs)
        
        return jsonify({"error": "Invalid token"}), 401
    
    return decorated_function
