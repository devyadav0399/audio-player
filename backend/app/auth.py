# Import current_app to access app context
from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import create_access_token, jwt_required, get_jwt
from werkzeug.security import generate_password_hash, check_password_hash
from app.utils import add_to_blacklist

auth_blueprint = Blueprint("auth", __name__)


"""
Registers a new user with the provided username and password.

This endpoint handles user registration. It checks if the provided username already exists in the system, and if not, it stores the hashed password in the user data.

Args:
    username (str): The username of the new user.
    password (str): The password of the new user.

Returns:
    A JSON response with a success message and a 201 status code if the user was registered successfully, or an error message and a 400 status code if the user already exists.
"""


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


"""
Authenticates a user and generates an access token.

This endpoint handles user login by verifying the provided username and password.
If the credentials are valid, it generates a JWT access token that can be used
for subsequent authenticated requests.

Args:
    username (str): The username of the user attempting to log in.
    password (str): The password of the user attempting to log in.

Returns:
    dict: A JSON response containing the access token if the login is successful,
    or an error message if the login fails.
"""


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


"""
Logs out the current user by adding the JWT ID (JTI) to a blacklist.

This endpoint is used to log out the current user by invalidating the JWT token
that was used for authentication. It retrieves the JWT ID (JTI) from the token
and adds it to a blacklist, effectively revoking the token and preventing its
further use.

Returns:
    dict: A JSON response indicating that the user has been successfully logged out.
"""


@auth_blueprint.route("/logout", methods=["POST"])
@jwt_required()  # Require a valid JWT token
def logout():
    # Get the JWT ID (JTI) from the token
    jti = get_jwt()["jti"]

    # Add the JTI to the blacklist
    add_to_blacklist(jti)

    return jsonify({"msg": "Successfully logged out"}), 200
