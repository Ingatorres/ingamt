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
  // Creates a reference to the CvContent component so that html2canvas can access it.
  const componentRef = useRef(null);

  // Function to download the CV as PDF using jsPDF and html2canvas
  const handleDownloadPdf = async () => {
    console.log("Button 'Descargar CV PDF' clicked.");
    console.log("Current state of componentRef.current BEFORE capture:", componentRef.current);

    const input = componentRef.current; // The DOM element of the CV to capture

    if (!input) {
      console.error("Could not find reference to CV content to generate PDF.");
      // You could display a visible message to the user here (using a custom modal).
      return;
    }

    try {
      const pdf = new jsPDF('p', 'mm', 'letter'); // Create a new PDF document (portrait, mm, letter size)
      const pdfWidth = pdf.internal.pageSize.getWidth(); // Page width (letter in mm)
      const pdfHeight = pdf.internal.pageSize.getHeight(); // Page height (letter in mm)
      const margin = 10; // Margen en mm para cada lado de la página (top, right, bottom, left)
      const contentWidth = pdfWidth - (2 * margin); // Ancho del contenido disponible
      let currentY = margin; // Posición Y inicial para la página (margen superior)

      // Definimos los IDs de las secciones en el orden deseado para el PDF
      // Estos IDs deben estar en los componentes de Perfil, Experiencia, Habilidades, etc.
      const sections = [
        { id: 'perfil-header', page: 1, forceNew: false }, // Nombre completo y descripción
        { id: 'trayectoria', page: 1, forceNew: false },    // Trayectoria Profesional
        { id: 'habilidades', page: 2, forceNew: true },     // Habilidades & Competencias
        { id: 'integracion-humano-ia', page: 2, forceNew: false }, // Integración Humano-IA
        { id: 'formacion', page: 3, forceNew: true },       // Formación Académica & Idiomas
        { id: 'referencias', page: 3, forceNew: false },    // Referencias Profesionales
        { id: 'actividades', page: 3, forceNew: false }     // Actividades Complementarias
      ];

      for (const section of sections) {
        const element = input.querySelector(`#${section.id}`);
        if (!element) {
          console.warn(`Section with ID #${section.id} not found. Skipping.`);
          continue;
        }

        const canvas = await html2canvas(element, {
          scale: 2, // Increase scale for better image quality in the PDF
          useCORS: true, // Important if you have cross-origin images
          backgroundColor: '#FFFFFF', // Ensures a white background in the capture
          logging: false, // Disable excessive html2canvas logs for a cleaner console
          // Important: html2canvas captures the current scroll position, so ensure the element is visible
          // Or, let html2canvas handle scrolling its own internal window.
          windowWidth: element.scrollWidth, // Capture the full width of the element's content
          windowHeight: element.scrollHeight, // Capture the full height of the element's content
        });

        const imgData = canvas.toDataURL('image/png');
        const imgHeight = (canvas.height * contentWidth) / canvas.width; // Calculate image height to fit content width

        // Add new page if forced, or if section won't fit on current page and it's not the very first content
        if (section.forceNew || (currentY + imgHeight + margin > pdfHeight && currentY !== margin)) {
          pdf.addPage();
          currentY = margin; // Reset Y position for new page
        }

        // Add image to PDF
        pdf.addImage(imgData, 'PNG', margin, currentY, contentWidth, imgHeight);
        currentY += imgHeight + margin; // Update Y position for next section, adding a margin between sections

        // If it's the last section for a given page group, reset Y for next page
        // This ensures the next section starts fresh on a new page as per pagination plan.
        if (section.page === 1 && section.id === 'trayectoria' ||
            section.page === 2 && section.id === 'integracion-humano-ia') {
            pdf.addPage();
            currentY = margin;
        }
      }

      pdf.save('CV_Angel_Mateo_Torres_Barco.pdf'); // Save the PDF with the specified name
      console.log("PDF generated and downloaded successfully.");

    } catch (error) {
      console.error("Error generating PDF:", error);
      // You could display a friendly error message to the user in a modal here.
    }
  };

  return (
    <>
      {/* Injects custom styles globally */}
      <style>{customStyles}</style>

      {/* Navigation Navbar */}
      <Navbar bg="primary" variant="dark" expand="lg" fixed="top" className="shadow-sm py-3">
        <Container>
          {/* Download CV PDF Button */}
          <Button
            variant="info"
            className="fw-bold d-flex align-items-center me-auto order-1 order-lg-0"
            style={{ backgroundColor: 'var(--bs-info)', borderColor: 'var(--bs-info)', color: 'var(--bs-primary)' }}
            onClick={handleDownloadPdf} // Call the new download function
          >
            <i className="bi bi-file-earmark-arrow-down me-2"></i> Descargar CV PDF
          </Button>

          {/* Toggle button for mobile navbar */}
          <Navbar.Toggle aria-controls="navbarNav" />

          {/* Navigation Links */}
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

      {/* CV Content (the component that will be printed) */}
      {/* The CvContent component will continue to use the ref so html2canvas can access its DOM. */}
      <CvContent ref={componentRef} />
    </>
  );
}

export default App; // Exports the main application component
