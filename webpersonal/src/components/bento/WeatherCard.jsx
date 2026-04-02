import { FiCloud, FiMapPin, FiDroplet, FiWind } from 'react-icons/fi';
import { useWeather } from '../../hooks/useWeather';
import './WeatherCard.css';

const WeatherCard = () => {
  // Pasamos 'Curicó' como la ciudad por defecto
  const { weather, loading, error } = useWeather('Curicó');

  return (
    <section className="card weather-card">
      {/* TÍTULO ESTÁNDAR */}
      <div className="card-top-label">
        <FiCloud className="label-icon" /> Clima Local
      </div>

      <div className="weather-container">
        {loading ? (
          // SKELETON LOADER
          <div className="skeleton-pulse weather-skeleton">
            <div className="skeleton-text" style={{ width: '60%', height: '40px', marginBottom: '10px' }}></div>
            <div className="skeleton-text" style={{ width: '40%' }}></div>
          </div>
        ) : error ? (
          <p className="weather-error">No se pudo cargar el clima.</p>
        ) : (
          <>
            {/* UBICACIÓN Y TEMPERATURA PRINCIPAL */}
            <div className="weather-main">
              <div className="location">
                <FiMapPin className="location-icon" />
                <span>Chile</span>
              </div>
              
              <div className="temperature-block">
                <h2 className="temperature">{weather.temp}°</h2>
                <span className="weather-desc">{weather.description}</span>
              </div>
            </div>

            {/* DETALLES EXTRAS (Humedad y Viento) */}
            <div className="weather-details">
              <div className="detail-item">
                <FiDroplet className="detail-icon" />
                <span>{weather.humidity}% Humedad</span>
              </div>
              <div className="detail-item">
                <FiWind className="detail-icon" />
                <span>{weather.wind} km/h Viento</span>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default WeatherCard;