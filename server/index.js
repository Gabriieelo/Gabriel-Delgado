import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const dist = resolve(root, 'dist')
const data = resolve(root, 'data/portfolio.json')
const port = Number(process.env.PORT || 3001)
const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
}

createServer(async (req, res) => {
  if (req.method !== 'GET') {
    res.writeHead(405).end('Method not allowed')
    return
  }

  try {
    const pathname = new URL(req.url, 'http://localhost').pathname
    if (pathname === '/api/portfolio') {
      const body = await readFile(data)
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }).end(body)
      return
    }

    const requested = resolve(dist, `.${decodeURIComponent(pathname)}`)
    if (requested !== dist && !requested.startsWith(dist + sep)) {
      res.writeHead(403).end('Forbidden')
      return
    }
    let file = requested
    try {
      if (!(await stat(file)).isFile()) file = resolve(dist, 'index.html')
    } catch {
      file = resolve(dist, 'index.html')
    }
    const body = await readFile(file)
    res.writeHead(200, { 'Content-Type': contentTypes[extname(file)] || 'application/octet-stream' }).end(body)
  } catch (error) {
    res.writeHead(500).end('Server error')
    console.error(error)
  }
}).listen(port, () => console.log(`Portfolio disponible en http://localhost:${port}`))
