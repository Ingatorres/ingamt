// src/components/Actividades.jsx
import React from 'react';
import cvData from '../data'; // Importa los datos del CV

// Componente para la sección de Actividades Complementarias
const Actividades = () => {
  const { actividadesComplementarias } = cvData; // Desestructura los datos de actividades

  return (
    <section id="actividades" className="my-5 p-4 bg-light shadow rounded-lg">
      <h2 className="h3 fw-bold text-primary mb-4 text-center"><i className="bi bi-award-fill me-2"></i> Actividades Complementarias</h2>
      <ul className="list-unstyled text-dark">
        {/* Mapea las actividades complementarias */}
        {actividadesComplementarias.map((actividad, index) => (
          <li className="d-flex align-items-start mb-2" key={index}>
            <i className="bi bi-award-fill me-2 text-info flex-shrink-0" style={{ fontSize: '0.8em', marginTop: '0.3em' }}></i>
            <span>{actividad}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Actividades; // Exporta el componente
