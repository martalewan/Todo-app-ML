import { loadTodos, saveTodos } from './todosStorage.js'

let todos = loadTodos()
let nextId = todos.length ? todos[todos.length - 1].id + 1 : 1

export function getTodosModel() {
  return todos
}

export const addTodoModel = (text) => {
  const newTodo = {
    id: nextId++,
    text: text.trim(),
    completed: false,
  }
  todos.push(newTodo)
  saveTodos(todos)
  return newTodo
}

export const deleteTodoModel = (id) => {
  const initialLength = todos.length
  todos = todos.filter((todo) => todo.id !== id)
  if (todos.length !== initialLength) {
    saveTodos(todos)
  }
}

export const updateTodoModel = (id, updates) => {
  const todo = todos.find((t) => t.id === id)
  if (!todo) return null

  const { text, completed } = updates

  if (typeof text === 'string') {
    todo.text = text.trim()
  }
  if (typeof completed === 'boolean') {
    todo.completed = completed
  }
  saveTodos(todos)
  return todo
}

export const resetTodosModel = () => {
  todos = []
  nextId = 1
  saveTodos(todos)
}
