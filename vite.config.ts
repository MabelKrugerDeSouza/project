import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/project/', // Substitua 'project' pelo nome exato da subpasta do GitHub Pages
 plugins: [react()],
});