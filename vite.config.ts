import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
// @ts-ignore
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom'
  }
})
