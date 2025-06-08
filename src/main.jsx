// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos CSS de Bootstrap

// CORRECCIÓN FINAL para bootstrap-icons:
// Apuntamos a 'icons.css', que es una ruta común y a menudo más fiable para la compilación con Vite.
import 'bootstrap-icons/icons.css';


// Crea la raíz de la aplicación React y renderiza el componente App
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
