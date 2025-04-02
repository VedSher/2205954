import { useState, useEffect, useRef } from 'react';
import { generateMockData } from '../utils/mockData';

// Base API URL - replace with your actual test server URL
const API_BASE_URL = 'http://localhost:8000/api';

export const useAPI = (endpoint, pollingInterval = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cache = useRef(new Map());
  const controller = useRef(null);

  const fetchData = async () => {
    // Cancel any ongoing request
    if (controller.current) {
      controller.current.abort();
    }
    
    // Create a new AbortController
    controller.current = new AbortController();
    
    try {
      // Check cache first to minimize API calls
      if (cache.current.has(endpoint)) {
        const cachedData = cache.current.get(endpoint);
        const now = Date.now();
        
        // Use cache if it's fresh (less than 30 seconds old)
        if (now - cachedData.timestamp < 30000) {
          setData(cachedData.data);
          setLoading(false);
          return;
        }
      }
      
      // Try to fetch fresh data if cache is stale or doesn't exist
      try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          signal: controller.current.signal,
          timeout: 3000, // 3 second timeout
        });
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const result = await response.json();
        
        // Cache the new data with a timestamp
        cache.current.set(endpoint, {
          data: result,
          timestamp: Date.now()
        });
        
        setData(result);
        setLoading(false);
      } catch (fetchError) {
        console.warn(`Failed to fetch from real API: ${fetchError.message}`);
        console.log("Using mock data instead");
        
        // Use mock data instead
        const mockData = generateMockData(endpoint);
        
        // Cache the mock data
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
    
    // Set up polling if interval is provided
    let intervalId;
    if (pollingInterval) {
      intervalId = setInterval(fetchData, pollingInterval);
    }
    
    // Cleanup function
    return () => {
      if (controller.current) {
        controller.current.abort();
      }
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [endpoint, pollingInterval]);

  // Function to force refresh data
  const refresh = () => {
    setLoading(true);
    fetchData();
  };

  return { data, loading, error, refresh };
};