import { useState, useEffect } from 'react';

export const useWeather = (city) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      //Api Key de OpenWeatherMap
      const API_KEY = '5acedfb074a17d554991175a629deff2'; 

      // Modo de simulacion
      if (API_KEY === 'TU_API_KEY') {
        setTimeout(() => {
          setWeather({
            temp: 24, // 24°C
            description: 'cielo despejado',
            humidity: 45,
            wind: 12
          });
          setLoading(false);
        }, 1000); // Para simular un retraso de 1 segundo
        return;
      }

      // Buscar el clima real usando la API de OpenWeatherMap 
      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},cl&units=metric&lang=es&appid=${API_KEY}`);
        if (!res.ok) throw new Error("Error obteniendo el clima");
        
        const data = await res.json();
        setWeather({
          temp: Math.round(data.main.temp), // Redondeamos para no tener decimales feos
          description: data.weather[0].description,
          humidity: data.main.humidity,
          wind: Math.round(data.wind.speed * 3.6) // Convertimos m/s a km/h
        });
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return { weather, loading, error };
};