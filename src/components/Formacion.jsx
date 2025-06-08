// src/components/Formacion.jsx
import React from 'react';
import cvData from '../data'; // Importa los datos del CV

// Componente para la sección de Formación Académica e Idiomas
const Formacion = () => {
  const { formacionIdiomas } = cvData; // Desestructura los datos de formación e idiomas

  return (
    <section id="formacion" className="my-5 p-4 bg-light shadow rounded-lg">
      <h2 className="h3 fw-bold text-primary mb-4 text-center"><i className="bi bi-mortarboard-fill me-2"></i> Formación Académica & Idiomas</h2>

      <div className="row">
        {/* Sección de Formación Académica */}
        <div className="col-lg-6 mb-4">
          <h3 className="h5 fw-bold text-success mb-3">Formación Académica</h3>
          {/* Mapea la formación académica */}
          {formacionIdiomas.formacionAcademica.map((formacion, index) => (
            <div className="mb-3" key={index}>
              <p className="fw-bold mb-0 text-dark">{formacion.titulo}</p>
              <p className="mb-0 text-muted">{formacion.institucion}</p>
              <p className="small text-muted">{formacion.detalle}</p>
            </div>
          ))}
        </div>

        {/* Sección de Idiomas */}
        <div className="col-lg-6 mb-4">
          <h3 className="h5 fw-bold text-success mb-3">Idiomas</h3>
          <ul className="list-unstyled text-dark">
            {/* Mapea los idiomas */}
            {formacionIdiomas.idiomas.map((idioma, index) => (
              <li className="d-flex align-items-center mb-2" key={index}>
                <i className="bi bi-translate me-2 text-info"></i>
                <span>{idioma}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Botón para Credenciales de LinkedIn */}
      <div className="text-center mt-4">
        <a
          href={formacionIdiomas.credencialesLinkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-info fw-bold d-flex align-items-center justify-content-center mx-auto"
          style={{ backgroundColor: 'var(--bs-info)', borderColor: 'var(--bs-info)', color: 'var(--bs-primary)', maxWidth: '300px' }}
        >
          <i className="bi bi-award-fill me-2"></i> Ver Credenciales de LinkedIn
        </a>
      </div>
    </section>
  );
};

export default Formacion; // Exporta el componente
