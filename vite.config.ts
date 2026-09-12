import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/motionframe-ai/', // Sesuaikan dengan nama repository GitHub kamu nanti!
})