import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Alert, Card } from 'react-bootstrap';
import { useFetch } from '../hooks/useFetch';
import { getPlayerById } from '../services/playersService';
import { getPlayerNews } from '../services/playerNewsService';
import { API_BASE } from '../constants/api';

function PlayerPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Загружаем данные игрока
    const { data: player, loading: playerLoading, error: playerError } = useFetch(
        () => getPlayerById(id),
        [id]
    );

    // Загружаем новости игрока
    const { data: news, loading: newsLoading, error: newsError } = useFetch(
        () => getPlayerNews(id),
        [id]
    );

    if (playerLoading) {
        return <Container className="p-5 text-center"><Spinner animation="border" variant="info" /></Container>;
    }
    if (playerError) {
        return <Container className="p-5"><Alert variant="danger">{playerError}</Alert></Container>;
    }
    if (!player) return null;

    // Форматируем дату для новостей
    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    return (
        <Container className="py-5 text-light">
            <Button variant="outline-info" className="mb-4" onClick={() => navigate(-1)}>
                ← Назад
            </Button>

            <Row>
                {/* Левая колонка: Фото и основная информация */}
                <Col xs={12} md={4}>
                    <img
                        src={`${API_BASE}/image/players/${player.image}`}
                        alt={player.name}
                        className="img-fluid rounded mb-4"
                    />
                </Col>

                {/* Правая колонка: Данные и инвентарь */}
                <Col xs={12} md={8}>
                    <h1 style={{ color: 'rgb(56, 235, 235)' }}>{player.name}</h1>
                    <p className="fs-5 text-secondary mb-4">{player.country}</p>
                    <p className="fs-5 mb-5">{player.preview}</p>

                    <h4 style={{ color: 'rgb(56, 235, 235)' }} className="mb-3">Инвентарь</h4>
                    <Row className="mb-5">
                        {/* Основание */}
                        <Col xs={4} className="text-center">
                            <div className="p-2 border border-info rounded mb-2" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
                                <img src={`${API_BASE}/image/blade/${player.equipment.blade.image}`} alt="blade" className="img-fluid" style={{ maxHeight: '80px', objectFit: 'contain' }} />
                            </div>
                            <small style={{ color: 'rgb(193, 235, 56)' }}>{player.equipment.blade.name}</small>
                        </Col>
                        {/* Forehand */}
                        <Col xs={4} className="text-center">
                            <div className="p-2 border border-info rounded mb-2" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
                                <img src={`${API_BASE}/image/rubbers/${player.equipment.forehand.image}`} alt="forehand" className="img-fluid" style={{ maxHeight: '80px', objectFit: 'contain' }} />
                            </div>
                            <small style={{ color: 'rgb(56, 235, 74)' }}>{player.equipment.forehand.name}</small>
                        </Col>
                        {/* Backhand */}
                        <Col xs={4} className="text-center">
                            <div className="p-2 border border-info rounded mb-2" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
                                <img src={`${API_BASE}/image/rubbers/${player.equipment.backhand.image}`} alt="backhand" className="img-fluid" style={{ maxHeight: '80px', objectFit: 'contain' }} />
                            </div>
                            <small style={{ color: 'rgb(56, 235, 74)' }}>{player.equipment.backhand.name}</small>
                        </Col>
                    </Row>
                </Col>
            </Row>

            {/* Секция новостей об игроке */}
            <hr className="border-info my-5" />
            <h3 style={{ color: 'rgb(56, 235, 235)' }} className="mb-4">Новости об игроке</h3>
            
            {newsLoading && <p>Загрузка новостей...</p>}
            {newsError && <p className="text-danger">{newsError}</p>}
            {!newsLoading && !newsError && news.length === 0 && (
                <p className="text-secondary">Новостей об этом игроке пока нет.</p>
            )}
            
            {!newsLoading && !newsError && news.map((item) => (
                <Card key={item.id} bg="dark" text="light" className="mb-3 border-info">
                    <Card.Body>
                        <div className="text-secondary mb-2" style={{ fontSize: '13px' }}>
                            {formatDate(item.date)}
                        </div>
                        <Card.Title style={{ color: 'rgb(56, 235, 235)' }}>{item.title}</Card.Title>
                        <Card.Text>{item.text}</Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
}

export { PlayerPage };