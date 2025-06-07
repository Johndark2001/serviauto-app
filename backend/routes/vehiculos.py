from flask import Blueprint, request, jsonify, current_app
import jwt

from ext import db
from models import Vehiculo

vehiculos_bp = Blueprint('vehiculos', __name__)

# === Registrar vehículo ===
@vehiculos_bp.route('/api/vehiculos', methods=['POST'])
def registrar_vehiculo():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'error': 'Token requerido'}), 403

    try:
        datos = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
    except:
        return jsonify({'error': 'Token inválido'}), 403

    data = request.json
    nuevo = Vehiculo(
        placa=data['placa'],
        marca=data['marca'],
        modelo=data['modelo'],
        propietario_id=datos['id']
    )
    db.session.add(nuevo)
    db.session.commit()
    return jsonify({'mensaje': 'Vehículo registrado con éxito'})

# === Consultar vehículos del usuario actual ===
@vehiculos_bp.route('/api/vehiculos', methods=['GET'])
def listar_vehiculos_usuario():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'error': 'Token requerido'}), 403

    try:
        datos = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
    except:
        return jsonify({'error': 'Token inválido'}), 403

    vehiculos = Vehiculo.query.filter_by(propietario_id=datos['id']).all()
    return jsonify([
        {
            'id': v.id,
            'placa': v.placa,
            'marca': v.marca,
            'modelo': v.modelo
        } for v in vehiculos
    ])

# === Eliminar vehículo ===
@vehiculos_bp.route('/api/vehiculos/<int:vehiculo_id>', methods=['DELETE'])
def eliminar_vehiculo(vehiculo_id):
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'error': 'Token requerido'}), 403

    try:
        jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
    except:
        return jsonify({'error': 'Token inválido'}), 403

    vehiculo = Vehiculo.query.get(vehiculo_id)
    if not vehiculo:
        return jsonify({'error': 'Vehículo no encontrado'}), 404

    db.session.delete(vehiculo)
    db.session.commit()
    return jsonify({'mensaje': 'Vehículo eliminado exitosamente'})

