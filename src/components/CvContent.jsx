// src/components/CvContent.jsx
import React, { forwardRef, useEffect } from 'react';
import Perfil from './Perfil';
import Experiencia from './Experiencia';
import Habilidades from './Habilidades';
import Formacion from './Formacion';
import Referencias from './Referencias';
import Actividades from './Actividades';
import cvData from '../data'; // Imports data for the footer
import ErrorBoundary from './ErrorBoundary'; // Importa el componente ErrorBoundary

// CvContent is the component that groups all sections of the CV.
// Uses forwardRef so that react-to-print can access its DOM.
const CvContent = forwardRef((props, ref) => {
  // This useEffect will run every time the component mounts or updates.
  // It is useful for debugging if the 'ref' is being assigned.
  useEffect(() => {
    if (ref && typeof ref === 'object' && ref.current) {
      console.log('CvContent: Component mounted and ref.current available.', ref.current);
    } else {
      console.log('CvContent: Component mounted, but ref.current is not available or not a DOM object.');
    }
  }, [ref]); // Re-runs if the ref's reference changes

  return (
    // The 'ref' is attached to this main container div.
    <div ref={ref} className="bg-secondary">
      {/* Main container for all CV content */}
      <main className="container pt-5">
        {/* Cada sección se envuelve en un ErrorBoundary para aislar posibles fallos de renderizado */}
        <ErrorBoundary><Perfil /></ErrorBoundary>
        <ErrorBoundary><Experiencia /></ErrorBoundary>
        <ErrorBoundary><Habilidades /></ErrorBoundary>
        <ErrorBoundary><Formacion /></ErrorBoundary>
        <ErrorBoundary><Referencias /></ErrorBoundary>
        <ErrorBoundary><Actividades /></ErrorBoundary>
      </main>

      {/* CV Footer, also included in the PDF */}
      <footer className="bg-primary text-light p-4 text-center small mt-5 pdf-footer-content">
        <p className="mb-0">{cvData.pieDePagina}</p>
      </footer>
    </div>
  );
});

export default CvContent; // Exports the component
