import React from 'react';
import { Container, Spinner, Alert, Card, Badge } from 'react-bootstrap';
import { useFetch } from '../hooks/useFetch';
import { getFntrNews } from '../services/fntrService';

function FntrPage() {
    const { data: news, loading, error } = useFetch(getFntrNews);

    // Форматирование даты
    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    if (loading) {
        return <Container className="p-5 text-center"><Spinner animation="border" variant="info" /></Container>;
    }

    if (error) {
        return <Container className="p-5"><Alert variant="danger">{error}</Alert></Container>;
    }

    return (
        <Container className="py-5 text-light">
            <div className="d-flex align-items-center mb-4">
                <h1 style={{ color: 'rgb(56, 235, 235)', fontWeight: 700 }} className="mb-0">
                    🏆 Новости ФНТР
                </h1>
            </div>
            <p className="text-secondary mb-5">Официальные новости Федерации настольного тенниса России.</p>

            {news.length === 0 && (
                <Alert variant="info">Новостей пока нет.</Alert>
            )}

            {news.map((item) => (
                <Card key={item.id} bg="dark" text="light" className="mb-4 border-info shadow-sm">
                    <Card.Body className="p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <Badge bg="info" text="dark">ФНТР</Badge>
                            <span className="text-secondary" style={{ fontSize: '14px' }}>
                                {formatDate(item.date)}
                            </span>
                        </div>
                        
                        <Card.Title style={{ color: 'rgb(56, 235, 235)', fontSize: '22px', fontWeight: 600 }}>
                            {item.title}
                        </Card.Title>
                        
                        <div className="mt-4">
                            <a 
                                href={item.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="btn btn-outline-info"
                            >
                                Читать на сайте ФНТР →
                            </a>
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
}

export { FntrPage };