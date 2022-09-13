import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    https:{
      key:readFileSync(`${__dirname}/localhost+1-key.pem`),
      cert:readFileSync(`${__dirname}/localhost+1.pem`)
    }
  }
})
