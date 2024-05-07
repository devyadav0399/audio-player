import pytest

# Test for a simple health check route


def test_health_check(client):
    response = client.get("/health")  # Send a GET request to the health route
    assert response.status_code == 200  # Check the status code
    assert response.json["status"] == "ok"  # Check the response content

# Test for a login endpoint


def test_login(client):
    login_data = {"username": "admin", "password": "adminpassword"}
    # Send POST request to login
    response = client.post("/login", json=login_data)
    assert response.status_code == 200
    # Check for the JWT token in the response
    assert "access_token" in response.json

# Test for authenticated endpoints


def test_audio_route(client):
    # Simulate login to get a valid JWT token
    login_data = {"username": "admin", "password": "adminpassword"}
    login_response = client.post("/login", json=login_data)
    token = login_response.json["access_token"]

    # Use the token to access route
    response = client.get(
        "/audio", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
