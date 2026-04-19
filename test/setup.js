import { beforeEach } from 'vitest'
import fs from 'fs'
import path from 'path'

beforeEach(() => {
  const html = fs.readFileSync(path.join(__dirname, 'fixtures', 'index.html'), 'utf-8')
  document.body.innerHTML = html
})