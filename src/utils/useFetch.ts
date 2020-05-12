import { useState, useEffect } from 'react';
import { fetch } from './fetch';

export default function useFetch(url: string, params: Object) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url, params)
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch((err) => setError(err));
  }, [url, params]);

  return { loading, data, error };
}
