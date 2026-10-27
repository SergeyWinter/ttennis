// import axios from 'axios';
import { API_BASE } from '../constants/api'; // Базовый URL твоего бэкенда

export const getHomepageData = async () => {
    const response = await fetch(`${API_BASE}/api/homepage`);
    return response.json();
};