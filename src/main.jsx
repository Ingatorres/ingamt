// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos CSS de Bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css'; // Importa los íconos de Bootstrap correctamente desde el paquete

// Crea la raíz de la aplicación React y renderiza el componente App
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> {/* Volvemos a activar StrictMode */}
    <App />
  </React.StrictMode>,
);
