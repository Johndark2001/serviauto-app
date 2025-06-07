from flask import Blueprint, request, jsonify, current_app
import jwt
import datetime

from ext import db
from models import Cita

citas_bp = Blueprint('citas', __name__)

@citas_bp.route('/api/citas', methods=['POST'])
def crear_cita():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'error': 'Token requerido'}), 403

    try:
        datos_token = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
    except:
        return jsonify({'error': 'Token inválido'}), 403

    data = request.json
    nueva_cita = Cita(
        fecha=datetime.datetime.fromisoformat(data['fecha']),
        estado='activa',
        usuario_id=datos_token['id'],
        vehiculo_id=data['vehiculo_id']
    )
    db.session.add(nueva_cita)
    db.session.commit()
    return jsonify({'mensaje': 'Cita registrada con éxito'})

@citas_bp.route('/api/citas', methods=['GET'])
def listar_citas():
    citas = Cita.query.all()
    return jsonify([
        {
            'id': c.id,
            'fecha': c.fecha.isoformat(),
            'estado': c.estado
        } for c in citas
    ])

@citas_bp.route('/api/citas/<int:cita_id>', methods=['DELETE'])
def eliminar_cita(cita_id):
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'error': 'Token requerido'}), 403

    try:
        jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
    except:
        return jsonify({'error': 'Token inválido'}), 403

    cita = Cita.query.get(cita_id)
    if not cita:
        return jsonify({'error': 'Cita no encontrada'}), 404

    db.session.delete(cita)
    db.session.commit()
    return jsonify({'mensaje': 'Cita eliminada exitosamente'})

@citas_bp.route('/api/citas/<int:cita_id>/cancelar', methods=['PUT'])
def cancelar_cita(cita_id):
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'error': 'Token requerido'}), 403

    try:
        jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
    except:
        return jsonify({'error': 'Token inválido'}), 403

    cita = Cita.query.get(cita_id)
    if not cita:
        return jsonify({'error': 'Cita no encontrada'}), 404

    cita.estado = 'cancelada'
    db.session.commit()
    return jsonify({'mensaje': 'Cita cancelada exitosamente'})

