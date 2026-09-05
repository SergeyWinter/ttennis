import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Plyr } from 'plyr-react';
// import Plyr from 'plyr-react';
import 'plyr-react/plyr.css';

function Mainvideos() {
    const { id } = useParams();
    const [video, setVideo] = useState(null);

    useEffect(() => {
        const loadVideo = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5001/api/videos/${id}`
                );
                if (!response.ok) {
                    throw new Error('Видео не найдено');
                }
                const data = await response.json();
                console.log('Данные видео:', data);
                setVideo(data);
            } catch (error) {
                console.error('Ошибка:', error);
            }
        };
        loadVideo();
    }, [id]);
    
    if (!video) {
        return <div className="text-light">Загрузка...</div>;
    }
    return (
        <div className="container my-4">
            <h2 className="text-light mb-4">
                {video.title}
            </h2>
            <Plyr
                source={{
                    type: 'video',
                    sources: [
                        {
                            src: `http://localhost:5001/videos/${video.video}`,
                            type: 'video/mp4'
                        }]}}
            />
            <p className="text-light mt-3">
                {video.description}
            </p>
        </div>
    );
}

export { Mainvideos };