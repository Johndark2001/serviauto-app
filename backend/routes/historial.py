from flask import Blueprint, request, jsonify, current_app
import jwt
import datetime
from ext import db
from models import Historial

historial_bp = Blueprint('historial', __name__)

# === Consultar historial de un vehículo específico ===
@historial_bp.route('/api/historial/vehiculo/<int:vehiculo_id>', methods=['GET'])
def ver_historial(vehiculo_id):
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'error': 'Token requerido'}), 403

    try:
        jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
    except:
        return jsonify({'error': 'Token inválido'}), 403

    registros = Historial.query.filter_by(vehiculo_id=vehiculo_id).all()
    return jsonify([
        {
            'fecha': h.fecha.isoformat(),
            'descripcion': h.descripcion
        } for h in registros
    ])

# === Registrar historial de servicio para un vehículo ===
@historial_bp.route('/api/historial', methods=['POST'])
def registrar_historial():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'error': 'Token requerido'}), 403

    try:
        jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
    except:
        return jsonify({'error': 'Token inválido'}), 403

    data = request.json
    nuevo = Historial(
        descripcion=data['descripcion'],
        fecha=datetime.datetime.fromisoformat(data['fecha']),
        vehiculo_id=data['vehiculo_id']
    )
    db.session.add(nuevo)
    db.session.commit()
    return jsonify({'mensaje': 'Historial registrado con éxito'})
