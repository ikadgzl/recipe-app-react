import { useEffect, useState } from 'react';

export const useFetch = (url, method = 'GET') => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);

  const postData = (data) => {
    setOptions({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (options) => {
      setIsPending(true);

      try {
        const res = await fetch(url, { ...options, signal: controller.signal });

        if (!res.ok) {
          throw new Error(res.statusText);
        }

        const data = await res.json();

        setData(data);
        setError(null);
        setIsPending(false);
      } catch (error) {
        if (error.name === 'AbortError') {
          setError('Fetch aborted');
        } else {
          setError('Could not fetch the data');
        }
        setIsPending(false);
      }
    };

    if (method === 'GET') {
      fetchData();
    }

    if (method === 'POST' && options) {
      fetchData(options);
    }

    return () => {
      controller.abort();
    };
  }, [url, options, method]);

  return { data, isPending, error, postData };
};
