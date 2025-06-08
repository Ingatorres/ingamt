// src/components/Perfil.jsx
import React from 'react';
import cvData from '../data'; // Importa los datos del CV

// Componente para la sección de Perfil Profesional
const Perfil = () => {
  const { personal } = cvData; // Desestructura los datos personales

  return (
    <section id="perfil" className="my-5 p-4 bg-light shadow rounded-lg text-center">
      <div id="perfil-header" className="mb-4"> {/* ID para la primera parte de la página 1 */}
        {/* Foto de perfil */}
        <div className="d-flex justify-content-center mb-4">
          <img
            src={`${import.meta.env.BASE_URL}CVPh.jpg`} // Ruta de la imagen, gestionada por Vite
            alt="Foto de Perfil de Ángel Mateo Torres Barco"
            className="rounded-circle shadow-lg"
            style={{ width: '150px', height: '150px', objectFit: 'cover', border: '4px solid var(--bs-primary)' }}
          />
        </div>

        {/* Nombre completo y ocupación */}
        <h1 className="display-5 fw-bolder text-primary mb-1">{personal.nombre}</h1>
        <p className="lead text-dark mb-4">{personal.ocupacion}</p>

        {/* Resumen del perfil */}
        <p className="text-justify text-dark mb-4">{personal.resumen}</p>
      </div>

      {/* Información de contacto */}
      <div className="row g-3 justify-content-center text-dark">
        <div className="col-md-auto d-flex align-items-center">
          <i className="bi bi-geo-alt-fill me-2 text-info"></i>
          <span>{personal.contacto.ubicacion}</span>
        </div>
        <div className="col-md-auto d-flex align-items-center">
          <i className="bi bi-envelope-fill me-2 text-info"></i>
          <a href={`mailto:${personal.contacto.correo}`} className="text-dark text-decoration-none hover-accent">
            {personal.contacto.correo}
          </a>
        </div>
        <div className="col-md-auto d-flex align-items-center">
          <i className="bi bi-phone-fill me-2 text-info"></i>
          {personal.contacto.telefonos.join(' | ')}
        </div>
        <div className="col-md-auto d-flex align-items-center">
          <i className="bi bi-linkedin me-2 text-info"></i>
          {/* Mostramos la URL directamente */}
          <a href={personal.contacto.linkedin} target="_blank" rel="noopener noreferrer" className="text-dark text-decoration-none hover-accent">
            {personal.contacto.linkedin}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Perfil; // Exporta el componente
