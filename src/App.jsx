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
  // Crea una referencia al componente CvContent para obtener su HTML.
  const cvContentRef = useRef(null);

  // **¡IMPORTANTE!** ESTE ES EL URL DE TU APLICACIÓN WEB DE APPS SCRIPT
  const APPS_SCRIPT_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycby-vC2k9D6YwuMi7wzEE8TT2s-4jq24R7WiLmMgeERTu8us1FBkN3WmXtZ1_hELnEE/exec'; 

  // Función para descargar el CV como PDF utilizando Google Apps Script
  const handleDownloadPdf = async () => {
    console.log("Botón 'Descargar CV PDF' clicado.");
    console.log("Intentando obtener HTML de cvContentRef.current:", cvContentRef.current);

    if (!cvContentRef.current) {
      console.error("No se encontró la referencia al contenido del CV. Asegúrate de que el componente CvContent esté montado.");
      alert("Error: El contenido del CV no está listo. Por favor, intente de nuevo."); // Usamos alert temporalmente para el usuario.
      return;
    }

    // Clonar el elemento para asegurar que no modificamos el DOM original
    const printableElement = cvContentRef.current.cloneNode(true);

    // Opcional: Eliminar cualquier elemento que no quieras en el PDF (e.g., botones, navbars)
    // En este caso, como solo capturamos el contenido, no el navbar, no es estrictamente necesario aquí.
    // Pero si tuvieras otros elementos en cvContentRef que no quieres en el PDF, podrías eliminarlos del clone.

    // Extraer el HTML de la sección de CV.
    // Si tu CV incluye imágenes con rutas relativas,
    // asegúrate de que el Apps Script pueda resolverlas o que las rutas sean absolutas.
    // Para las imágenes en la carpeta public, la ruta será absoluta desde la raíz de tu GH Pages.
    // Ej: `<img src="https://ingatorres.github.io/ingamt/CVPh.jpg"`
    // Vamos a reemplazar src de la imagen de perfil para que sea una URL absoluta en el HTML enviado.
    const imgSrc = `${window.location.origin}${import.meta.env.BASE_URL}CVPh.jpg`;
    const tempDiv = document.createElement('div');
    tempDiv.appendChild(printableElement);
    let htmlContent = tempDiv.innerHTML;

    // Reemplaza la ruta relativa de la imagen de perfil por una URL absoluta en el HTML
    // Esto es crucial para que Google Docs pueda cargar la imagen desde internet.
    htmlContent = htmlContent.replace(/src="(\/?CVPh\.jpg)"/, `src="${imgSrc}"`);
    console.log("HTML a enviar (parcial):", htmlContent.substring(0, 500) + "..."); // Mostrar un fragmento del HTML

    // ¡Ya no es necesario verificar el placeholder, ya lo he reemplazado!
    // if (APPS_SCRIPT_WEB_APP_URL === 'TU_URL_DE_APPS_SCRIPT_AQUI') {
    //     console.error("Error: Por favor, actualiza APPS_SCRIPT_WEB_APP_URL en App.jsx con el URL de tu Apps Script Web App.");
    //     alert("Error de configuración: URL de Apps Script no definida.");
    //     return;
    // }

    try {
      // Envía el HTML a la aplicación web de Apps Script
      const response = await fetch(APPS_SCRIPT_WEB_APP_URL, {
        method: 'POST',
        // Content-Type: application/x-www-form-urlencoded es común para Apps Script doPost
        // También puedes usar 'application/json' si tu doPost espera JSON,
        // pero para simplicity con parámetros, form-urlencoded es más directo.
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        // Codifica el HTML para enviarlo como un parámetro
        body: `htmlContent=${encodeURIComponent(htmlContent)}`,
      });

      const result = await response.json();

      if (result.success) {
        console.log("PDF generado exitosamente por Apps Script:", result.pdfUrl);
        // Abre el PDF en una nueva pestaña para su descarga
        window.open(result.pdfUrl, '_blank');
      } else {
        console.error("Error al generar el PDF en Apps Script:", result.message);
        alert(`Error al generar el PDF: ${result.message}`);
      }
    } catch (error) {
      console.error("Error en la comunicación con Apps Script:", error);
      alert(`Error de comunicación con el servicio de PDF: ${error.message}. Verifique la consola.`);
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

      {/* Contenido del CV (el componente que se imprimirá o del que se obtendrá el HTML) */}
      <CvContent ref={cvContentRef} />
    </>
  );
}

export default App; // Exporta el componente principal de la aplicación
