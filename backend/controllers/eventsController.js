const eventsData = require('../data/json/events.json');

const getEvents = (req, res) => {
    try {
        const region = req.query.region || 'world';
        const allEvents = eventsData?.events ?? [];
        
        // Фильтруем по региону (если передан 'world', вернем пустой массив или все события - на твой вкус)
        const filtered = allEvents.filter(e => e.region === region);
        
        res.json(filtered);
    } catch (err) {
        console.error('getEvents error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getEvents
};