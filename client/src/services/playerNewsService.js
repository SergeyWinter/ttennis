import { API_BASE } from '../constants/api';

export async function getPlayerNews(playerId) {
    // Если у тебя на бэке пока нет роута для новостей игрока, 
    // можно временно фильтровать на клиенте или сделать роут на бэке.
    // Давай сделаем правильный роут на бэке (шаг 2.5).
    const res = await fetch(`${API_BASE}/api/homepage/player/${playerId}/news`);
    if (!res.ok) {
        throw new Error('Не удалось загрузить новости игрока');
    }
    return res.json();
}