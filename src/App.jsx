// src/App.jsx
import React, { useRef } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import CvContent from './components/CvContent';

// Importamos las librerías para la generación de PDF
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
  const cvContentRef = useRef(null);

  // Función para descargar el CV como PDF usando jsPDF y html2canvas
  const handleDownloadPdf = async () => {
    console.log("Botón 'Descargar CV PDF' clicado.");
    console.log("Estado actual de cvContentRef.current ANTES de la captura:", cvContentRef.current);

    if (!cvContentRef.current) {
      console.error("No se encontró la referencia al contenido del CV para generar el PDF.");
      // Aquí podrías mostrar un mensaje visible al usuario si lo deseas (usando un modal).
      return;
    }

    try {
      const pdf = new jsPDF('p', 'mm', 'letter'); // Crea un nuevo documento PDF (orientación, unidades, tamaño carta)
      const pdfWidth = pdf.internal.pageSize.getWidth(); // Ancho de una página carta en mm
      const pdfHeight = pdf.internal.pageSize.getHeight(); // Altura de una página carta en mm
      const margin = 10; // Margen en mm para cada lado de la página
      const contentWidth = pdfWidth - (2 * margin); // Ancho disponible para el contenido

      // Función auxiliar para capturar y añadir una sección al PDF
      const addSectionToPdf = async (elementId, startNewPage = false) => {
        const element = cvContentRef.current.querySelector(`#${elementId}`);
        if (!element) {
          console.warn(`Sección con ID #${elementId} no encontrada. Saltando.`);
          return null; // Retorna null para indicar que la sección no se pudo añadir
        }

        const canvas = await html2canvas(element, {
          scale: 2, // Mayor escala para mejor calidad
          useCORS: true,
          backgroundColor: '#FFFFFF', // Fondo blanco explícito
          logging: false, // Deshabilita logs de html2canvas
          windowWidth: element.scrollWidth, // Captura el ancho completo del elemento
          windowHeight: element.scrollHeight, // Captura la altura completa del elemento
        });

        const imgData = canvas.toDataURL('image/png');
        const imgHeight = (canvas.height * contentWidth) / canvas.width; // Calcula la altura proporcional al ancho del PDF

        // Si se fuerza una nueva página o la imagen excede la altura de la página, añade una página.
        // Aseguramos que no añada una página extra si es la primera sección de la primera página.
        if (startNewPage && pdf.internal.getNumberOfPages() > 0) { // Fuerza nueva página si no es la primera sección en absoluto
            pdf.addPage();
        } else if (imgHeight > pdfHeight - margin * 2 && pdf.internal.getNumberOfPages() > 0) { // Si una sola sección es muy larga y no cabe
             // Si la sección es más grande que una página completa, html2canvas la capturará toda y addImage la dibujará.
             // Aquí se podría implementar lógica para cortar y añadir en múltiples addImage si la sección es *mucho* más grande
             // pero para CVs, generalmente html2canvas hace un buen trabajo si se le da el elemento completo.
             console.warn(`Sección #${elementId} excede la altura de una sola página. Puede recortarse si no hay espacio.`);
             pdf.addPage(); // Añade una página si excede el espacio restante en la actual.
        }

        // Agrega la imagen de la sección al PDF
        pdf.addImage(imgData, 'PNG', margin, margin, contentWidth, imgHeight); // Siempre empieza en el margen superior de la página actual
        
        // Return pdf object to allow chaining or page manipulation
        return { pdf, imgHeight, contentWidth };
      };

      // PAGE 1: Mi nombre completo, descripción y TODA la trayectoria profesional
      await addSectionToPdf('perfil-section', false); // Perfil (nombre, descripción, contacto)
      await addSectionToPdf('trayectoria', false);    // Trayectoria Profesional (toda)

      // Añadir una nueva página para la siguiente sección grande
      pdf.addPage();

      // PAGE 2: Habilidades & Competencias e Integración Humano-IA en Proyectos Reales
      await addSectionToPdf('habilidades', false); // Habilidades (incluye Integración Humano-IA)

      // Añadir una nueva página para la siguiente sección grande
      pdf.addPage();

      // PAGE 3: Formación Académica & Idiomas, Referencias Profesionales, Actividades Complementarias
      await addSectionToPdf('formacion', false);       // Formación Académica & Idiomas
      await addSectionToPdf('referencias', false);    // Referencias Profesionales
      await addSectionToPdf('actividades', false);    // Actividades Complementarias
      
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
      <CvContent ref={cvContentRef} />
    </>
  );
}

export default App; // Exporta el componente principal de la aplicación
