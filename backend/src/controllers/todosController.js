import { getTodos, addTodo, deleteTodo, updateTodo, getLists } from '../models/listsModel.js'

export const getTodosHandler = (req, res) => {
  const listId = Number(req.params.listId)
  if (Number.isNaN(listId)) return res.status(400).json({ error: 'Invalid listId' })

  const lists = getLists()
  if (!lists.some((l) => l.id === listId)) {
    return res.status(404).json({ error: 'List not found' })
  }

  return res.json(getTodos(listId))
}

export const addTodoHandler = (req, res) => {
  const listId = Number(req.params.listId)
  const { text } = req.body

  if (Number.isNaN(listId)) return res.status(400).json({ error: 'Invalid listId' })
  if (typeof text !== 'string' || !text.trim())
    return res.status(400).json({ error: 'Text is required' })

  const lists = getLists()
  if (!lists.some((l) => l.id === listId)) {
    return res.status(404).json({ error: 'List not found' })
  }

  const newTodo = addTodo(listId, text)
  return res.status(201).json(newTodo)
}

export const deleteTodoHandler = (req, res) => {
  const listId = Number(req.params.listId)
  const todoId = Number(req.params.todoId)

  if (Number.isNaN(listId) || Number.isNaN(todoId))
    return res.status(400).json({ error: 'Invalid ID' })

  const lists = getLists()
  if (!lists.some((l) => l.id === listId)) {
    return res.status(404).json({ error: 'List not found' })
  }

  const deleted = deleteTodo(listId, todoId)
  return deleted ? res.status(204).send() : res.status(404).json({ error: 'Todo not found' })
}

export const updateTodoHandler = (req, res) => {
  const listId = Number(req.params.listId)
  const todoId = Number(req.params.todoId)
  const updates = req.body

  if (Number.isNaN(listId) || Number.isNaN(todoId))
    return res.status(400).json({ error: 'Invalid ID' })

  const lists = getLists()
  if (!lists.some((l) => l.id === listId)) {
    return res.status(404).json({ error: 'List not found' })
  }

  const updated = updateTodo(listId, todoId, updates)
  return updated ? res.json(updated) : res.status(404).json({ error: 'Todo not found' })
}
