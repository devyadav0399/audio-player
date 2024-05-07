import os
from datetime import timedelta

# Secret Key with a default of 'fallback-secret-key'
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "fallback-secret-key")

# Token expiry time with a default of 30 minutes
expiry_minutes = int(os.getenv("JWT_ACCESS_TOKEN_EXPIRES", 30))
JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=expiry_minutes)

# Test mode with a default of False
TESTING = bool(os.getenv("TESTING", False))
