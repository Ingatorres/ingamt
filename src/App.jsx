// src/App.jsx
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Navbar, Nav, Button, Container } from 'react-bootstrap'; // Importa componentes de react-bootstrap
import CvContent from './components/CvContent'; // Importa el componente que contiene el CV

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

// Estilos específicos para la impresión en PDF (oculta elementos no deseados y ajusta el layout)
// Se inyectan con 'react-to-print' para una impresión de alta fidelidad.
const pageStyle = `
  @page {
    size: A4;
    margin: 20mm;
  }

  /* Oculta el navbar y el botón de descarga en la versión PDF */
  .navbar, .pdf-hide {
    display: none !important;
  }

  /* Asegura que los fondos se impriman correctamente y evita el "velo gris" */
  body {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    background-color: white !important;
  }

  .card, .bg-light, .bg-info-subtle {
    background-color: white !important;
    border-color: var(--bs-info-border-subtle) !important;
  }

  /* Fuerza saltos de página para secciones principales para una mejor paginación */
  #trayectoria, #habilidades, #formacion, #referencias, #actividades {
    page-break-before: always;
  }

  /* Estilo para el pie de página que aparece en cada hoja del PDF */
  .pdf-footer-content::after {
    content: "Documento elaborado por Ing. Ángel Mateo Torres – con apoyo estratégico de IA generativa.";
    display: block;
    position: fixed; /* Cambiado a fixed para asegurar que se repita en cada página */
    bottom: 10mm;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 9px;
    color: #555 !important;
    padding: 5px 0;
  }
`;

function App() {
  // Crea una referencia al componente CvContent para que react-to-print pueda acceder a él.
  // Inicializamos con null explícitamente para mayor claridad.
  const componentRef = useRef(null);

  // Configura la función de impresión
  const handlePrint = useReactToPrint({
    // La función 'content' debe devolver el nodo DOM a imprimir.
    // Incluimos una validación agresiva para asegurarnos de que el ref no sea null.
    content: () => {
      if (!componentRef.current) {
        console.error("react-to-print: El componente de CV no está disponible para imprimir.");
        // Lanzamos un error que será capturado por onPrintError, evitando alert().
        throw new Error('El contenido del CV no está listo para imprimir. Inténtelo de nuevo.');
      }
      return componentRef.current;
    },
    documentTitle: 'CV_Angel_Mateo_Torres_Barco', // Nombre del archivo PDF
    pageStyle: pageStyle, // Aplica los estilos CSS definidos para el PDF
    removeAfterPrint: true, // Opcional: Remueve el iframe de impresión del DOM después de imprimir
    
    // Función que se ejecuta antes de obtener el contenido. Útil para asegurar el montaje.
    onBeforeGetContent: () => {
      console.log("react-to-print: onBeforeGetContent llamado.");
      return new Promise((resolve, reject) => {
        // Un pequeño retardo para asegurar que el DOM esté completamente listo en el iframe de impresión.
        setTimeout(() => {
          if (componentRef.current) {
            console.log("react-to-print: Ref al componente de CV encontrado dentro de onBeforeGetContent.", componentRef.current);
            resolve();
          } else {
            console.warn("react-to-print: No se encontró la referencia al contenido del CV para imprimir después del retardo en onBeforeGetContent.");
            reject(new Error("No content ref available after delay.")); // Rechaza la promesa si el ref sigue siendo null
          }
        }, 500); // Espera 500 milisegundos (0.5 segundos)
      });
    },
    
    // Función que se ejecuta después de que la impresión finaliza.
    onAfterPrint: () => {
      console.log("react-to-print: Impresión finalizada.");
    },
    
    // Función que se ejecuta si ocurre un error durante el proceso de impresión.
    onPrintError: (error) => {
      console.error("react-to-print: Error durante la impresión:", error);
      // Aquí podrías mostrar un mensaje visible al usuario en un modal personalizado, en lugar de alert().
      // Por ejemplo: showCustomModal("Error al generar el PDF: " + error.message);
    },
  });

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
            onClick={() => {
              console.log("Botón 'Descargar CV PDF' clicado."); // Log al hacer clic
              console.log("Estado actual de componentRef.current ANTES de handlePrint execution:", componentRef.current); // Log del estado del ref
              
              // Validamos el ref antes de llamar a handlePrint.
              if (componentRef.current) {
                handlePrint();
              } else {
                console.error("Verificación manual: componentRef.current es null. No se puede iniciar la impresión.");
                // Aquí también podrías mostrar un modal al usuario si lo deseas.
              }
            }}
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
      <CvContent ref={componentRef} />
    </>
  );
}

export default App; // Exporta el componente principal de la aplicación
