import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { HeroBanner } from '../components/HeroBanner';
import { useFetch } from '../hooks/useFetch';
import { getCities } from '../services/citiesService';
import { getNews } from '../services/newsService';
import { getVideos } from '../services/videosService'; //[{"id":1,"episode":1,"title":"Seria_1",...
import { NewsCard } from '../components/NewsCard';
import { Videosidbar } from './Videosidbar'; 
import { RegionSidebar } from '../components/RegionSidebar';

function NewsHome() {
    const [searchParams, setSearchParams] = useSearchParams();
        // Если в URL нет параметра newsType, по умолчанию 'world'
    const newsType = searchParams.get('type') || 'world';
    const city = searchParams.get('city') || 'moscow';

        // Функции для изменения URL
    const handleTypeChange = (type) => {
        setSearchParams({ type, city });};

    const [news, setNews] = useState([]);
    const [newsLoading, setNewsLoading] = useState(true);
    const [newsError, setNewsError] = useState(null);

    // 1. Загружаем города
    const { data: cities} = useFetch(getCities);
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

    //  Достаем массив видео (бэкенд отдает массив)
    const videosList = videosData || [];

    return (
        <>
            {/*  Показываем HeroBanner ТОЛЬКО если выбран мир */}
             {newsType === 'world' && <HeroBanner />}
            <Row className="h-100">
                {/* ЛЕВАЯ ЧАСТЬ — НОВОСТИ */}
                <Col xs={12} md={8} className="p-4 border border-info">  
                    <div className="mb-4 d-flex align-items-center gap-3 flex-wrap">
                        <Button variant={newsType === 'world' ? 'info' : 'outline-info'} onClick={() => handleTypeChange('world')}>
                            🌍 World News
                        </Button>
                        <Button variant={newsType === 'region' ? 'info' : 'outline-info'} onClick={() => handleTypeChange('region')}>
                            📍 Регион
                        </Button>
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
                    {newsType === 'world' ? (
                    // Если выбран мир — показываем видео
                  <>
                    {videosLoading && <p className="text-secondary">Загрузка видео...</p>}
                    {videosError && <p className="text-danger">{videosError}</p>}
                    {!videosLoading && !videosError && (
                 <Videosidbar videos={videosList} />
                  )}
                  </>
                   ) : (
                        // Если выбран регион — показываем только региональный сайдбар
                 <RegionSidebar cityName={cities?.find(c => c.value === city)?.label} />
                   )}
                </Col>
            </Row>
        </>
    );
}

export { NewsHome };