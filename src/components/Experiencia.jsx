// src/components/Experiencia.jsx
import React from 'react';
import cvData from '../data'; // Importa los datos del CV

// Componente para la sección de Trayectoria Profesional
const Experiencia = () => {
  const { trayectoria } = cvData; // Desestructura los datos de trayectoria

  return (
    <section id="trayectoria" className="my-5 p-4 bg-light shadow rounded-lg">
      <h2 className="h3 fw-bold text-primary mb-4 text-center"><i className="bi bi-briefcase-fill me-2"></i> Trayectoria Profesional</h2>
      <div className="timeline">
        {/* Mapea cada elemento de la trayectoria profesional */}
        {trayectoria.map((item, index) => (
          <div className="timeline-item mb-4" key={index}>
            <div className="timeline-icon"><i className="bi bi-briefcase-fill"></i></div>
            <div className="card h-100 border-info-subtle shadow-sm">
              <div className="card-body">
                <h3 className="card-title h5 fw-semibold text-success">{item.titulo}</h3>
                <p className="card-subtitle mb-2 text-muted">{item.periodo}</p>
                <ul className="list-unstyled mb-0 text-dark">
                  {/* Mapea las responsabilidades de cada experiencia */}
                  {item.responsabilidades.map((resp, i) => (
                    <li className="d-flex align-items-start mb-1" key={i}>
                      <i className="bi bi-check-lg me-2 text-info flex-shrink-0" style={{ fontSize: '0.8em', marginTop: '0.3em' }}></i>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experiencia; // Exporta el componente
