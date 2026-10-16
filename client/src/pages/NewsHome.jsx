import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { HeroBanner } from '../components/HeroBanner';
// import { getNewsData } from '../services/newsService'; // когда будет сервис

function NewsHome() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                // const data = await getNewsData();
                // setNews(data.news);

                // временная заглушка, пока нет API
                setNews([
                    { id: 1, title: 'WTT Champions: итоги дня', preview: 'Китай снова доминирует...' },
                    { id: 2, title: 'Новый инвентарь DHS', preview: 'Анонс Hurricane 4...' },
                    { id: 3, title: 'Felix Lebrun выиграл турнир', preview: 'Французский вундеркинд...' },
                ]);
            } catch (error) {
                console.error('Ошибка загрузки новостей:', error);
            }
        };
        fetchNews();
    }, []);

    return (
        <>
            <HeroBanner />
            <Row className="h-100">
            
                {/* ЛЕВАЯ ЧАСТЬ — НОВОСТИ */}
                <Col xs={12} md={8} className="p-4 border border-info">
                    <h2 style={{ color: 'rgb(56, 235, 235)' }} className="mb-4">
                        Новости
                    </h2>
                    {news.map((item) => (
                        <Card
                            key={item.id}
                            bg="dark"
                            text="light"
                            className="mb-3 border-info"
                        >
                            <Card.Body>
                                <Card.Title style={{ color: 'rgb(56, 235, 235)' }}>
                                    {item.title}
                                </Card.Title>
                                <Card.Text>{item.preview}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>

                {/* ПРАВАЯ ЧАСТЬ — ВИДЕО (та же боковая панель) */}
                <Col xs={12} md={4} className="text-white p-4 border border-info">
                    {/* <Videosidbar videos={videosList} /> */}
                </Col>
            </Row>
        </>
    );
}

export { NewsHome };