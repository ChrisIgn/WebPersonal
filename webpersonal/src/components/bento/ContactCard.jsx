import './ContactCard.css';
import { FiMessageSquare } from 'react-icons/fi';
const ContactCard = () => {
  return (
    <section className="card contact-card">
      {/* EL NUEVO TÍTULO UNIFICADO */}
      <div className="card-top-label">
        <FiMessageSquare className="label-icon" /> Contacto
      </div>

      <div className="contact-content">
        {/* Quitamos el <h3 className="contact-title">Hablemos</h3> porque ya tenemos el label superior */}
        
        <p className="contact-description">
          Mi bandeja de entrada siempre está abierta. Ya sea que busques sumar a un desarrollador a tu equipo o tengas una idea para un proyecto web, estaré encantado de responderte.
        </p>
        
        <a href="mailto:tuemail@gmail.com" className="contact-link">
          Envíame un correo <span className="arrow">→</span>
        </a>
      </div>
    </section>
  );
};

export default ContactCard;