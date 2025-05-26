from flask import Flask, render_template, request, redirect, url_for
from flask_pymongo import PyMongo

app = Flask(__name__)

# 📌 Conexión a MongoDB (ajústala si usas Atlas u otro host)
app.config["MONGO_URI"] = "mongodb://localhost:27017/autoparts_db"
mongo = PyMongo(app)

# 🌐 Rutas principales
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/registro')
def registro():
    return render_template('registro.html')

@app.route('/catalogo')
def catalogo():
    return render_template('catalogo.html')

@app.route('/mayorista')
def mayorista():
    return render_template('mayorista.html')

# Otras rutas arriba...

@app.route('/api/productos')
def api_productos():
    productos = list(mongo.db.productos.find({}, {'_id': 0}))
    return {"productos": productos}

if __name__ == '__main__':
    app.run(debug=True)

