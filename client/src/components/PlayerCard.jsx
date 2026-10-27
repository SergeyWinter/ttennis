import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { API_BASE } from '../constants/api'; // Базовый URL твоего бэкенда

function EquipmentCard({ image, name, color, baseUrl }) {
    return (
        <div className="text-center mb-3">
            <div
                className="rounded d-flex align-items-center justify-content-center"
                style={{
                    // backgroundColor: '#0d3b4a',
                    padding: '8px',
                    height: '110px',
                    border: '1px solid rgba(56, 235, 235, 0.3)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 0 12px rgba(56, 235, 235, 0.5)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                }}
            >
                <img
                    src={`${baseUrl}${image}`}
                    alt={name}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain'
                    }}
                />
            </div>
            <div
                style={{
                    color: color,
                    fontSize: '16px',
                    marginTop: '6px',
                    lineHeight: 1.2
                }}
            >
                {name}
            </div>
        </div>
    );
}

function PlayerCard({ player }) {
    const IMG_BASE = `${API_BASE}/image`;

    return (
        <Row className="mb-5 border-bottom border-info pb-4 align-items-start">
            {/* Фото игрока — слева */}
            <Col xs={12} md={3} lg={2} className="mb-3 mb-md-0">
                <img
                    src={`${IMG_BASE}/players/${player.image}`}
                    alt={player.name}
                    className="img-fluid rounded"
                />
            </Col>

            {/* Информация об игроке */}
            <Col xs={12} md={5} lg={6}>
                <h3 style={{ color: 'rgb(56, 235, 235)' }}>{player.name}</h3>
                <p className="text-light mb-3">{player.country}</p>
                <p className="text-light fs-4">{player.preview}</p>
            </Col>

            {/* Инвентарь — справа */}
            <Col xs={12} md={4} lg={4}>
                <EquipmentCard
                    image={player.equipment.blade.image}
                    name={player.equipment.blade.name}
                    color="rgb(193, 235, 56)"
                    baseUrl={`${IMG_BASE}/blade/`}
                />
                <EquipmentCard
                    image={player.equipment.forehand.image}
                    name={player.equipment.forehand.name}
                    color="rgb(56, 235, 74)"
                    baseUrl={`${IMG_BASE}/rubbers/`}
                />
                <EquipmentCard
                    image={player.equipment.backhand.image}
                    name={player.equipment.backhand.name}
                    color="rgb(56, 235, 74)"
                    baseUrl={`${IMG_BASE}/rubbers/`}
                />
            </Col>
        </Row>
    );
}

export { PlayerCard };