import { useGithubData } from '../../hooks/useGithubData';
import './GithubCard.css';

const GithubCard = () => {
  const { contributions, loading } = useGithubData("ChrisIgn");

  return (
    <section className="github-card">
      <div className="card-header">
        <span className="github-icon">GitHub Activity</span>
        {!loading && <span className="count-label">Últimos días</span>}
      </div>

      <div className="activity-grid">
        {loading 
          ? [...Array(48)].map((_, i) => <div key={i} className="square loading-sq"></div>)
          : contributions.map((day, i) => (
              <div 
                key={i} 
                className="square" 
                style={{ backgroundColor: day.count > 0 ? `rgba(165, 42, 42, ${Math.min(day.count / 5, 1)})` // El rojo se intensifica con más commits
               : '#1e1010' }}
                title={`${day.count} contribuciones`}
              />
            ))
        }
      </div>
    </section>
  );
};

export default GithubCard;