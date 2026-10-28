import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { HeroBanner } from '../components/HeroBanner';
import { useFetch } from '../hooks/useFetch';
import { getCities } from '../services/citiesService';
import { getNews } from '../services/newsService';
import { getVideos } from '../services/videosService'; // 👈 Добавили импорт
import { NewsCard } from '../components/NewsCard';
import { Videosidbar } from './Videosidbar'; // 👈 Добавили импорт

function NewsHome() {
    const [newsType, setNewsType] = useState('world');
    const [city, setCity] = useState('ekb');
    
    const [news, setNews] = useState([]);
    const [newsLoading, setNewsLoading] = useState(true);
    const [newsError, setNewsError] = useState(null);

    // 1. Загружаем города
    const { data: cities, loading: citiesLoading, error: citiesError } = useFetch(getCities);

    // 2. 👇 Загружаем видео (новый хук)
    const { data: videosData, loading: videosLoading, error: videosError } = useFetch(getVideos);

    // 3. Загружаем новости
    useEffect(() => {
        const fetchNewsData = async () => {
            try {
                setNewsLoading(true);
                setNewsError(null);
                const regionToFetch = newsType === 'world' ? 'world' : city;
                const data = await getNews(regionToFetch);
                setNews(data);
            } catch (err) {
                setNewsError(err.message);
            } finally {
                setNewsLoading(false);
            }
        };

        fetchNewsData();
    }, [newsType, city]);

    // 👇 Достаем массив видео (бэкенд отдает массив)
    const videosList = videosData || [];

    return (
        <>
            <HeroBanner />
            <Row className="h-100">
                {/* ЛЕВАЯ ЧАСТЬ — НОВОСТИ */}
                <Col xs={12} md={8} className="p-4 border border-info">  
                    <div className="mb-4 d-flex align-items-center gap-3 flex-wrap">
                        <Button variant={newsType === 'world' ? 'info' : 'outline-info'} onClick={() => setNewsType('world')}>
                            🌍 World News
                        </Button>
                        <Button variant={newsType === 'region' ? 'info' : 'outline-info'} onClick={() => setNewsType('region')}>
                            📍 Регион
                        </Button>
                        {newsType === 'region' && (
                            <>
                                {citiesLoading && <span className="text-secondary">Загрузка городов...</span>}
                                {citiesError && <span className="text-danger">{citiesError}</span>}
                                {!citiesLoading && !citiesError && cities && (
                                    <Form.Select value={city} onChange={(e) => setCity(e.target.value)} style={{ maxWidth: '240px' }}>
                                        {cities.map((c) => (
                                            <option key={c.value} value={c.value}>
                                                {c.label}
                                            </option>
                                        ))}
                                    </Form.Select>
                                )}
                            </>
                        )}
                    </div>
                    <h2 style={{ color: 'rgb(56, 235, 235)' }} className="mb-4">
                        {newsType === 'world' ? 'Мировые новости' : `Новости: ${cities?.find(c => c.value === city)?.label || ''}`}
                    </h2>
                    {newsLoading && <p className="text-secondary">Загрузка новостей...</p>}
                    {newsError && <p className="text-danger">{newsError}</p>}
                    {!newsLoading && !newsError && news.length === 0 && (
                        <p className="text-secondary">Новостей пока нет.</p>
                    )}
                    {!newsLoading && !newsError && news.map((item) => (
                        <NewsCard key={item.id} news={item} />
                    ))}
                </Col>

                {/* ПРАВАЯ ЧАСТЬ — ВИДЕО */}
                <Col xs={12} md={4} className="text-white p-4 border border-info">
                    {videosLoading && <p className="text-secondary">Загрузка видео...</p>}
                    {videosError && <p className="text-danger">{videosError}</p>}
                    {!videosLoading && !videosError && (
                        <Videosidbar videos={videosList} />
                    )}
                </Col>
            </Row>
        </>
    );
}

export { NewsHome };