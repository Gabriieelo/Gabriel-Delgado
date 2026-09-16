import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFile } from 'node:fs/promises'

const portfolioApi = {
  name: 'portfolio-api',
  configureServer(server) {
    server.middlewares.use('/api/portfolio', async (req, res) => {
      try {
        const data = await readFile(new URL('./data/portfolio.json', import.meta.url))
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.setHeader('Cache-Control', 'no-store')
        res.end(data)
      } catch {
        res.statusCode = 500
        res.end('No se pudo cargar el portfolio')
      }
    })
  },
}

export default defineConfig({
  plugins: [react(), portfolioApi],
})
