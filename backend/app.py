from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# app.config['SQLALCHEMY_DATABASE_URI'] = ''
app.config['SQLALCHEMY_DATABASE_URI'] = ''

db = SQLAlchemy(app)

@app.route('/get', methods = ['GET'])
def get_sth():
    return "hello"

if __name__ == "__main__":
    app.run(debug=True)
