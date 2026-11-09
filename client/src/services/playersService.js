// src/services/playersService.js
import { API_BASE } from '../constants/api';

export async function getHomepageData() {
    const res = await fetch(`${API_BASE}/api/homepage`);
    if (!res.ok) {
        throw new Error('Не удалось загрузить данные игроков');
    }
    return res.json();
}
export async function getPlayerById(id) {
    const res = await fetch(`${API_BASE}/api/homepage/player/${id}`);
    if (!res.ok) {
        throw new Error('Не удалось загрузить данные игрока');
    }
    return res.json();
}