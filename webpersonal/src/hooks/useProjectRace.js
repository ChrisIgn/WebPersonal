import { useState, useEffect } from 'react';

export const useProjectRace = (username, repoNames) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const results = await Promise.all(
          repoNames.map(async (repoName) => {
            // Llamamos a la API de GitHub para obtener los últimos 15 commits
            const res = await fetch(`https://api.github.com/repos/${username}/${repoName}/commits?per_page=15`);
            if (!res.ok) return { name: repoName, progress: 0, url: `https://github.com/${username}/${repoName}` };
            
            const commits = await res.json();
            let currentProgress = 0; // Progreso por defecto
            
            // Expresión Regular: Busca un número de 1 a 3 dígitos seguido del signo % (ej: 50%, 100%)
            const regex = /(\d{1,3})%/; 

            // Recorremos los commits del más nuevo al más viejo
            for (let commitObj of commits) {
              const msg = commitObj.commit.message;
              const match = msg.match(regex);
              
              if (match) {
                // Si encuentra el porcentaje, lo guarda y detiene la búsqueda
                currentProgress = parseInt(match[1], 10);
                currentProgress = Math.min(100, Math.max(0, currentProgress)); // Asegura que esté entre 0 y 100
                break; 
              }
            }

            return {
              name: repoName,
              progress: currentProgress,
              url: `https://github.com/${username}/${repoName}`,
              // Opcional: guardamos el último mensaje para mostrar en qué estás trabajando
              lastMessage: commits[0]?.commit?.message || "Iniciando proyecto..."
            };
          })
        );
        setProjects(results);
      } catch (error) {
        console.error("Error cargando la carrera de proyectos:", error);
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