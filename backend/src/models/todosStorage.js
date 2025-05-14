import fs from 'fs'
import path from 'path'

const dataDir = path.join(process.cwd(), 'data')
const filePath = path.join(dataDir, 'todos.json')

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir)
}

export const loadTodos = () => {
  try {
    const data = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (err) {
    return []
  }
}

export const saveTodos = (todos) => {
  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2), 'utf-8')
}
