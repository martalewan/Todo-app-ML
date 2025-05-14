import { getTodosModel, addTodoModel } from "../models/todoModel"

export const listTodos = (req, res) => {
  const todos = getTodosModel()
  res.json(todos)
}

export const addTodo = (req, res) => {
  const { text } = req.body
  if (!text) {
    return res.status(400).json({ error: "Text is required" })
  }
  const newTodo = addTodoModel(text)
  res.status(201).json(newTodo)
}