from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime

from ext import db
from models import Usuario

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/api/register', methods=['POST'])
def register():
    data = request.json
    if Usuario.query.filter_by(correo=data['correo']).first():
        return jsonify({'mensaje': 'Ruta funcionando'})

    nuevo = Usuario(
        nombre=data['nombre'],
        correo=data['correo'],
        password=generate_password_hash(data['password']),
        rol=data['rol']
    )
    db.session.add(nuevo)
    db.session.commit()
    return jsonify({'mensaje': 'Usuario registrado con éxito'})

@auth_bp.route('/api/login', methods=['POST'])
def login():
    data = request.json
    usuario = Usuario.query.filter_by(correo=data['correo']).first()

    if not usuario or not check_password_hash(usuario.password, data['password']):
        return jsonify({'error': 'Credenciales inválidas'}), 401

    token = jwt.encode({
        'id': usuario.id,
        'nombre': usuario.nombre,
        'rol': usuario.rol,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=2)
    }, 'clave-super-secreta', algorithm='HS256')

    return jsonify({'token': token})
