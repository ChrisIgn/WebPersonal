// src/components/bento/StatusCard/StatusCard.jsx
import { FiActivity } from 'react-icons/fi';
import './StatusCard.css';

const StatusCard = () => {
  return (
    <section className="card status-card square-card">
      {/* TÍTULO ESTÁNDAR (Le damos una clase específica para el cuadrado) */}
      <div className="card-top-label square-label">
        <FiActivity className="label-icon" /> Estado
      </div>

      <div className="status-content-centered">
        
        {/* INDICADOR Y TÍTULO (Ahora apilados verticalmente) */}
        <div className="status-indicator-v">
          <div className="pulse-container">
            <div className="pulsing-dot"></div>
          </div>
          <h3 className="status-text-main">Disponible</h3>
        </div>
        
        {/* TEXTO SECUNDARIO (Ultra corto y minimalista) */}
        <p className="status-subtext-clean">
          Frontend Dev • Chile
        </p>

      </div>
    </section>
  );
};

export default StatusCard;