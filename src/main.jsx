// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos CSS de Bootstrap

// CORRECCIÓN DEFINITIVA para bootstrap-icons según la estructura del paquete y lo recomendado por GitHub Copilot:
// La ruta correcta es 'bootstrap-icons/font/bootstrap-icons.css'.
import 'bootstrap-icons/font/bootstrap-icons.css';


// Crea la raíz de la aplicación React y renderiza el componente App
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
