import { useState, useEffect, useRef } from 'react';
import { generateMockData } from '../utils/mockData';

const API_BASE_URL = 'http://localhost:8000/api';

export const useAPI = (endpoint, pollingInterval = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cache = useRef(new Map());
  const controller = useRef(null);

  const fetchData = async () => {
    if (controller.current) {
      controller.current.abort();
    }
    
    controller.current = new AbortController();
    
    try {
      if (cache.current.has(endpoint)) {
        const cachedData = cache.current.get(endpoint);
        const now = Date.now();
        
        if (now - cachedData.timestamp < 30000) {
          setData(cachedData.data);
          setLoading(false);
          return;
        }
      }
      
      try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          signal: controller.current.signal,
          timeout: 3000,
        });
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const result = await response.json();
        
        cache.current.set(endpoint, {
          data: result,
          timestamp: Date.now()
        });
        
        setData(result);
        setLoading(false);
      } catch (fetchError) {
        console.warn(`Failed to fetch from real API: ${fetchError.message}`);
        console.log("Using mock data instead");
        
        const mockData = generateMockData(endpoint);
        
        cache.current.set(endpoint, {
          data: mockData,
          timestamp: Date.now()
        });
        
        setData(mockData);
        setLoading(false);
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    
    let intervalId;
    if (pollingInterval) {
      intervalId = setInterval(fetchData, pollingInterval);
    }
    
    return () => {
      if (controller.current) {
        controller.current.abort();
      }
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [endpoint, pollingInterval]);

  const refresh = () => {
    setLoading(true);
    fetchData();
  };

  return { data, loading, error, refresh };
};