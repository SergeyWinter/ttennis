import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { HeroBanner } from '../components/HeroBanner';
import { useFetch } from '../hooks/useFetch'; // Наш новый хук
import { getCities } from '../services/citiesService'; // Сервис городов
import { getNews } from '../services/newsService'; // Сервис новостей
import { NewsCard } from '../components/NewsCard'; // Компонент карточки новости

function NewsHome() {
    // Состояния для фильтров
    const [newsType, setNewsType] = useState('world'); // 'world' или 'region'
    const [city, setCity] = useState('moscow'); // выбранный город
    // Состояния для самих новостей
    const [news, setNews] = useState([]);
    const [newsLoading, setNewsLoading] = useState(true);
    const [newsError, setNewsError] = useState(null);
    // 1. Загружаем города с помощью нашего хука (он сам обработает loading/error)
    const { data: cities, loading: citiesLoading, error: citiesError } = useFetch(getCities);

    // 2. Загружаем новости при изменении newsType или city
    useEffect(() => {
        const fetchNewsData = async () => {
            try {
                setNewsLoading(true);
                setNewsError(null);
                // Определяем, какой регион запрашивать
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
    }, [newsType, city]); // Эффект сработает при смене вкладки или города

    return (
        <>
            <HeroBanner />
            <Row className="h-100">
                {/* ЛЕВАЯ ЧАСТЬ — НОВОСТИ */}
                <Col xs={12} md={8} className="p-4 border border-info">  
                    {/* БЛОК ФИЛЬТРОВ */}
                    <div className="mb-4 d-flex align-items-center gap-3 flex-wrap">
                        <Button variant={newsType === 'world' ? 'info' : 'outline-info'}onClick={() => setNewsType('world')}>
                            🌍 World News
                        </Button>
                        <Button variant={newsType === 'region' ? 'info' : 'outline-info'}onClick={() => setNewsType('region')}>
                            📍 Регион
                        </Button>
                        {/* Выпадающий список городов (появляется только если выбран регион) */}
                        {newsType === 'region' && (
                            <>
                                {citiesLoading && <span className="text-secondary">Загрузка городов...</span>}
                                {citiesError && <span className="text-danger">{citiesError}</span>}
                                {!citiesLoading && !citiesError && cities && (
                                    <Form.Select value={city} onChange={(e) => setCity(e.target.value)}style={{ maxWidth: '240px' }}>
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
                    {/* СПИСОК НОВОСТЕЙ (с обработкой состояний) */}
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
                    {/* Пока тут пусто, позже добавим Videosidbar */}
                </Col>
            </Row>
        </>
    );
}
export { NewsHome };