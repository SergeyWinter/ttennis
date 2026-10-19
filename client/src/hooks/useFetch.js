// src/hooks/useFetch.js
import { useState, useEffect } from 'react';

export function useFetch(fetcher, deps = []) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        const run = async () => {
            try {
                setLoading(true);
                setError(null);
                const result = await fetcher();
                if (!cancelled) setData(result);
            } catch (err) {
                if (!cancelled) setError(err.message || 'Ошибка загрузки');
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        run();

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return { data, loading, error };
}