import { getTodos } from "../models/todoModel"

export const listTodos = (req, res) => {
  const todos = getTodos()
  res.json(todos)
}
