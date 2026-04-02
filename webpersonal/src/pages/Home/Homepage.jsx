// src/pages/Home/Home.jsx
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { IoMailOutline } from 'react-icons/io5';

import BioCard from '../../components/bento/BioCard';
import ContactCard from '../../components/bento/ContactCard'; // Si decides conservarla
import ProjectsRaceCard from '../../components/bento/ProjectRaceCard'; // El nuevo componente de carrera de proyectos}
import WeatherCard from '../../components/bento/WeatherCard';
import StatusCard from '../../components/bento/StatusCard'; // Si decides conservarla
import './Homepage.css';

const Home = () => {
  return (
    <div className="portfolio-layout">
      
      {/* EL NUEVO RECUADRO CIRCULAR EN LA ESQUINA SUPERIOR DERECHA */}
      <nav className="global-socials">
        <div className="social-pill">
          <a href="mailto:tuemail@gmail.com" title="Email"><IoMailOutline /></a>
          <a href="https://github.com/tuusuario" target="_blank" rel="noreferrer" title="GitHub"><FaGithub /></a>
          <a href="https://linkedin.com/in/tuusuario" target="_blank" rel="noreferrer" title="LinkedIn"><FaLinkedinIn /></a>
        </div>
      </nav>

      {/* SECCIÓN 1: ABOUT ME (Izquierda) */}
      <aside className="about-section">
        <BioCard />
        <ContactCard /> 
      </aside>

      {/* SECCIÓN 2: CONTENIDO (Derecha) */}
      <main className="content-section">
        <section className="dashboard-section">
          
          {/* NUEVO: Fila superior para tarjetas pequeñas */}
          <div className="bento-row">
            <WeatherCard />
            <StatusCard />
          </div>

          {/* Fila inferior para tarjetas anchas */}
          <ProjectsRaceCard />

        </section>
      </main>

    </div>
  );
};

export default Home;