// src/components/Referencias.jsx
import React from 'react';
import { Carousel } from 'react-bootstrap'; // Importa el componente Carousel de react-bootstrap
import cvData from '../data'; // Importa los datos del CV

// Componente para la sección de Referencias Profesionales
const Referencias = () => {
  const { referencias } = cvData; // Desestructura los datos de referencias

  // Función para dividir las referencias en grupos de 3 para el carrusel
  const chunkArray = (array, chunkSize) => {
    const results = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      results.push(array.slice(i, i + chunkSize));
    }
    return results;
  };

  const referenceChunks = chunkArray(referencias, 3); // Divide las referencias en grupos de 3

  return (
    <section id="referencias" className="my-5 p-4 bg-light shadow rounded-lg">
      <h2 className="h3 fw-bold text-primary mb-4 text-center"><i className="bi bi-person-lines-fill me-2"></i> Referencias Profesionales</h2>
      {/* Carrusel de Referencias */}
      <Carousel controls indicators interval={null}> {/* Deshabilita el intervalo automático */}
        {referenceChunks.map((chunk, chunkIndex) => (
          <Carousel.Item key={chunkIndex}>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {/* Mapea las referencias dentro de cada "chunk" */}
              {chunk.map((ref, index) => (
                <div className="col" key={index}>
                  <div className="card h-100 border-info-subtle shadow-sm">
                    <div className="card-body">
                      <h3 className="card-title h5 fw-semibold text-success mb-2">{ref.nombre}</h3>
                      <p className="card-text mb-1 text-dark">{ref.cargoEmpresa}</p>
                      <p className="card-text mb-0 text-dark references-phone">
                        <i className="bi bi-phone-fill me-2 text-info"></i>{ref.telefono}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};

export default Referencias; // Exporta el componente
