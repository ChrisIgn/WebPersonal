import { useProjectRace } from '../../hooks/useProjectRace';
import { FiFlag, FiGitCommit } from 'react-icons/fi';
import './ProjectRaceCard.css';

// Constante fuera del componente para evitar bucles
const MIS_REPOSITORIOS = ['WebPersonal']; 

const ProjectsRaceCard = () => {
  const { projects, loading, error } = useProjectRace('ChrisIgn', MIS_REPOSITORIOS);

const formatCommitMessage = (text) => {
    // Verificamos si el texto usa asteriscos para listas
    if (text.includes('*')) {
      // Dividimos el texto por los asteriscos, limpiamos espacios y quitamos los vacíos
      const parts = text.split('*').map(item => item.trim()).filter(item => item.length > 0);
      
      // El primer elemento antes del primer '*' suele ser el título principal
      const title = parts[0];
      // El resto de elementos son los items de la lista
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

    // Si no tiene asteriscos, simplemente devolvemos el texto normal
    return <span>{text}</span>;
  };
  
  

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
                    {/* EL TOOLTIP SUPER ACTUALIZADO (¡Mini Commit Card!) */}
                    <div className="milestone-tooltip">
                      
                      {/* Cabecera (Fecha izquierda, % derecha) */}
                      <div className="tooltip-header">
                        <span className="tooltip-date">{milestone.date}</span>
                        <span className="tooltip-percentage">{milestone.progress}%</span>
                      </div>
                      
                      {/* NUEVO: Mensaje con icono y mejor espaciado */}
                    {/* CONTENEDOR DE MENSAJE ACTUALIZADO */}
                      <div className="tooltip-content-wrapper">
                        <FiGitCommit className="commit-icon" />
                        <div className="tooltip-msg">
                          {/* Llamamos a la función formateadora */}
                          {formatCommitMessage(milestone.message)}
                        </div>
                      </div>
                      
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