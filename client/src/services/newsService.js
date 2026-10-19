// src/services/newsService.js

// Пока API нет, используем мок-данные прямо здесь
const MOCK_NEWS = [
    // Мировые
    { id: 1, region: 'world', category: 'WTT Grand Smash', title: 'China Smash 2026: итоги', preview: 'Главные события прошедшего турнира...' },
    { id: 2, region: 'world', category: 'WTT Contender',   title: 'Istanbul: результаты',     preview: 'Сенсации и разочарования...' },
    // Москва
    { id: 10, region: 'moscow', category: 'Чемпионат Москвы', title: 'Финал Кубка Москвы',      preview: 'В финале встретились...' },
    { id: 11, region: 'moscow', category: 'Клубные новости',  title: 'Новый клуб в Москве',     preview: 'Открытие нового клуба...' },
    // Екатеринбург
    { id: 20, region: 'ekb',    category: 'Урал',             title: 'Турнир в Екатеринбурге',  preview: 'Кубок Урала собрал...' },
];

const API_BASE = 'http://localhost:5001';
const USE_MOCK = true; // Пока true, потом переключим на false

export async function getNews(region) {
    if (USE_MOCK) {
        // Имитируем задержку сети
        return new Promise((resolve) => {
            setTimeout(() => {
                const filtered = MOCK_NEWS.filter(n => n.region === region);
                resolve(filtered);
            }, 300);
        });
    }

    // Когда будет реальный API, раскомментируешь это:
    // const res = await fetch(`${API_BASE}/api/news?region=${region}`);
    // if (!res.ok) throw new Error('Ошибка загрузки новостей');
    // return res.json();
}