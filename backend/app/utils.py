import os
import json
import logging
from werkzeug.security import check_password_hash

# Utility function to load users from JSON

script_dir = os.path.dirname(os.path.realpath(__file__))

def load_users_from_json(file_name):
    users_file_path = os.path.join(script_dir, "..", "data", file_name)
    with open(users_file_path, "r") as file:
        data = json.load(file)
        users = {user["username"]: user for user in data["users"]}
    return users

# Utility function to load audio files from JSON


def load_audio_files(file_name):
    audio_file_path = os.path.join(script_dir, "..", "data", file_name)
    with open(audio_file_path, "r") as file:
        data = json.load(file)
        return data["audio_files"]


# In-memory set to store blacklisted JWT IDs (JTIs)
blacklisted_tokens = set()


def add_to_blacklist(jti):
    blacklisted_tokens.add(jti)


def is_blacklisted(jti):
    return jti in blacklisted_tokens


def setup_logging():
    logger = logging.getLogger("audio-player")
    logger.setLevel(logging.INFO)

    # File handler to log to a file
    file_handler = logging.FileHandler("logs/app.log")
    file_format = logging.Formatter(
        "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    )
    file_handler.setFormatter(file_format)
    logger.addHandler(file_handler)

    # Stream handler to log to the console
    console_handler = logging.StreamHandler()
    console_handler.setFormatter(file_format)
    logger.addHandler(console_handler)

    return logger
