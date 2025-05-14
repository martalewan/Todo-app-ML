import { getTodosModel, addTodoModel, deleteTodoModel } from '../models/todoModel.js'

export const listTodos = (req, res) => {
  const todos = getTodosModel()
  res.json(todos)
}

export const addTodo = (req, res) => {
  const { text } = req.body
  if (!text) {
    return res.status(400).json({ error: 'Text is required' })
  }
  const newTodo = addTodoModel(text)
  res.status(201).json(newTodo)
}

export const deleteTodo = (req, res) => {
  const id = Number(req.params.id)
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid id' })
  }
  const todo = getTodosModel().find((t) => t.id === parseInt(id))
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' })
  }
  deleteTodoModel(parseInt(id))
  res.status(204).send()
}

export const updateTodo = (req, res) => {
  const id = Number(req.params.id)
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid id' })
  }

  const todos = getTodosModel()
  const todo = todos.find((t) => t.id === id)

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' })
  }

  const { text, completed } = req.body

  if (typeof text === 'string') {
    todo.text = text
  }

  if (typeof completed === 'boolean') {
    todo.completed = completed
  }

  return res.status(200).json(todo)
}
