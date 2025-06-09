// src/App.jsx
import React, { useRef } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import CvContent from './components/CvContent';

// Define aquí los estilos personalizados para Bootstrap
// Estos estilos se aplican globalmente a la aplicación.
const customStyles = `
  body {
      font-family: 'Inter', sans-serif; /* Texto principal */
      color: var(--bs-dark); /* Color de texto general */
      background-color: var(--bs-secondary); /* Fondo general de la página */
      padding-top: 70px; /* Espacio para el navbar fijo */
      scroll-behavior: smooth; /* Desplazamiento suave para enlaces de anclaje */
  }

  h1, h2, h3, h4, h5, h6 {
      font-family: 'Poppins', sans-serif; /* Titulares */
      font-weight: 600; /* semibold */
  }

  /* Definir tu paleta de colores personalizada como variables CSS de Bootstrap */
  :root {
      --bs-primary: #003B46;       /* Azul petróleo */
      --bs-secondary: #F2F2F2;     /* Gris claro (usado para fondo general) */
      --bs-light: #FFFFFF;         /* Blanco puro (fondo principal, tarjetas) */
      --bs-info: #7ED6A7;          /* Verde menta (mapeado a Bootstrap 'info' para acento) */
      --bs-warning: #FFD447;       /* Amarillo dorado (mapeado a Bootstrap 'warning' para complementario) */
      --bs-success: #006C50;       /* Verde oscuro (mapeado a Bootstrap 'success' para un verde más fuerte) */
      --bs-dark: #333333;          /* Gris oscuro para texto general */
      --bs-border-color: #D0F0DB;  /* Light accent para bordes (antes custom-light-accent) */
      --bs-info-bg-subtle: #D0F0DB; /* Usado para info-subtle, equivalente a light-accent */
      --bs-info-border-subtle: #7ED6A7; /* Borde suave para info */
      --bs-info-text-emphasis: #006C50; /* Texto de énfasis para info */
  }

  /* Sobreescribir clases de texto/fondo para usar tus colores específicos */
  .bg-primary { background-color: var(--bs-primary) !important; }
  .bg-secondary { background-color: var(--bs-secondary) !important; }
  .bg-light { background-color: var(--bs-light) !important; }
  .bg-info-subtle { background-color: var(--bs-info-bg-subtle) !important; }
  .text-primary { color: var(--bs-primary) !important; }
  .text-secondary { color: var(--bs-secondary) !important; }
  .text-info { color: var(--bs-info) !important; }
  .text-warning { color: var(--bs-warning) !important; }
  .text-success { color: var(--bs-success) !important; }
  .text-dark { color: var(--bs-dark) !important; }
  .text-info-emphasis { color: var(--bs-info-text-emphasis) !important; }

  /* Borde de tarjetas con colores personalizados */
  .border-info-subtle {
      border-color: var(--bs-info-border-subtle) !important;
  }

  /* Hover personalizado para enlaces de navegación y botones */
  .hover-accent:hover {
      color: var(--bs-info) !important; /* Verde menta en hover */
  }
  .btn-info:hover {
      background-color: var(--bs-success) !important; /* Verde oscuro en hover del botón */
      border-color: var(--bs-success) !important;
      color: var(--bs-light) !important;
  }

  /* Estilo para la línea de tiempo en Experiencia */
  .timeline-item {
      position: relative;
      padding-left: 2.5rem; /* Espacio para el icono */
      border-left: 2px solid var(--bs-border-color); /* Usar border-color para la línea */
  }
  .timeline-item:last-child {
      border-left: none; /* Elimina la línea en el último elemento */
  }
  .timeline-icon {
      position: absolute;
      left: -15px; /* Ajusta la posición para que el círculo esté sobre la línea */
      top: 0;
      background-color: var(--bs-info); /* Color del círculo */
      color: white;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      box-shadow: 0 0 0 3px var(--bs-light), 0 0 0 6px var(--bs-info); /* Anillo exterior */
  }

  /* Estilos de texto justificado */
  .text-justify {
      text-align: justify;
  }

  /* Estilos para el carrusel de referencias */
  .carousel-item {
      padding: 1rem 0;
  }
  .carousel-control-prev,
  .carousel-control-next {
      width: 5%;
      opacity: 0.7;
  }
  .carousel-control-prev-icon,
  .carousel-control-next-icon {
      background-image: none;
      color: var(--bs-primary);
      font-size: 2rem;
  }
  .carousel-indicators [data-bs-target] {
      background-color: var(--bs-primary);
  }
  .references-phone {
      color: var(--bs-primary) !important;
      font-weight: bold;
  }
`;

function App() {
  // No necesitamos cvContentRef para la generación de PDF ahora, solo para la visualización de la SPA.
  const cvContentRef = useRef(null);

  // El URL del PDF estático que estará en la carpeta public
  const STATIC_PDF_URL = `${import.meta.env.BASE_URL}CV_Angel_Mateo_Torres_Barco.pdf`;

  // Función para abrir el PDF estático
  const handleDownloadPdf = () => {
    console.log("Botón 'Descargar CV PDF' clicado. Abriendo PDF estático.");
    window.open(STATIC_PDF_URL, '_blank');
  };

  return (
    <>
      {/* Inyecta los estilos personalizados globalmente */}
      <style>{customStyles}</style>

      {/* Navbar de Navegación */}
      <Navbar bg="primary" variant="dark" expand="lg" fixed="top" className="shadow-sm py-3">
        <Container>
          {/* Botón de Descarga de CV PDF */}
          <Button
            variant="info"
            className="fw-bold d-flex align-items-center me-auto order-1 order-lg-0"
            style={{ backgroundColor: 'var(--bs-info)', borderColor: 'var(--bs-info)', color: 'var(--bs-primary)' }}
            onClick={handleDownloadPdf} // Ahora solo abre el PDF estático
          >
            <i className="bi bi-file-earmark-arrow-down me-2"></i> Descargar CV PDF
          </Button>

          {/* Botón de toggle para el navbar en móviles */}
          <Navbar.Toggle aria-controls="navbarNav" />

          {/* Enlaces de Navegación */}
          <Navbar.Collapse id="navbarNav">
            <Nav className="ms-auto mb-2 mb-lg-0">
              <Nav.Link href="#perfil" className="text-white hover-accent px-lg-3 py-2">Perfil</Nav.Link>
              <Nav.Link href="#trayectoria" className="text-white hover-accent px-lg-3 py-2">Trayectoria</Nav.Link>
              <Nav.Link href="#habilidades" className="text-white hover-accent px-lg-3 py-2">Habilidades</Nav.Link>
              <Nav.Link href="#formacion" className="text-white hover-accent px-lg-3 py-2">Formación</Nav.Link>
              <Nav.Link href="#referencias" className="text-white hover-accent px-lg-3 py-2">Referencias</Nav.Link>
              <Nav.Link href="#actividades" className="text-white hover-accent px-lg-3 py-2">Actividades</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Contenido del CV (visible en la SPA) */}
      <CvContent ref={cvContentRef} />
    </>
  );
}

export default App; // Exporta el componente principal de la aplicación
