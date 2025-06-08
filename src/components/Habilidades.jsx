// src/components/Habilidades.jsx
import React from 'react';
import cvData from '../data'; // Importa los datos del CV

// Componente para la sección de Habilidades y Competencias
const Habilidades = () => {
  const { habilidades } = cvData; // Desestructura los datos de habilidades

  return (
    <section id="habilidades" className="my-5 p-4 bg-light shadow rounded-lg">
      <h2 className="h3 fw-bold text-primary mb-4 text-center"><i className="bi bi-tools me-2"></i> Habilidades & Competencias</h2>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
        {/* Tarjeta de Competencias Técnicas */}
        <div className="col">
          <div className="card h-100 border-info-subtle shadow-sm">
            <div className="card-body">
              <h3 className="card-title h5 fw-semibold text-success mb-3">Competencias Técnicas</h3>
              <ul className="list-unstyled text-dark">
                {/* Mapea las habilidades técnicas */}
                {habilidades.tecnicas.map((habilidad, index) => (
                  <li key={index}><i className="bi bi-check-lg me-2"></i>{habilidad}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Tarjeta de Competencias en IA */}
        <div className="col">
          <div className="card h-100 border-info-subtle shadow-sm">
            <div className="card-body">
              <h3 className="card-title h5 fw-semibold text-success mb-3">Competencias en IA</h3>
              <ul className="list-unstyled text-dark">
                {/* Mapea las habilidades de IA con nombre y descripción */}
                {habilidades.ia.map((iaHabilidad, index) => (
                  <li key={index}><span className="fw-bold">{iaHabilidad.nombre}</span> {iaHabilidad.descripcion}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Tarjeta de Habilidades Transversales */}
        <div className="col">
          <div className="card h-100 border-info-subtle shadow-sm">
            <div className="card-body">
              <h3 className="card-title h5 fw-semibold text-success mb-3">Habilidades Transversales</h3>
              <ul className="list-unstyled text-dark">
                {/* Mapea las habilidades transversales */}
                {habilidades.transversales.map((habilidad, index) => (
                  <li key={index}><i className="bi bi-person-check-fill me-2"></i>{habilidad}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Integración Humano-IA */}
      <div id="integracion-humano-ia" className="p-4 bg-info-subtle rounded-lg shadow-sm border-start border-success border-4">
        <h3 className="h4 fw-bold text-primary mb-3 text-center"><i className="bi bi-robot me-2"></i> Integración Humano-IA en Proyectos Reales</h3>
        <ul className="list-unstyled text-dark">
          {/* Mapea los puntos de integración Humano-IA */}
          {habilidades.integracionHumanoIa.map((integracion, index) => (
            <li className="mb-2 d-flex align-items-start" key={index}>
              <i className="bi bi-robot text-primary me-2 flex-shrink-0" style={{ fontSize: '0.8em', marginTop: '0.3em' }}></i>
              <span>
                <span className="fw-bold">{integracion.titulo}</span> {integracion.descripcion}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Habilidades; // Exporta el componente
