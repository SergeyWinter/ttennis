import React from 'react';
import { Row, Col } from 'react-bootstrap';

function PlayerCard({ player }) {

    return (
        <Row className="mb-5 border-bottom border-info pb-4">
            {/* Левая часть */}
            <Col xs={12} lg={8} >
                <h3 style={{ color: 'rgb(56, 235, 235)' }}>{player.name}</h3>
                <p className="text-light mb-3">
                    {player.country}
                </p>
                <p className="text-light fs-4">
                    {player.preview}
                </p>
            </Col>
            {/* Правая часть */}
            <Col xs={12} lg={4}>
                <Row>
                    {/* Фото игрока */}
                    <Col xs={6}>
                        <img
                            src={`http://localhost:5001/image/players/${player.image}`}
                            alt={player.name}
                            className="img-fluid rounded"
                        />
                    </Col>
                    {/* Инвентарь */}
                    <Col
                        xs={6}
                        className="d-flex flex-column justify-content-between">
                        {/* Основание */}
                        <div className="text-center text-light mb-3">
                            <img
                                src={`http://localhost:5001/image/blade/${player.equipment.blade.image}`}
                                alt={player.equipment.blade.name}
                                className="rounded mb-2"
                                style={{
                                    width: '100%',
                                    height: '80px',
                                    objectFit: 'cover'
                                }}
                            />
                            <div style={{ color: 'rgb(193, 235, 56)', fontSize: '20px'}}>
                                {player.equipment.blade.name}
                            </div>
                        </div>
                        {/* Forehand */}
                        <div className="text-center text-light mb-3">
                            <img
                                src={`http://localhost:5001/image/rubbers/${player.equipment.forehand.image}`}
                                alt={player.equipment.forehand.name}
                                className="rounded mb-2"
                                style={{
                                    width: '100%',
                                    height: '80px',
                                    objectFit: 'cover'
                                }}
                            />
                            {/* <div className="border text-light p-2"> */}
                            <div style={{ color: 'rgb(56, 235, 74)' }}>
                                {player.equipment.forehand.name}
                            </div>
                        </div>
                        {/* Backhand */}
                        <div className="text-center text-light">
                            <img
                                src={`http://localhost:5001/image/rubbers/${player.equipment.backhand.image}`}
                                alt={player.equipment.backhand.name}
                                className="rounded mb-2"
                                style={{
                                    width: '100%',
                                    height: '80px',
                                    objectFit: 'cover'
                                }}
                            />
                            <div style={{ color: 'rgb(56, 235, 74)' }}>
                                {player.equipment.backhand.name}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export { PlayerCard };