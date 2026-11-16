//RegionSidebar.jsx
import React, { useState } from 'react';
import { Card, Nav, Tab, Badge, Spinner } from 'react-bootstrap';

function RegionSidebar({ cityName, events = [], loading = false }) {
    const [activeTab, setActiveTab] = useState('calendar');

    return (
        <div className="mt-4">
            <h4 style={{ color: 'rgb(56, 235, 235)' }} className="mb-3">
                {cityName || 'Регион'}
            </h4>

            <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                <Nav variant="pills" className="mb-3 flex-column flex-sm-row">
                    <Nav.Item className="mb-2 mb-sm-0 me-sm-2">
                        <Nav.Link eventKey="calendar" className={activeTab === 'calendar' ? 'bg-info text-dark' : 'text-info border border-info'}>
                            🗓 Календарь
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="players" className={activeTab === 'players' ? 'bg-info text-dark' : 'text-info border border-info'}>
                            🏓 Игроки
                        </Nav.Link>
                    </Nav.Item>
                </Nav>

                <Tab.Content>
                    {/* Вкладка 1: Календарь */}
                    <Tab.Pane eventKey="calendar">
                        {loading && <div className="text-center my-3"><Spinner animation="border" size="sm" variant="info" /></div>}
                        {!loading && events.length === 0 && (
                            <p className="text-secondary text-center">Событий пока нет.</p>
                        )}
                        {!loading && events.map((event) => (
                            <Card key={event.id} bg="dark" text="light" className="border-info mb-3">
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <Badge bg={event.badgeColor || 'warning'} text="dark">{event.type}</Badge>
                                        <small className="text-secondary">{event.date}</small>
                                    </div>
                                    <Card.Title style={{ color: 'rgb(56, 235, 235)', fontSize: '16px' }}>
                                        {event.title}
                                    </Card.Title>
                                    <Card.Text style={{ fontSize: '14px' }}>
                                        {event.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        ))}
                    </Tab.Pane>

                    {/* Вкладка 2: Игроки (пока заглушка) */}
                    <Tab.Pane eventKey="players">
                        <Card bg="dark" text="light" className="border-info">
                            <Card.Body>
                                <p className="text-secondary mb-0">Здесь будет список игроков региона.</p>
                            </Card.Body>
                        </Card>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </div>
    );
}

export { RegionSidebar };