import React, { useMemo } from 'react';
import { Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { PlayerCard } from '../components/PlayerCard';
import { useFetch } from '../hooks/useFetch';
import { getHomepageData } from '../services/playersService';
import { useSearchParams } from 'react-router-dom';

function Equipment() {
    const [searchParams, setSearchParams] = useSearchParams();
    
    // Достаем активную вкладку из URL (по умолчанию 'world_men')
    const activeTab = searchParams.get('tab') || 'world_men';

    // При клике на кнопку меняем URL
    const handleTabChange = (tab) => {
        setSearchParams({ tab });
    };

    const { data, loading, error } = useFetch(getHomepageData);

    // Фильтруем игроков в зависимости от выбранной вкладки
    const currentPlayers = useMemo(() => {
        if (!data) return [];
        
        // 1. Определяем, откуда брать список (мир или Россия)
        const list = activeTab.includes('world') ? data.worldPlayers : data.russiaPlayers;
        
        // 2. Определяем пол (men или women)
        const gender = activeTab.includes('women') ? 'women' : 'men';
        
        // 3. Фильтруем
        return list.filter(player => player.gender === gender);
    }, [data, activeTab]);

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
                
                {/* ПАНЕЛЬ С ПЕРЕКЛЮЧАТЕЛЯМИ */}
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                    
                    {/* Слева: Мужчины (World / Russia) */}
                    <div>
                        <Button
                            variant={activeTab === 'world_men' ? 'info' : 'outline-info'}
                            className="me-2 mb-2 mb-sm-0"
                            onClick={() => handleTabChange('world_men')}
                        >
                            World Players
                        </Button>
                        <Button
                            variant={activeTab === 'russia_men' ? 'info' : 'outline-info'}
                            onClick={() => handleTabChange('russia_men')}
                        >
                            Russia Players
                        </Button>
                    </div>

                    {/* Справа: Женщины (World / Russia) */}
                    <div>
                        <Button
                            variant={activeTab === 'world_women' ? 'info' : 'outline-info'}
                            className="me-2 mb-2 mb-sm-0"
                            onClick={() => handleTabChange('world_women')}
                        >
                            World Woman Players
                        </Button>
                        <Button
                            variant={activeTab === 'russia_women' ? 'info' : 'outline-info'}
                            onClick={() => handleTabChange('russia_women')}
                        >
                            Russian Woman Players
                        </Button>
                    </div>
                </div>

                {/* СПИСОК ИГРОКОВ */}
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