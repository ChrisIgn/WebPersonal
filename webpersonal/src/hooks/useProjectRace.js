import { useState, useEffect } from 'react';

export const useProjectRace = (username, repoNames) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); // NUEVO ESTADO DE ERROR

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const results = await Promise.all(
          repoNames.map(async (repoName) => {
            const res = await fetch(`https://api.github.com/repos/${username}/${repoName}/commits?per_page=30`);
            
            // Si hay error 429 o el repo no existe, lanzamos error
            if (!res.ok) throw new Error("Error en la petición a GitHub");
            
            const commits = await res.json();
            const milestones = [];
            const regex = /(\d{1,3})%/;

            for (let commitObj of commits) {
              const msg = commitObj.commit.message;
              const match = msg.match(regex);
              if (match) {
                let prog = parseInt(match[1], 10);
                prog = Math.min(100, Math.max(0, prog));
                milestones.push({
                  progress: prog,
                  message: msg,
                  sha: commitObj.sha,
                  date: new Date(commitObj.commit.author.date).toLocaleDateString()
                });
              }
            }

            const currentProgress = milestones.length > 0 ? milestones[0].progress : 0;
            return {
              name: repoName,
              currentProgress,
              milestones: milestones.reverse(), 
              url: `https://github.com/${username}/${repoName}`
            };
          })
        );
        setProjects(results.filter(p => p !== null));
        setError(false); // Si todo sale bien, no hay error
      } catch (err) {
        console.error("Error cargando la carrera:", err);
        setError(true); // SE ACTIVA EL ERROR (Ej: por el 429)
      } finally {
        setLoading(false);
      }
    };

    if (username && repoNames.length > 0) {
      fetchProgress();
    }
  // Recuerda usar el .join(',') para evitar el bucle infinito
  }, [username, repoNames.join(',')]); 

  return { projects, loading, error }; // Devolvemos el error
};