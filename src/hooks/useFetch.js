import { useState, useEffect } from "react";
import axios from 'axios';

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
