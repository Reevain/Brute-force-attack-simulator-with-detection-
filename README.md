# Brute-force-attack-simulator-with-detection-
🔐 Brute Force Attack Simulation using Flask
This project simulates a brute force attack using Python and the Flask web framework. It provides a safe and controlled environment for educational purposes to understand how brute force attacks work, how login systems respond, and how such attacks can be detected or prevented.

🚀 Features
A web interface to input:

Target URL

Username

List of passwords

Max attempts and delay between attempts

Backend logic to simulate login attempts using requests

Real-time log streaming of each attempt to the frontend

A fake login server (test_server.py) to test against with a known valid credential

📦 Components
app.py – Main Flask app handling the brute force logic and UI

templates/index.html – Frontend interface for user input and log display

test_server.py – A mock login server that responds to valid/invalid login attempts

✅ How it Works
The user enters a target login URL, username, and a list of passwords.

The Flask app starts sending POST requests simulating login attempts.

The response is streamed live to the UI showing which attempts fail or succeed.

If the correct password is found, the attack stops and displays the result.

⚠️ Disclaimer
This tool is strictly for educational and testing purposes in safe environments. Do not use it against any unauthorized system.
