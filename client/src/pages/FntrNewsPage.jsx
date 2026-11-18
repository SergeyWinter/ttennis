import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Alert, Badge } from 'react-bootstrap';
import { useFetch } from '../hooks/useFetch';
import { getFntrNewsById } from '../services/fntrService';

function FntrNewsPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: news, loading, error } = useFetch(
        () => getFntrNewsById(id),
        [id]
    );

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    if (loading) return <Container className="p-5 text-center"><Spinner animation="border" variant="info" /></Container>;
    if (error) return <Container className="p-5"><Alert variant="danger">{error}</Alert></Container>;
    if (!news) return null;

    return (
        <Container fluid className="py-5 text-light px-4">
            <Row>
                {/* ЛЕВАЯ ЧАСТЬ — СТАТЬЯ */}
                <Col xs={12} md={8} className="border-end border-info pe-md-4">
                    <Button variant="outline-info" className="mb-4" onClick={() => navigate(-1)}>
                        ← Назад
                    </Button>

                    <div className="mb-3 d-flex align-items-center gap-3">
                        <Badge bg="info" text="dark">ФНТР</Badge>
                        <span className="text-secondary">{formatDate(news.date)}</span>
                    </div>

                    <h1 style={{ color: 'rgb(56, 235, 235)', fontWeight: 700 }} className="mb-4">
                        {news.title}
                    </h1>

                    <p className="fs-5 mb-5" style={{ lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                        {news.text || news.title}
                    </p>

                    <a 
                        href={news.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-outline-secondary"
                    >
                        Источник: сайт ФНТР
                    </a>
                </Col>

                {/* ПРАВАЯ ЧАСТЬ — САЙДБАР */}
                <Col xs={12} md={4} className="mt-4 mt-md-0 ps-md-4">
                    <div className="p-4 rounded border border-secondary h-100" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                        <h5 className="text-secondary text-center mt-5 mb-4">
                            Здесь пока пусто.
                        </h5>
                        <p className="text-center">
                            <Link to="/fntr" className="btn btn-outline-info btn-sm">
                                Все новости ФНТР
                            </Link>
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export { FntrNewsPage };