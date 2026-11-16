import { API_BASE } from '../constants/api';

export async function getFntrNews() {
    const res = await fetch(`${API_BASE}/api/fntr`);
    if (!res.ok) throw new Error('Не удалось загрузить новости ФНТР');
    return res.json();
}