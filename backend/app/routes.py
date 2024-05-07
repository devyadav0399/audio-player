from flask import Blueprint, jsonify, send_file, request, current_app
from flask_jwt_extended import jwt_required
import logging

routes_blueprint = Blueprint("routes", __name__)
logger = logging.getLogger("audio-player")

"""
Perform a health check on the server.

This endpoint returns a JSON response indicating that the server is up and running. It can be used to check the status of the server, for example as part of a monitoring or load balancing setup.

Returns:
    dict: A JSON object with the status and a message indicating the server is running.
"""


@routes_blueprint.route("/health", methods=["GET"])
def health_check():
    logger.info("Health check requested")
    return jsonify({"status": "ok", "message": "Server is up and running!"})


"""
Retrieve a list of all available audio files.

This endpoint allows users to retrieve a list of all audio files that are available in the application. The audio files are returned from the Flask app context.

Returns:
    list: A list of audio file dictionaries, containing the ID, name, and path of each audio file.
"""


@routes_blueprint.route("/audio", methods=["GET"])
@jwt_required()  # Requires a valid JWT token
def get_audio_files():
    audio_files = current_app.audio_files
    logger.info("Audio files requested")
    return jsonify(audio_files)


"""
Retrieve an audio file by its ID.

This endpoint allows users to retrieve a specific audio file by providing its ID. The audio file is returned from the local 'audio' folder.

Args:
    audio_id (int): The ID of the audio file to retrieve.

Returns:
    file: The requested audio file.
"""


@routes_blueprint.route("/audio/<int:audio_id>", methods=["GET"])
@jwt_required()
def get_audio_file(audio_id):
    audio_files = current_app.audio_files
    audio_file = next(
        (audio for audio in audio_files if audio["id"] == audio_id), None)

    if not audio_file:
        logger.warning(f"Audio file {audio_id} not found")
        return jsonify({"msg": "Audio file not found"}), 404

    # Return the audio file from the local 'audio' folder
    logger.info(f"Audio file {audio_file['name']} requested")
    return send_file(f"../audio/{audio_file['path']}")


"""
Search for audio files by a given query string.

This endpoint allows users to search for audio files by providing a query string. The query is matched against the name of the audio files, and a list of matching files is returned.

Args:
    query (str): The search query string.

Returns:
    list: A list of audio file dictionaries matching the search query.
"""


@routes_blueprint.route("/audio/search", methods=["GET"])
@jwt_required()
def search_audio():
    query = request.args.get("query", "").lower()

    audio_files = current_app.audio_files
    filtered_files = [
        audio for audio in audio_files if query in audio["name"].lower()]

    logger.info(f"Audio files matching query '{query}' requested")
    return jsonify(filtered_files)
