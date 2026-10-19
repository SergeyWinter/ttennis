import { RUSSIAN_CITIES } from '../constants/cities';

const API_BASE = 'http://localhost:5001';
const USE_MOCK = true; // ← true пока нет API, потом false

/**
 * Загружает список городов России.
 * @returns {Promise<Array<{value: string, label: string}>>}
 */
export async function getCities() {
    if (USE_MOCK) {
        // имитируем небольшую задержку сети (можно убрать)
        return new Promise((resolve) =>
            setTimeout(() => resolve(RUSSIAN_CITIES), 300)
        );
    }

    const res = await fetch(`${API_BASE}/api/cities`);

    if (!res.ok) {
        throw new Error(`Не удалось загрузить города (код ${res.status})`);
    }

    return res.json();
}