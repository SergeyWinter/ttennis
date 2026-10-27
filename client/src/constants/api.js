// src/constants/api.js

// Берем URL из .env, если он там есть.
// Если нет — используем localhost по умолчанию.
export const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5001';