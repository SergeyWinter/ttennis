// src/services/videosService.js
import { API_BASE } from '../constants/api';//http://localhost:5001

export async function getVideos() {
    const res = await fetch(`${API_BASE}/api/videos`);//[{"id":1,"episode":1,"title":"Seria_1",....
    if (!res.ok) {
        throw new Error('Не удалось загрузить видео');
    }
    return res.json();
}