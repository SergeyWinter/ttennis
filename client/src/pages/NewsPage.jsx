import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Spinner, Alert, Badge } from 'react-bootstrap';
import { useFetch } from '../hooks/useFetch';
import { getNewsById } from '../services/newsService';
import { API_BASE } from '../constants/api';

function NewsPage() {
    const { id } = useParams(); // Получаем id из URL (/news/1)
    const navigate = useNavigate();

    // Используем наш хук для загрузки одной новости
    const { data: news, loading, error } = useFetch(
        () => getNewsById(id),
        [id] // Если id изменится, хук перезапросит данные
    );

    if (loading) return <Container className="p-5 text-center"><Spinner animation="border" variant="info" /></Container>;
    if (error) return <Container className="p-5"><Alert variant="danger">{error}</Alert></Container>;
    if (!news) return null;

    const imageUrl = news.image 
        ? (news.image.startsWith('http') ? news.image : `${API_BASE}${news.image}`)
        : null;

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    return (
        <Container className="py-5 text-light">
            <Button variant="outline-info" className="mb-4" onClick={() => navigate(-1)}>
                ← Назад
            </Button>

            <div className="mb-3 d-flex align-items-center gap-3">
                <Badge bg="info" text="dark">{news.category}</Badge>
                <span className="text-secondary">{formatDate(news.date)}</span>
            </div>

            <h1 style={{ color: 'rgb(56, 235, 235)', fontWeight: 700 }} className="mb-4">
                {news.title}
            </h1>

            {imageUrl && (
                <img 
                    src={imageUrl} 
                    alt={news.title} 
                    className="img-fluid rounded mb-4" 
                    style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }} 
                />
            )}

            <p className="fs-5" style={{ lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                {news.text || news.preview}
            </p>
        </Container>
    );
}

export { NewsPage };