// src/services/newsService.js
import { API_BASE } from '../constants/api';

// 1. Функция для получения списка новостей (с фильтром по региону)
export async function getNews(region) {
    const res = await fetch(`${API_BASE}/api/news?region=${region}`);
    if (!res.ok) {
        throw new Error('Не удалось загрузить новости');
    }
    return res.json();
}

// 2. Функция для получения ОДНОЙ новости по ID
export async function getNewsById(id) {
    const res = await fetch(`${API_BASE}/api/news/${id}`);
    if (!res.ok) {
        throw new Error('Не удалось загрузить новость');
    }
    return res.json();
}