// import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {Row,Col,} from 'react-bootstrap';
// import { Post } from './Post';
import { PlayerCard } from '../components/PlayerCard';
import { getHomepageData } from '../services/homepageService'
import { Videosidbar } from './Videosidbar';
// import { Videosidbar2 } from './Videosidbar2';

function Homepage () {
 // 1. Создаем состояние для хранения массива игроков (изначально пустой массив)
  const [playersList, setPlayersList] = useState([]);
  const [videosList, setVideosList] = useState([]);

  useEffect(() => {
    // 2. Создаем внутреннюю функцию для получения данных
    const fetchAndSetPlayers = async () => {
      try {
        const data = await getHomepageData(); // Ждем выполнения запроса из сервиса
        console.log("Данные из сервиса:", data); 

        // Так как ваш сервис возвращает объект (внутри которого лежит массив players),
        // мы проверяем его наличие и сохраняем именно массив.
        if (data && data.players) {
          setPlayersList(data.players);
        }
        if (data && data.videos) {
          setVideosList(data.videos);
        }
      } catch (error) {
        console.error("Ошибка при получении игроков и видео--Homepage_jsx:", error);
      }
    };

    fetchAndSetPlayers();
  }, []); // Пустой массив зависимостей — запрос выполнится один раз при монтировании

  return (
    // <div className="container-fluid flex-grow-1 my-4">
      <Row className="h-100">
        {/* <h1 style={{ color: 'rgb(219, 237, 237)' }}>Спортсмены</h1>  */}
        {/* 3. Теперь мы перебираем корректный массив из состояния */}
        <Col xs={12} md={8} className=" p-4 border border-info">
          {playersList.map((player) => ( 
            <PlayerCard key={player.id} player={player} />    
            ))}
        </Col>
        <Col xs={12} md={4} className=" text-white p-4 border border-info">{/*bg-white*/}
            <Videosidbar videos={videosList}/>
        </Col> 
      </Row>
    //</div> 
  );
}
export {Homepage};