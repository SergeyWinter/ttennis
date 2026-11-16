// src/services/eventsService.js
import { API_BASE } from '../constants/api';

export async function getEvents(city) {
 
    const res = await fetch(`${API_BASE}/api/events?region=${city}`);
    if (!res.ok) throw new Error('Не удалось загрузить события');
    return res.json();
    
}