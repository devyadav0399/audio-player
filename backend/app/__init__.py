from app.routes import routes_blueprint
import logging
from app.auth import auth_blueprint
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager, get_jwt
from app.utils import load_users_from_json, load_audio_files
from app.utils import is_blacklisted, setup_logging
from app.config import JWT_SECRET_KEY, JWT_ACCESS_TOKEN_EXPIRES, TESTING

app = Flask(__name__)
CORS(app)

# Set up logging

logger = setup_logging()

app.config["JWT_SECRET_KEY"] = JWT_SECRET_KEY
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = JWT_ACCESS_TOKEN_EXPIRES
app.config["TESTING"] = TESTING

jwt = JWTManager(app)

# Load user data and store it in a global variable

app.users = load_users_from_json("data/users.json")
app.audio_files = load_audio_files("data/audio_files.json")

# Register Blueprints

app.register_blueprint(auth_blueprint)
app.register_blueprint(routes_blueprint)

# This callback function checks if a token's JTI is in the blacklist


@jwt.token_in_blocklist_loader
def check_if_token_is_blacklisted(jwt_header, jwt_payload):
    # The JWT payload should contain a unique identifier (JTI)
    jti = jwt_payload.get("jti")
    return is_blacklisted(jti)
