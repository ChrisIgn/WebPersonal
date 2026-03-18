import { useState, useEffect } from 'react';

export const useGithubData = (username) => {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://github-contributions-api.deno.dev/${username}.json`);
        const data = await res.json();
        // Tomamos los últimos 42 días para que llene bien una cuadrícula de 6x7 o similar
        const activity = data.contributions.flat().slice(-48); 
        setContributions(activity);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [username]);

  return { contributions, loading };
};