from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://avnadmin:AVNS_4iwhblDyCsltSmeJoj8@mysql-posdatabase-database-pos-3380.l.aivencloud.com:27790/defaultdb?ssl-mode=REQUIRED'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://127.0.0.1:3306/?user=root'

db = SQLAlchemy(app)

@app.route('/get', methods = ['GET'])
def get_sth():
    return "hello"

if __name__ == "__main__":
    app.run(debug=True)
