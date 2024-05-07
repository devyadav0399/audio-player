# Import current_app to access app context
from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import create_access_token, jwt_required, get_jwt
from werkzeug.security import generate_password_hash, check_password_hash
from app.utils import add_to_blacklist

auth_blueprint = Blueprint("auth", __name__)


@auth_blueprint.route("/register", methods=["POST"])
def register():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    users = current_app.users  # Accessing the loaded users from the app context

    if username in users:
        return jsonify({"msg": "User already exists"}), 400

    # Store hashed password in the user data
    users[username] = {
        "username": username,
        "password": generate_password_hash(password),
    }
    return jsonify({"msg": "User registered successfully"}), 201


@auth_blueprint.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    users = current_app.users  # Accessing the loaded users from the app context

    # Check if the user exists and verify the hashed password
    if username not in users or not check_password_hash(users[username]["password"], password):
        return jsonify({"msg": "Invalid credentials"}), 401

    # Generate a JWT token if the credentials are valid
    access_token = create_access_token(identity=username)
    return jsonify({"access_token": access_token})


@auth_blueprint.route("/logout", methods=["POST"])
@jwt_required()  # Require a valid JWT token
def logout():
    # Get the JWT ID (JTI) from the token
    jti = get_jwt()["jti"]

    # Add the JTI to the blacklist
    add_to_blacklist(jti)

    return jsonify({"msg": "Successfully logged out"}), 200
