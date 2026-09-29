import React, { useEffect, useState } from 'react';
import {Row,Col,Button} from 'react-bootstrap';
import { PlayerCard } from '../components/PlayerCard';
import { getHomepageData } from '../services/homepageService'
import { Videosidbar } from './Videosidbar';

function Homepage2() {
const [worldPlayers, setWorldPlayers] = useState([]);
const [russiaPlayers, setRussiaPlayers] = useState([]);
const [videosList, setVideosList] = useState([]);
const [playerType, setPlayerType] = useState('world');

useEffect(() => {
        const fetchHomepageData = async () => {
            try {
                const data = await getHomepageData();
                console.log('Данные из сервиса:', data);
                if (data && data.worldPlayers) {
                    setWorldPlayers(data.worldPlayers);
                }
                if (data && data.russiaPlayers) {
                    setRussiaPlayers(data.russiaPlayers);
                }
                if (data && data.videos) {
                    setVideosList(data.videos);
                }
            } catch (error) {
                console.error(
                    'Ошибка при получении данных Homepage:',
                    error
                );
            }
        };
        fetchHomepageData();
    }, []);  
    // Определяем, какой список игроков показывать
const currentPlayers = playerType === 'world' ? worldPlayers: russiaPlayers;

  return (
        <Row className="h-100">
            {/* ЛЕВАЯ ЧАСТЬ — ИГРОКИ */}
            <Col
                xs={12}
                md={8}
                className="p-4 border border-info"
            >
                {/* МЕНЮ ИГРОКОВ */}
                <div className="mb-4">
                    <Button
                        variant={
                            playerType === 'world'
                                ? 'info'
                                : 'outline-info'
                        }
                        className="me-2"
                        onClick={() => setPlayerType('world')}
                    >
                        World Players
                    </Button>
                    <Button
                        variant={
                            playerType === 'russia'
                                ? 'info'
                                : 'outline-info'
                        }
                        onClick={() => setPlayerType('russia')}
                    >Russia Players</Button>
                </div>
                {/* СПИСОК ИГРОКОВ */}
                {currentPlayers.map((player) => (
                    <PlayerCard
                        key={`${player.gender}-${player.id}`}
                        player={player}
                    />
                ))}
            </Col>
            {/* ПРАВАЯ ЧАСТЬ — ВИДЕО */}
            <Col
                xs={12}
                md={4}
                className="text-white p-4 border border-info"
            >
                <Videosidbar videos={videosList} />
            </Col>
        </Row>
  );
}

export {Homepage2};
