import sys
import os

# Add the parent directory to sys.path and print the path to debug
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
print("Current sys.path:", sys.path)  # Debug output to check the path

import pytest
from app import app  # Try importing the Flask app


@pytest.fixture
def client():
    # Create a test client that can be used in test cases
    with app.test_client() as client:
        yield client  # Provide the test client to test cases
