// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // **¡IMPORTANTE!** La base del despliegue para GitHub Pages.
  // Esta debe coincidir EXACTAMENTE con el nombre de tu repositorio de GitHub,
  // incluyendo las barras diagonales al principio y al final.
  base: '/ingamt/', // <--- ¡CORREGIDO: Ahora coincide con tu repositorio 'ingamt'!
  build: {
    outDir: 'dist', // La carpeta de salida por defecto para los archivos compilados
  }
});
