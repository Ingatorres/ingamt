// src/components/CvContent.jsx
import React, { forwardRef } from 'react';
import Perfil from './Perfil';
import Experiencia from './Experiencia';
import Habilidades from './Habilidades';
import Formacion from './Formacion';
import Referencias from './Referencias';
import Actividades from './Actividades';
import cvData from '../data'; // Importa los datos para el pie de página

// CvContent es el componente que agrupa todas las secciones del CV.
// Usa forwardRef para que react-to-print pueda acceder a su DOM.
const CvContent = forwardRef((props, ref) => {
  return (
    // El 'ref' se adjunta a este div contenedor principal.
    <div ref={ref} className="bg-secondary">
      {/* Contenedor principal de todo el contenido del CV */}
      <main className="container pt-5">
        <Perfil /> {/* Componente de perfil */}
        <Experiencia /> {/* Componente de experiencia */}
        <Habilidades /> {/* Componente de habilidades */}
        <Formacion /> {/* Componente de formación e idiomas */}
        <Referencias /> {/* Componente de referencias */}
        <Actividades /> {/* Componente de actividades complementarias */}
      </main>

      {/* Pie de página del CV, también se incluirá en el PDF */}
      <footer className="bg-primary text-light p-4 text-center small mt-5 pdf-footer-content">
        <p className="mb-0">{cvData.pieDePagina}</p>
      </footer>
    </div>
  );
});

export default CvContent; // Exporta el componente
