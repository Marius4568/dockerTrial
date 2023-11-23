import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl()],
   build: {
    outDir: 'build'  
  },
     server: {
      proxy: {
        '/api': {
          target: 'https://localhost:7011',
          // In production should not be set to false. Look into having a valid SSL Certificate
          secure: false,
        },
      },
       port: 44405,
       https: true
  },
})
