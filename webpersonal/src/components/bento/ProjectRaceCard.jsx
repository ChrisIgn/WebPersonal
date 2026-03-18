import { useProjectRace } from '../../hooks/useProjectRace';
import { FiFlag } from 'react-icons/fi';
import './ProjectRaceCard.css';

// Constante fuera del componente para evitar bucles
const MIS_REPOSITORIOS = ['WebPersonal']; 

const ProjectsRaceCard = () => {
  const { projects, loading, error } = useProjectRace('ChrisIgn', MIS_REPOSITORIOS);

  return (
    <section className="card race-card">
      <div className="card-top-label">
        <FiFlag className="label-icon" /> Proyectos en Carrera
      </div>

      <div className="race-container">
        {loading ? (
          // SKELETON LOADER (Mientras carga)
          <div className="skeleton-pulse">
            <div className="skeleton-text" style={{ width: '120px', marginBottom: '10px' }}></div>
            <div className="track-background" style={{ marginBottom: '15px' }}></div>
          </div>
        ) : error || projects.length === 0 ? (
          // ESTADO VACÍO / ERROR (Esperando corredores)
          <div className="waiting-racers-state">
            <span className="pit-stop-icon">🚥</span>
            <h4 className="waiting-title">Esperando corredores...</h4>
            <p className="waiting-desc">
              {error 
                ? "Boxes cerrados temporalmente (Límite de GitHub alcanzado). Los autos volverán a la pista pronto." 
                : "Aún no hay avances registrados en esta pista."}
            </p>
          </div>
        ) : (
          projects.map((proj, index) => (
            <div key={index} className="track-item">
              <div className="track-header">
                <a href={proj.url} target="_blank" rel="noreferrer" className="proj-name">
                  {proj.name}
                </a>
                <span className="proj-percentage">{proj.currentProgress}%</span>
              </div>
              
              {/* LA PISTA DE CARRERAS CON MARCAS */}
              <div className="track-background">
                
                {/* 1. La barra de progreso rellena */}
                <div 
                  className="track-fill" 
                  style={{ width: `${proj.currentProgress}%` }}
                ></div>

                {/* 2. Las marcas históricas (Milestones) */}
                {proj.milestones.map((milestone, mIndex) => (
                  <div 
                    key={milestone.sha} 
                    className={`milestone-dot ${milestone.progress === proj.currentProgress ? 'current-dot' : ''}`}
                    style={{ left: `${milestone.progress}%` }}
                  >
                    {/* El Tooltip que aparece al pasar el mouse o tocar */}
                    <div className="milestone-tooltip">
                      <span className="tooltip-date">{milestone.date}</span>
                      <span className="tooltip-msg">{milestone.message}</span>
                    </div>
                  </div>
                ))}
                
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ProjectsRaceCard;