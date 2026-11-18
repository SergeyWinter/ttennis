import { API_BASE } from '../constants/api';

export async function getFntrNews() {
    const res = await fetch(`${API_BASE}/api/fntr`);
    if (!res.ok) throw new Error('Не удалось загрузить новости ФНТР');
    return res.json();
}
export async function getFntrNewsById(id) {
    const res = await fetch(`${API_BASE}/api/fntr/${id}`);
    if (!res.ok) throw new Error('Не удалось загрузить новость');
    return res.json();
}