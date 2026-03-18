import './BioCard.css';
import { FiUser } from 'react-icons/fi'; // Puedes usar el icono que prefieras


const BioCard = () => {
  return (
    <section className="card bio-card">
      {/* EL NUEVO TÍTULO UNIFICADO */}
      <div className="card-top-label">
        <FiUser className="label-icon" /> Sobre Mí
      </div>

      <div className="bio-header">
        <img src="https://github.com/ChrisIgn.png" alt="Avatar de Christian" className="avatar" />
        <div className="bio-title">
          <h1>Hola, soy <span className="highlight">Christian</span></h1>
          <h2>Junior Frontend Developer</h2>
        </div>
      </div>
      <div className="bio-body">
        <p>
          Construyo experiencias digitales limpias y eficientes. 
          Enfocado en React, interfaces minimalistas y el desarrollo de 
          software con atención al detalle. Actualmente desde Curicó, Chile.
        </p>
      </div>
    </section>
  );
};

export default BioCard;