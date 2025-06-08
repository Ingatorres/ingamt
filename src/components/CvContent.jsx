    // src/components/CvContent.jsx
    import React, { forwardRef, useEffect } from 'react'; // Importa useEffect
    import Perfil from './Perfil';
    import Experiencia from './Experiencia';
    import Habilidades from './Habilidades';
    import Formacion from './Formacion';
    import Referencias from './Referencias';
    import Actividades from './Actividades';
    import cvData from '../data';

    const CvContent = forwardRef((props, ref) => {
      // Este useEffect se ejecutará cada vez que el componente se monte o actualice.
      // Es útil para depurar si el 'ref' se está asignando.
      useEffect(() => {
        if (ref && typeof ref === 'object' && ref.current) {
          console.log('CvContent: Componente montado y ref.current disponible.', ref.current);
        } else {
          console.log('CvContent: Componente montado, pero ref.current no está disponible o no es un objeto DOM.');
        }
      }, [ref]); // Se re-ejecuta si la referencia del ref cambia

      return (
        <div ref={ref} className="bg-secondary">
          <main className="container pt-5">
            <Perfil />
            <Experiencia />
            <Habilidades />
            <Formacion />
            <Referencias />
            <Actividades />
          </main>

          <footer className="bg-primary text-light p-4 text-center small mt-5 pdf-footer-content">
            <p className="mb-0">{cvData.pieDePagina}</p>
          </footer>
        </div>
      );
    });

    export default CvContent;
    