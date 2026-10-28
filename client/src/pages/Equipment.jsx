import React, { useState, useMemo } from 'react';
import { Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { PlayerCard } from '../components/PlayerCard';
import { useFetch } from '../hooks/useFetch';
import { getHomepageData } from '../services/playersService';

function Equipment() {
    const [playerType, setPlayerType] = useState('world');

    const { data, loading, error } = useFetch(getHomepageData);

    const currentPlayers = useMemo(() => {
        if (!data) return [];
        return playerType === 'world' ? data.worldPlayers : data.russiaPlayers;
    }, [data, playerType]);

    if (loading) {
        return (
            <div className="text-center p-5">
                <Spinner animation="border" variant="info" />
                <p className="text-light mt-3">Загрузка игроков...</p>
            </div>
        );
    }

    if (error) {
        return <Alert variant="danger" className="m-4">{error}</Alert>;
    }

    return (
        <Row className="h-100">
            {/* ЛЕВАЯ ЧАСТЬ — ИГРОКИ */}
            <Col xs={12} md={8} className="p-4 border border-info">
                <div className="mb-4">
                    <Button
                        variant={playerType === 'world' ? 'info' : 'outline-info'}
                        className="me-2"
                        onClick={() => setPlayerType('world')}
                    >
                        World Players
                    </Button>
                    <Button
                        variant={playerType === 'russia' ? 'info' : 'outline-info'}
                        onClick={() => setPlayerType('russia')}
                    >
                        Russia Players
                    </Button>
                </div>

                {currentPlayers.length === 0 ? (
                    <p className="text-secondary">Нет игроков для отображения.</p>
                ) : (
                    currentPlayers.map((player) => (
                        <PlayerCard key={`${player.gender}-${player.id}`} player={player} />
                    ))
                )}
            </Col>

            {/* ПРАВАЯ ЧАСТЬ — оставляем пустой */}
            <Col xs={12} md={4} className="p-4 border border-info">
                {/* Здесь позже может быть рейтинг или фильтры */}
            </Col>
        </Row>
    );
}

export { Equipment };