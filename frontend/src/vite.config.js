import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Add the following 'resolve' property:
  resolve: {
    alias: {
      './runtimeConfig': './runtimeConfig.browser', // Adjust the paths as needed
    },
  },
})
