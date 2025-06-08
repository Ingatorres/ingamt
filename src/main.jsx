// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos CSS de Bootstrap

// CORRECCIÓN: Cambiamos la importación de bootstrap-icons.css
// La forma anterior 'bootstrap-icons/font/bootstrap-icons.css' a veces causa problemas con Vite.
// Usamos el importador directo que se instala en node_modules.
import 'bootstrap-icons/font/bootstrap-icons.css'; // Mantenemos la importación directa que debería funcionar
// Si esto persiste, una alternativa sería importar solo los iconos específicos o añadir a vite.config.js un alias.
// Por ahora, probemos con la ruta completa como está, asegurando que el paquete está bien instalado.


// Crea la raíz de la aplicación React y renderiza el componente App
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
