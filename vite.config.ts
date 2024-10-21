import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,  // Specify the port here
  },
  resolve: {
    alias: {
      'components/*': path.resolve(__dirname, './src/components'),
      'config/*': path.resolve(__dirname, './src/config'),
      'providers/*': path.resolve(__dirname, './src/providers'),
    },
  },
})
