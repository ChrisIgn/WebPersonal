import { useProjectRace } from '../../hooks/useProjectRace';
import { FiFlag, FiGitCommit } from 'react-icons/fi';
import './ProjectRaceCard.css'; // Asegúrate de que el nombre del CSS coincida

// Constante fuera del componente para evitar bucles
const MIS_REPOSITORIOS = ['WebPersonal']; 

const ProjectsRaceCard = () => {
  const { projects, loading, error } = useProjectRace('ChrisIgn', MIS_REPOSITORIOS);

  const formatCommitMessage = (text) => {
    // Verificamos si el texto usa asteriscos para listas
    if (text.includes('*')) {
      const parts = text.split('*').map(item => item.trim()).filter(item => item.length > 0);
      const title = parts[0];
      const listItems = parts.slice(1);

      return (
        <div className="formatted-commit">
          <span className="commit-title-bold">{title}</span>
          <ul className="commit-bullet-list">
            {listItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      );
    }
    return <span>{text}</span>;
  };
  
  return (
    <section className="card race-card">
      <div className="card-top-label">
        <FiFlag className="label-icon" /> Proyectos en Carrera
      </div>

      <div className="race-container">
        {loading ? (
          // SKELETON LOADER
          <div className="skeleton-pulse">
            <div className="skeleton-text" style={{ width: '120px', marginBottom: '10px' }}></div>
            <div className="track-background" style={{ marginBottom: '15px' }}></div>
          </div>
        ) : error || projects.length === 0 ? (
          // ESTADO VACÍO / ERROR
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
              
              <div className="track-background">
                <div className="track-start-line"></div>
                <div className="track-finish-line">🏁</div>

                {/* 1. La barra de progreso rellena con el cohete */}
                <div 
                  className="track-fill" 
                  style={{ width: `${proj.currentProgress}%` }}
                >
                  <div className="racer-icon">🚀</div>
                </div>

                {/* 2. Las marcas agrupadas (10%, 20%, etc.) */}
                {/* OJO: Asegúrate de haber actualizado useProjectRace.js para que devuelva milestonesGroups */}
                {proj.milestonesGroups && proj.milestonesGroups.map((group) => {
                  const isCurrentGroup = Math.floor(proj.currentProgress / 10) * 10 === group.baseProgress;

                  return (
                    <div 
                      key={group.baseProgress} 
                      className={`milestone-dot ${isCurrentGroup ? 'current-dot' : ''}`}
                      style={{ left: `${group.baseProgress}%` }}
                    >
                      {/* EL TOOLTIP CON SCROLL */}
                      <div className="milestone-tooltip">
                        
                        {/* Cabecera del grupo */}
                        <div className="tooltip-header">
                          <span className="tooltip-date">Fase {group.baseProgress}%</span>
                          <span className="tooltip-count">{group.commits.length} commits</span>
                        </div>
                        
                        {/* ZONA DESLIZABLE PARA MICRO-VERSIONES */}
                        <div className="tooltip-scroll-area">
                          {group.commits.map(commit => (
                            <div key={commit.sha} className="micro-commit-item">
                              
                              <div className="micro-commit-header">
                                <span className="micro-prog">{commit.progress}%</span>
                                <span className="micro-date">{commit.date}</span>
                              </div>
                              
                              <div className="tooltip-content-wrapper">
                                <FiGitCommit className="commit-icon" />
                                <div className="tooltip-msg">
                                  {/* Llamamos a tu función formateadora para cada micro-commit */}
                                  {formatCommitMessage(commit.message)}
                                </div>
                              </div>

                            </div>
                          ))}
                        </div>

                      </div>
                    </div>
                  );
                })}
                
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ProjectsRaceCard;