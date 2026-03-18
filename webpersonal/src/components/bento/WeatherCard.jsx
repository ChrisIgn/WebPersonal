import './WeatherCard.css';

const WeatherCard = () => {
  // Datos hardcodeados por ahora para ver el diseño
  const weather = {
    temp: 24,
    condition: 'Soleado',
    city: 'Curicó, CL',
    icon: '☀️' 
  };

  return (
    <section className="weather-card">
      <div className="weather-info">
        <span className="weather-icon">{weather.icon}</span>
        <h2 className="temp">{weather.temp}°C</h2>
      </div>
      <div className="weather-footer">
        <p className="city">{weather.city}</p>
        <p className="condition">{weather.condition}</p>
      </div>
    </section>
  );
};

export default WeatherCard;