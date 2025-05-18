import * as listService from '../services/listsService.js'

export const getTodos = (req, res) => {
  const listId = req.params.listId

  const lists = listService.getLists()
  if (!lists.some((l) => l.id === listId)) {
    return res.status(404).json({
      success: false,
      message: 'List not found',
    })
  }

  const todos = listService.getTodos(listId)
  return res.status(200).json({
    success: true,
    message: 'Todos retrieved successfully',
    data: todos,
  })
}

export const createTodo = (req, res) => {
  const listId = req.params.listId
  const text = req.body.text

  const lists = listService.getLists()
  if (!lists.some((l) => l.id === listId)) {
    return res.status(404).json({
      success: false,
      message: 'List not found',
    })
  }

  const newTodo = listService.createTodo(listId, text)
  return res.status(201).json({
    success: true,
    message: 'Todo created successfully',
    data: newTodo,
  })
}

export const updateTodo = (req, res) => {
  const todoId = req.params.todoId
  const update = req.body

  const updated = listService.updateTodo(todoId, update)
  if (!updated) {
    return res.status(404).json({
      success: false,
      message: 'Todo not found',
    })
  }
  return res.status(200).json({
    success: true,
    message: 'Todo updated successfully',
    data: updated,
  })
}

export const deleteTodo = (req, res) => {
  const todoId = req.params.todoId

  const deleted = listService.deleteTodo(todoId)
  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: 'Todo not found',
    })
  }
  return res.status(204).send()
}
