// src/services/videosService.js
import { API_BASE } from '../constants/api';

export async function getVideos() {
    const res = await fetch(`${API_BASE}/api/videos`);
    if (!res.ok) {
        throw new Error('Не удалось загрузить видео');
    }
    return res.json();
}