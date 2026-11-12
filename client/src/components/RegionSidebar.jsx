import React, { useState } from 'react';
import { Card, Nav, Tab, Badge } from 'react-bootstrap';

function RegionSidebar({ cityName }) {
    // Состояние для активной вкладки (по умолчанию 'calendar')
    const [activeTab, setActiveTab] = useState('calendar');

    return (
        <div className="mt-4">
            <h4 style={{ color: 'rgb(56, 235, 235)' }} className="mb-3">
                {cityName || 'Регион'}
            </h4>

            <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                {/* Вкладки (Tabs) */}
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

                {/* Контент вкладок */}
                <Tab.Content>
                    {/* Вкладка 1: Календарь */}
                    <Tab.Pane eventKey="calendar">
                        <Card bg="dark" text="light" className="border-info mb-3">
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <Badge bg="warning" text="dark">Турнир</Badge>
                                    <small className="text-secondary">15 Ноября</small>
                                </div>
                                <Card.Title style={{ color: 'rgb(56, 235, 235)', fontSize: '16px' }}>
                                    Кубок города по настольному теннису
                                </Card.Title>
                                <Card.Text style={{ fontSize: '14px' }}>
                                    Спорткомплекс "Лужники". Начало в 10:00. Регистрация открыта.
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        <Card bg="dark" text="light" className="border-info mb-3">
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <Badge bg="success" text="dark">Клубный турнир</Badge>
                                    <small className="text-secondary">20 Ноября</small>
                                </div>
                                <Card.Title style={{ color: 'rgb(56, 235, 235)', fontSize: '16px' }}>
                                    Ночная лига. Этап 3
                                </Card.Title>
                                <Card.Text style={{ fontSize: '14px' }}>
                                    Клуб "Топ-Спин". Начало в 19:00.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        
                        <p className="text-secondary text-center mt-3">
                            Пока показаны тестовые данные. Позже подтянем с бэкенда.
                        </p>
                    </Tab.Pane>

                    {/* Вкладка 2: Игроки (пока заглушка) */}
                    <Tab.Pane eventKey="players">
                        <Card bg="dark" text="light" className="border-info">
                            <Card.Body>
                                <p className="text-secondary mb-0">
                                    Здесь будет список лучших игроков региона.
                                </p>
                            </Card.Body>
                        </Card>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </div>
    );
}

export { RegionSidebar };