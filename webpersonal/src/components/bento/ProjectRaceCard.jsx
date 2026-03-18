import { useProjectRace } from '../../hooks/useProjectRace';
import { FiFlag } from 'react-icons/fi'; // Icono de bandera de meta
import './ProjectRaceCard.css';

const ProjectsRaceCard = () => {
  // Pon tu usuario real y los nombres exactos de los repositorios que quieres mostrar
  const { projects, loading } = useProjectRace('ChrisIgn', ['Los_Palomitos']);

  return (
    <section className="card race-card">
      {/* TÍTULO UNIFICADO */}
      <div className="card-top-label">
        <FiFlag className="label-icon" /> Proyectos en Carrera
      </div>

      <div className="race-container">
        {loading ? (
          <p className="loading-text">Cargando progreso desde GitHub...</p>
        ) : (
          projects.map((proj, index) => (
            <div key={index} className="track-item">
              <div className="track-header">
                <a href={proj.url} target="_blank" rel="noreferrer" className="proj-name">
                  {proj.name}
                </a>
                <span className="proj-percentage">{proj.progress}%</span>
              </div>
              
              {/* LA PISTA DE CARRERAS */}
              <div className="track-background">
                <div 
                  className="track-fill" 
                  style={{ width: `${proj.progress}%` }}
                >
                  {/* El "Corredor" (Un puntito o cohete al final de la línea) */}
                  <div className="racer-dot"></div>
                </div>
              </div>
              
              <p className="commit-msg">Último commit: {proj.lastMessage}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ProjectsRaceCard;