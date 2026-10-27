import React from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import { API_BASE } from '../constants/api'; // Базовый URL твоего бэкенда


function NewsCard({ news }) {
    // Форматируем дату (из "2026-10-15" в "15 окт. 2026")
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    // Формируем правильный URL для картинки
    // Если картинка начинается с http (заглушка) — оставляем как есть.
    // Если это локальный путь (/image/news/...) — подставляем API_BASE.
    const imageUrl = news.image 
        ? (news.image.startsWith('http') ? news.image : `${API_BASE}${news.image}`)
        : 'https://via.placeholder.com/400x300?text=No+Image';

    return (
        <Card bg="dark" text="light" className="mb-3 border-info shadow-sm" style={{ overflow: 'hidden' }}>
            <Row className="g-0">
                {/* Картинка слева (на мобильных будет сверху) */}
                <Col xs={12} md={4}>
                    <div style={{ height: '100%', minHeight: '180px', backgroundColor: '#000' }}>
                        <Card.Img 
                            src={imageUrl} 
                            alt={news.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                </Col>

                {/* Текст справа */}
                <Col xs={12} md={8}>
                    <Card.Body className="d-flex flex-column h-100">
                        {/* Верхняя строка: Категория и Дата */}
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <Badge bg="info" text="dark" style={{ fontSize: '12px' }}>
                                {news.category}
                            </Badge>
                            <span className="text-secondary" style={{ fontSize: '13px' }}>
                                {formatDate(news.date)}
                            </span>
                        </div>
                        
                        {/* Заголовок */}
                        <Card.Title style={{ color: 'rgb(56, 235, 235)', fontSize: '20px', fontWeight: 600 }}>
                            {news.title}
                        </Card.Title>
                        
                        {/* Превью */}
                        <Card.Text className="text-light" style={{ fontSize: '15px', opacity: 0.8 }}>
                            {news.preview}
                        </Card.Text>
                        
                        {/* Кнопка "Читать далее" внизу */}
                        <div className="mt-auto pt-2">
                            <span className="text-info" style={{ cursor: 'pointer', fontWeight: 500 }}>
                                Читать далее →
                            </span>
                        </div>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}

export { NewsCard };