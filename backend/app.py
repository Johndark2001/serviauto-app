from flask import Flask
from flask_cors import CORS
from flasgger import Swagger
from ext import db

app = Flask(__name__)
app.config['SECRET_KEY'] = 'clave-super-secreta'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SWAGGER'] = {'title': 'API ServiAuto', 'uiversion': 3}

Swagger(app)
CORS(app)
db.init_app(app)

# Importar modelos (primero)
import models

# Registrar Blueprints (después)
from routes.auth import auth_bp
from routes.citas import citas_bp
from routes.vehiculos import vehiculos_bp
from routes.historial import historial_bp

app.register_blueprint(auth_bp)
app.register_blueprint(citas_bp)
app.register_blueprint(vehiculos_bp)
app.register_blueprint(historial_bp)

# Crear la base de datos
def crear_bd():
    with app.app_context():
        db.create_all()

# Ejecutar
if __name__ == '__main__':
    crear_bd()
    app.run(debug=True)
