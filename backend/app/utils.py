import json
from werkzeug.security import check_password_hash


def load_users_from_json(json_path):
    with open(json_path, "r") as file:
        data = json.load(file)
        users = {user["username"]: user for user in data["users"]}
    return users

# Utility function to load audio files from JSON


def load_audio_files(json_path):
    with open(json_path, "r") as file:
        data = json.load(file)
        return data["audio_files"]


# In-memory set to store blacklisted JWT IDs (JTIs)
blacklisted_tokens = set()


def add_to_blacklist(jti):
    blacklisted_tokens.add(jti)


def is_blacklisted(jti):
    return jti in blacklisted_tokens
