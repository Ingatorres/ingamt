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
      console.log('CvContent: ref.current disponible', ref.current); // Más conciso
    } else {
      console.warn('CvContent: ref.current NO disponible'); // Más conciso
    }
  }); // Sin array de dependencias para que se ejecute en cada render para propósitos de depuración agresiva.

  return (
    // The 'ref' is attached to this main container div.
    // Ensure this div is always rendered and valid.
    <div ref={ref} className="bg-secondary">
      {/* Main container for all CV content */}
      <main className="container pt-5">
        {/* Each section is wrapped in an ErrorBoundary to isolate potential rendering failures. */}
        {/* If any child component fails to render, ErrorBoundary will catch it, */}
        {/* display a fallback UI, and prevent the parent ref from becoming null. */}
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
