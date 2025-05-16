import { getTodos, addTodo, deleteTodo, updateTodo, getLists } from '../models/listsModel.js'
import Joi from 'joi'

const todoSchema = Joi.object({
  text: Joi.string().min(1).required(),
  completed: Joi.boolean(),
})

export const getTodosHandler = (req, res) => {
  const listId = Number(req.params.listId)
  if (Number.isNaN(listId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid list ID',
    })
  }
  const lists = getLists()
  if (!lists.some((l) => l.id === listId)) {
    return res.status(404).json({
      success: false,
      message: 'List not found',
    })
  }
  const todos = getTodos(listId)
  return res.status(200).json({
    success: true,
    message: 'Todos retrieved successfully',
    data: todos,
  })
}

export const addTodoHandler = (req, res) => {
  const listId = Number(req.params.listId)
  const { error, value } = todoSchema.validate(req.body)

  if (Number.isNaN(listId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid list ID',
    })
  }

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    })
  }

  const lists = getLists()
  if (!lists.some((l) => l.id === listId)) {
    return res.status(404).json({
      success: false,
      message: 'List not found',
    })
  }

  const newTodo = addTodo(listId, value.text)
  return res.status(201).json({
    success: true,
    message: 'Todo created successfully',
    data: newTodo,
  })
}

export const updateTodoHandler = (req, res) => {
  const listId = Number(req.params.listId)
  const todoId = Number(req.params.todoId)
  const updates = req.body

  if (Number.isNaN(listId) || Number.isNaN(todoId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID(s)',
    })
  }

  const lists = getLists()
  if (!lists.some((l) => l.id === listId)) {
    return res.status(404).json({
      success: false,
      message: 'List not found',
    })
  }
  const { error, value } = todoSchema.validate(updates)
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    })
  }
  const updated = updateTodo(listId, todoId, value)

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

export const deleteTodoHandler = (req, res) => {
  const listId = Number(req.params.listId)
  const todoId = Number(req.params.todoId)

  if (Number.isNaN(listId) || Number.isNaN(todoId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID(s)',
    })
  }

  const lists = getLists()
  if (!lists.some((l) => l.id === listId)) {
    return res.status(404).json({
      success: false,
      message: 'List not found',
    })
  }

  const deleted = deleteTodo(listId, todoId)
  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: 'Todo not found',
    })
  }
  return res.status(204).send()
}
