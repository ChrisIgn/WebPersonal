import { useState, useEffect } from 'react';

export const useProjectRace = (username, repoNames) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const results = await Promise.all(
          repoNames.map(async (repoName) => {
            const res = await fetch(`https://api.github.com/repos/${username}/${repoName}/commits?per_page=30`); // Traemos más commits para más historial
            if (!res.ok) return null;
            
            const commits = await res.json();
            const milestones = [];
            const regex = /(\d{1,3})%/;

            // Recorremos todos los commits para guardar el historial
            for (let commitObj of commits) {
              const msg = commitObj.commit.message;
              const match = msg.match(regex);
              
              if (match) {
                let prog = parseInt(match[1], 10);
                prog = Math.min(100, Math.max(0, prog));
                
                milestones.push({
                  progress: prog,
                  message: msg,
                  sha: commitObj.sha, // ID único del commit
                  date: new Date(commitObj.commit.author.date).toLocaleDateString()
                });
              }
            }

            // GitHub entrega del más nuevo al más viejo. 
            // El actual es el primero de la lista (el más reciente).
            const currentProgress = milestones.length > 0 ? milestones[0].progress : 0;

            return {
              name: repoName,
              currentProgress,
              // Invertimos el array para que los puntos se dibujen de izquierda a derecha (del más viejo al más nuevo)
              milestones: milestones.reverse(), 
              url: `https://github.com/${username}/${repoName}`
            };
          })
        );
        // Filtramos por si algún repo falló o no existe
        setProjects(results.filter(p => p !== null));
      } catch (error) {
        console.error("Error cargando la carrera:", error);
      } finally {
        setLoading(false);
      }
    };

    if (username && repoNames.length > 0) {
      fetchProgress();
    }
  }, [username, repoNames]);

  return { projects, loading };
};