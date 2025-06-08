// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // **¡IMPORTANTE!** La base del despliegue para GitHub Pages.
  // Esta debe coincidir EXACTAMENTE con el nombre de tu repositorio de GitHub,
  // incluyendo las barras diagonales al principio y al final.
  base: '/angel-mateo-cv/', // <--- ¡Verifica y asegúrate de que sea el nombre EXACTO de tu repositorio!
  build: {
    outDir: 'dist', // La carpeta de salida por defecto para los archivos compilados
  }
});
