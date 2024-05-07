from flask import Blueprint, jsonify, send_file, request, current_app
from flask_jwt_extended import jwt_required

routes_blueprint = Blueprint("routes", __name__)

# Sample audio files for demonstration
audio_files = [
    {"id": 1, "name": "Sample 1", "path": "audio/sample1.mp3"},
    {"id": 2, "name": "Sample 2", "path": "audio/sample2.mp3"},
]

# Health check route


@routes_blueprint.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok", "message": "Server is up and running!"})


@routes_blueprint.route("/audio", methods=["GET"])
@jwt_required()  # Requires a valid JWT token
def get_audio_files():
    # Access audio files from the Flask app context
    audio_files = current_app.audio_files
    return jsonify(audio_files)


@routes_blueprint.route("/audio/<int:audio_id>", methods=["GET"])
@jwt_required()
def get_audio_file(audio_id):
    # Access audio files from the Flask app context
    audio_files = current_app.audio_files
    audio_file = next(
        (audio for audio in audio_files if audio["id"] == audio_id), None)

    if not audio_file:
        return jsonify({"msg": "Audio file not found"}), 404

    # Return the audio file from the local 'audio' folder
    return send_file(f"../audio/{audio_file['path']}")


@routes_blueprint.route("/audio/search", methods=["GET"])
@jwt_required()
def search_audio():
    query = request.args.get("query", "").lower()
    # Access audio files from the Flask app context
    audio_files = current_app.audio_files
    filtered_files = [
        audio for audio in audio_files if query in audio["name"].lower()]

    return jsonify(filtered_files)
