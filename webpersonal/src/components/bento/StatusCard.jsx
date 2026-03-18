import './StatusCard.css';

const StatusCard = ({ status = "Disponible para proyectos" }) => {
  return (
    <section className="status-card">
      <div className="status-indicator">
        <span className="dot pulse"></span>
        <span className="status-text">{status}</span>
      </div>
      <p className="label">Status actual</p>
    </section>
  );
};

export default StatusCard;