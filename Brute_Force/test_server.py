from flask import Flask, request

app = Flask(__name__)

@app.route('/login', methods=['POST'])
def login():
    username = request.form.get('username')
    password = request.form.get('password')

    # Simulated valid credentials
    if username == 'admin' and password == 'letmein':
        return 'Login successful', 200
    else:
        return 'Invalid credentials', 401

if __name__ == '__main__':
    app.run(port=5001, debug=True)
