// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos CSS de Bootstrap

// CORRECCIÓN DEFINITIVA para bootstrap-icons:
// En lugar de apuntar a 'font/bootstrap-icons.css', que a veces es problemático con Vite/Rollup,
// apuntamos a la ruta principal del CSS que se encuentra directamente en el paquete.
// Esto es generalmente más fiable para módulos de node_modules.
import 'bootstrap-icons/font/bootstrap-icons.css';


// Crea la raíz de la aplicación React y renderiza el componente App
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
