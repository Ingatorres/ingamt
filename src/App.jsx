// src/App.jsx
import React, { useRef } from 'react';
// Eliminamos la importación de useReactToPrint
import { Navbar, Nav, Button, Container } from 'react-bootstrap'; // Importa componentes de react-bootstrap
import CvContent from './components/CvContent'; // Importa el componente que contiene el CV

// Importamos las nuevas librerías para la generación de PDF
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

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
  // Crea una referencia al componente CvContent para que html2canvas pueda acceder a él.
  const componentRef = useRef(null);

  // Función para descargar el CV como PDF usando jsPDF y html2canvas
  const handleDownloadPdf = async () => {
    console.log("Botón 'Descargar CV PDF' clicado.");
    console.log("Estado actual de componentRef.current ANTES de la captura:", componentRef.current);

    const pdf = new jsPDF('p', 'mm', 'a4'); // Crea un nuevo documento PDF (orientación, unidades, tamaño)
    const imgWidth = 210; // Ancho de una página A4 en mm
    const pageHeight = 297; // Altura de una página A4 en mm
    let currentY = 10; // Posición Y inicial para la página (margen superior)
    const sectionMargin = 10; // Margen entre secciones

    // Helper para capturar un elemento y añadirlo al PDF, manejando la paginación
    const addSectionToPdf = async (elementId, forceNewPage = false) => {
      const element = componentRef.current.querySelector(`#${elementId}`); // Busca el elemento dentro del ref del CV
      if (!element) {
        console.warn(`Sección con ID #${elementId} no encontrada.`);
        return;
      }

      // Captura el elemento HTML como un canvas
      const canvas = await html2canvas(element, {
        scale: 2, // Aumenta la escala para mejor calidad de imagen en el PDF
        useCORS: true, // Importante si tienes imágenes de origen cruzado
        backgroundColor: '#FFFFFF', // Asegura un fondo blanco en la captura
        logging: false, // Deshabilita logs excesivos de html2canvas para una consola más limpia
        scrollY: -window.scrollY, // Captura correctamente elementos no en la parte superior del viewport
        windowWidth: document.documentElement.offsetWidth, // Captura el ancho total del contenido
        windowHeight: document.documentElement.offsetHeight, // Captura la altura total del contenido
      });

      const imgData = canvas.toDataURL('image/png'); // Convierte el canvas a una imagen base64
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calcula la altura de la imagen en el PDF manteniendo la relación de aspecto

      // Decide si agregar una nueva página
      // Se agrega nueva página si:
      // 1. Se fuerza explícitamente una nueva página (forceNewPage = true)
      // 2. La sección actual no cabe en el espacio restante de la página actual,
      //    Y no estamos en la primera sección de la primera página (currentY > 10 para evitar página en blanco al inicio).
      if (forceNewPage || (currentY + imgHeight + sectionMargin > pageHeight && currentY > 10)) {
        pdf.addPage();
        currentY = 10; // Reinicia la posición Y para la nueva página (margen superior)
      } else if (currentY > 10) { // Si no es la primera sección en la página, añade un margen
        currentY += sectionMargin;
      }

      // Agrega la imagen de la sección al PDF
      pdf.addImage(imgData, 'PNG', 0, currentY, imgWidth, imgHeight);
      currentY += imgHeight; // Actualiza la posición Y para la siguiente sección
    };

    try {
      // Página 1: Mi nombre completo, descripción y Trayectoria Profesional
      // Asegúrate de que Perfil.jsx tenga un ID para el contenedor de nombre/descripción.
      await addSectionToPdf('perfil-section', false); // Contenedor del perfil (nombre, descripción)
      await addSectionToPdf('trayectoria', false); // Trayectoria Profesional

      // Página 2: Habilidades & Competencias e Integración Humano-IA en Proyectos Reales
      await addSectionToPdf('habilidades', true); // Fuerza nueva página
      await addSectionToPdf('integracion-humano-ia', false); // Integración Humano-IA

      // Página 3: Formación Académica & Idiomas, Referencias Profesionales y Actividades Complementarias
      await addSectionToPdf('formacion', true); // Fuerza nueva página
      await addSectionToPdf('referencias', false);
      await addSectionToPdf('actividades', false);

      pdf.save('CV_Angel_Mateo_Torres_Barco.pdf'); // Guarda el PDF con el nombre especificado
      console.log("PDF generado y descargado exitosamente.");

    } catch (error) {
      console.error("Error al generar el PDF:", error);
      // Aquí podrías mostrar un mensaje de error amigable al usuario en un modal.
    }
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
            onClick={handleDownloadPdf} // Llamamos a la nueva función de descarga
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

      {/* Contenido del CV (el componente que se imprimirá) */}
      {/* El componente CvContent seguirá utilizando el ref para que html2canvas pueda acceder a su DOM. */}
      <CvContent ref={componentRef} />
    </>
  );
}

export default App; // Exporta el componente principal de la aplicación
