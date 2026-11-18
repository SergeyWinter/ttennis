import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Spinner, Alert, Card, Badge, Nav, Tab } from 'react-bootstrap';
import { useFetch } from '../hooks/useFetch';
import { getFntrNews } from '../services/fntrService';

function FntrPage() {
    const { data: news, loading, error } = useFetch(getFntrNews);

    // Состояния для активных вкладок слева и справа
    const [leftTab, setLeftTab] = useState('news');
    const [rightTab, setRightTab] = useState('players');

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
        <Container fluid className="py-5 text-light px-4">
            <Row>
                {/* ЛЕВАЯ ЧАСТЬ — НОВОСТИ ФНТР */}
                <Col xs={12} md={8} className="border-end border-info pe-md-4">
                    <div className="d-flex align-items-center mb-4">
                        <h1 style={{ color: 'rgb(56, 235, 235)', fontWeight: 700 }} className="mb-0">
                            🏆 ФНТР
                        </h1>
                    </div>
                    <p className="text-secondary mb-4">Официальные новости Федерации настольного тенниса России.</p>

                    {/* МЕНЮ СЛЕВА */}
                    <Tab.Container activeKey={leftTab} onSelect={(k) => setLeftTab(k)}>
                        <Nav variant="pills" className="mb-4">
                            <Nav.Item className="me-2">
                                <Nav.Link eventKey="news" className={leftTab === 'news' ? 'bg-info text-dark' : 'text-info border border-info'}>
                                    📰 Новости
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="documents" className={leftTab === 'documents' ? 'bg-info text-dark' : 'text-info border border-info'}>
                                    📄 Документы
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>

                        <Tab.Content>
                            {/* Вкладка: Новости */}
                            <Tab.Pane eventKey="news">
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
                                                <Link to={`/fntr/${item.id}`} className="btn btn-outline-info">
                                                    Читать далее →
                                                </Link>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </Tab.Pane>

                            {/* Вкладка: Документы (пока заглушка) */}
                            <Tab.Pane eventKey="documents">
                                <Card bg="dark" text="light" className="border-info">
                                    <Card.Body>
                                        <p className="text-secondary mb-0">
                                            Здесь будут официальные документы, регламенты и положения ФНТР.
                                        </p>
                                    </Card.Body>
                                </Card>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </Col>

                {/* ПРАВАЯ ЧАСТЬ — САЙДБАР */}
                <Col xs={12} md={4} className="mt-4 mt-md-0 ps-md-4">
                    {/* МЕНЮ СПРАВА */}
                    <Tab.Container activeKey={rightTab} onSelect={(k) => setRightTab(k)}>
                        <Nav variant="pills" className="mb-4">
                            <Nav.Item className="me-2">
                                <Nav.Link eventKey="players" className={rightTab === 'players' ? 'bg-info text-dark' : 'text-info border border-info'}>
                                    🏓 Игроки
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="links" className={rightTab === 'links' ? 'bg-info text-dark' : 'text-info border border-info'}>
                                    🔗 Ссылки
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>

                        <Tab.Content>
                            {/* Вкладка: Игроки (пока пустая) */}
                            <Tab.Pane eventKey="players">
                                <Card bg="dark" text="light" className="border-info shadow-sm">
                                    <Card.Body className="text-center p-4">
                                        <h5 className="text-secondary mb-0">
                                            Рейтинг игроков<br />скоро появится здесь.
                                        </h5>
                                    </Card.Body>
                                </Card>
                            </Tab.Pane>

                            {/* Вкладка: Ссылки (пока пустая) */}
                            <Tab.Pane eventKey="links">
                                <Card bg="dark" text="light" className="border-info shadow-sm">
                                    <Card.Body className="text-center p-4">
                                        <h5 className="text-secondary mb-0">
                                            Полезные ссылки<br />скоро появятся здесь.
                                        </h5>
                                    </Card.Body>
                                </Card>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </Col>
            </Row>
        </Container>
    );
}

export { FntrPage };