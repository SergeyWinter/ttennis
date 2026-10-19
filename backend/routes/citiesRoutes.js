// routes/citiesRoutes.js
const express = require('express');
const router = express.Router();

// Пока данных нет в БД, отдаем массив прямо здесь (как ты делал с testRoutes)
router.get('/', (req, res) => {
    const cities = [
        { value: 'moscow',    label: 'Москва' },
        { value: 'spb',       label: 'Санкт-Петербург' },
        { value: 'ekb',       label: 'Екатеринбург' },
        { value: 'kazan',     label: 'Казань' },
        { value: 'novosib',   label: 'Новосибирск' },
        { value: 'rostov',    label: 'Ростов-на-Дону' },
        { value: 'krasnodar', label: 'Краснодар' },
        { value: 'nizhny',    label: 'Нижний Новгород' },
    ];
    
    res.json(cities);
});

module.exports = router;