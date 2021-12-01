import { useState, useEffect } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setError(null);
        setLoading(false);
      })
      .catch((error) => {
        console.warn(error.message);
        setError("error loading data");
        setLoading(false);
      });
  }, [url]);

  return {
    loading,
    data,
    error,
  };
}
