from flask import Flask, render_template, request, redirect, url_for
import datetime

app = Flask(__name__)

# Home route serves your HTML
@app.route('/')
def home():
    return render_template('index.html')

# Form submission route
@app.route('/submit', methods=['POST'])
def submit():
    name = request.form.get('name')
    email = request.form.get('email')
    property_type = request.form.get('property')
    message = request.form.get('message')
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # Print to Terminal (for development)
    print(f"\n--- New Vastu Consultation Request ---")
    print(f"Time: {timestamp}")
    print(f"Name: {name}")
    print(f"Email: {email}")
    print(f"Property Type: {property_type}")
    print(f"Message: {message}\n")

    # Optionally: Save to file for record
    with open("submissions.txt", "a") as file:
        file.write(f"{timestamp} - {name}, {email}, {property_type}, {message}\n")

    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)
