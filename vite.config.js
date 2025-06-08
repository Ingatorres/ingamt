// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Importa el módulo 'path' de Node.js

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ingamt/',
  build: {
    outDir: 'dist',
  },
  // Alternativa para resolver la importación de bootstrap-icons.css
  resolve: {
    alias: {
      'bootstrap-icons/font': path.resolve(__dirname, 'node_modules/bootstrap-icons/font'),
    },
  },
});
