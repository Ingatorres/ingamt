// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ¡CRÍTICO! Esta base DEBE COINCIDIR EXACTAMENTE con el nombre de tu repositorio en GitHub
  // y debe incluir las barras diagonales al principio y al final.
  base: '/ingamt/', // <--- ¡Asegúrate que sea exactamente '/ingamt/'!
  build: {
    outDir: 'dist',
  }
});
