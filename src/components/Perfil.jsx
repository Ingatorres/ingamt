// src/components/Perfil.jsx
import React from 'react';
import cvData from '../data'; // Importa los datos del CV

// Componente para la sección de Perfil
const Perfil = () => {
  const { personal } = cvData; // Desestructura los datos personales

  return (
    <section id="perfil" className="my-5 p-4 bg-light shadow rounded-lg">
      <div className="row align-items-center">
        <div className="col-md-4 text-center">
          {/* CORRECCIÓN: Usamos import.meta.env.BASE_URL para asegurar la ruta relativa correcta en GitHub Pages */}
          {/* Esto convertirá la ruta a /ingamt/CVPh.jpg cuando esté desplegado */}
          <img
            src={`${import.meta.env.BASE_URL}CVPh.jpg`}
            alt="Foto de Perfil"
            className="img-fluid rounded-circle shadow-sm"
            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            // Fallback en caso de que la imagen no cargue
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150x150/cccccc/333333?text=Tu+Foto'; }}
          />
        </div>
        <div className="col-md-8 text-md-start mt-4 mt-md-0">
          <h1 className="display-5 fw-bold text-primary mb-2">{personal.nombre}</h1>
          <h2 className="lead text-info-emphasis mb-3">{personal.ocupacion}</h2>
          <p className="text-dark text-justify">{personal.resumen}</p>
          <div className="d-flex flex-wrap justify-content-center justify-content-md-start gap-3 mt-4">
            <span className="d-flex align-items-center text-dark"><i className="bi bi-geo-alt-fill me-2 text-primary"></i> {personal.contacto.ubicacion}</span>
            <span className="d-flex align-items-center text-dark">
              <i className="bi bi-envelope-fill me-2 text-primary"></i>
              {/* Enlace de correo electrónico */}
              <a href={`mailto:${personal.contacto.correo}`} className="text-decoration-none text-dark">{personal.contacto.correo}</a>
            </span>
            <span className="d-flex align-items-center text-dark">
              <i className="bi bi-phone-fill me-2 text-primary"></i>
              {/* Mapea los teléfonos y únelos con un slash */}
              {personal.contacto.telefonos.join(' / ')}
            </span>
            {/* Enlace de LinkedIn con target="_blank" y rel="noopener noreferrer" por seguridad y usabilidad */}
            <a href={personal.contacto.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm d-flex align-items-center">
              <i className="bi bi-linkedin me-2"></i> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Perfil; // Exporta el componente para usarlo en otras partes de la aplicación
