// controllers/citiesController.js

// Пока базы нет, держим данные здесь.
// Потом заменишь на запрос к БД (например, через Sequelize или Mongoose).
const CITIES = [
    { value: 'moscow',    label: 'Москва' },
    { value: 'spb',       label: 'Санкт-Петербург' },
    { value: 'ekb',       label: 'Екатеринбург' },
    { value: 'kazan',     label: 'Казань' },
    { value: 'novosib',   label: 'Новосибирск' },
    { value: 'rostov',    label: 'Ростов-на-Дону' },
    { value: 'krasnodar', label: 'Краснодар' },
    { value: 'nizhny',    label: 'Нижний Новгород' },
];

const getCities = (req, res) => {
    try {
        res.json(CITIES);
    } catch (error) {
        console.error('Ошибка в getCities:', error);
        res.status(500).json({ message: 'Ошибка сервера при получении городов' });
    }
};

module.exports = {
    getCities,
};