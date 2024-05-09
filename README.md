# Audio Player

Your Ultimate Audio Experience

## Project Description

Audio Player App is a modern audio player application that demonstrates a seamless integration of backend and frontend technologies. Built with Flask (backend) and React.js (frontend), it features secure user authentication, audio file retrieval through a RESTful API, search functionality, and audio playback.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Usage Guide](#usage-guide)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Secure authentication using JSON Web Tokens (JWT) with login and registration endpoints.
- **Audio Search**: Search for audio files using a simple keyword search.
- **Audio Playback**: Play audio files with a built-in media player.
- **RESTful API**: Flask-based backend providing REST endpoints for frontend interaction.
- **Frontend-Backend Integration**: A React.js frontend consuming a Flask backend.

## Tech Stack

- **Backend**: Flask, Flask-JWT-Extended, Flask-CORS
- **Frontend**: React.js, Axios for HTTP requests, JWT-decode
- **State Management**: React Context for managing authentication state

## Setup Instructions

### Backend Setup

1. Clone the repository: `git clone https://github.com/yourusername/audio-player.git`
2. Change to the backend directory: `cd audio-player/backend`
3. Create a virtual environment: `python3 -m venv venv`
4. Activate the virtual environment: `source venv/bin/activate`
5. Install dependencies: `pip install -r requirements.txt`
6. Create a `.env` file in the `backend/` directory:
   - Define `JWT_SECRET_KEY` for JWT-based authentication.
7. Start the Flask server: `flask run`

### Frontend Setup

1. Change to the frontend directory: `cd ../frontend`
2. Install dependencies: `npm install`
3. Create a `.env` file in the `frontend/` directory:
   - Define `VITE_BASE_URL` and add the backend server url with the port _(eg: http://127.0.0.1:5000)_
3. Start the React development server: `npm run dev`

## Usage Guide

- After setting up the backend and frontend, open a browser and navigate to `http://localhost:5173` (or the configured React port).
- Log in using credentials.
- Use the search bar to find audio files.
- Select an audio file to play.

## Screenshots

![Screenshot 1](https://github.com/devyadav0399/audio-player/assets/29747045/a1229e3c-4a6f-4cc5-ad93-fc95ccf60fa8)

![Screenshot 2](https://github.com/devyadav0399/audio-player/assets/29747045/9c65282a-2008-43a3-bd52-6e0177e32705)
