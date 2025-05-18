import * as listService from '../services/listsService.js'
import Joi from 'joi'
import { listIdSchema } from './listsHandlers.js'

const todoIdSchema = Joi.string().uuid().required()

const createTodoSchema = Joi.object({
  text: Joi.string().min(1).required(),
})
const updateTodoSchema = Joi.object({
  text: Joi.string().min(1).optional(),
  completed: Joi.boolean().optional(),
})

export const getTodos = (req, res) => {
  const { error: listIdError, value: listId } = listIdSchema.validate(req.params.listId)

  if (listIdError) {
    return res.status(400).json({
      success: false,
      message: 'Invalid list ID',
    })
  }

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
  const { error: listIdError, value: listId } = listIdSchema.validate(req.params.listId)

  if (listIdError) {
    return res.status(400).json({
      success: false,
      message: 'Invalid list ID',
    })
  }

  const { error, value } = createTodoSchema.validate(req.body)
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    })
  }

  const lists = listService.getLists()
  if (!lists.some((l) => l.id === listId)) {
    return res.status(404).json({
      success: false,
      message: 'List not found',
    })
  }

  const newTodo = listService.createTodo(listId, value.text)
  return res.status(201).json({
    success: true,
    message: 'Todo created successfully',
    data: newTodo,
  })
}

export const updateTodo = (req, res) => {
  const { error: todoIdError, value: todoId } = todoIdSchema.validate(req.params.todoId)
  if (todoIdError) {
    return res.status(400).json({
      success: false,
      message: 'Invalid todo ID',
    })
  }
  const { error, value } = updateTodoSchema.validate(req.body)
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    })
  }

  const updated = listService.updateTodo(todoId, value)
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
  const { error: todoIdError, value: todoId } = todoIdSchema.validate(req.params.todoId)
  if (todoIdError) {
    return res.status(400).json({
      success: false,
      message: 'Invalid todo ID',
    })
  }

  const deleted = listService.deleteTodo(todoId)
  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: 'Todo not found',
    })
  }
  return res.status(204).send()
}
