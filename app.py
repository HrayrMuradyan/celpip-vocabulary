from flask import Flask, render_template, jsonify
import json
import random

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_words')
def get_words():
    with open('vocab.json', 'r') as f:
        words = json.load(f)
    random.shuffle(words)
    return jsonify(words)

if __name__ == '__main__':
    app.run(debug=True)