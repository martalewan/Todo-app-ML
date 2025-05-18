import {
  getTodos as getTodoService,
  createTodo as createTodoService,
  deleteTodo as deleteTodoService,
  updateTodo as updateTodoService,
  getLists as getListsService,
} from '../services/listsService.js'
import Joi from 'joi'
import { listIdSchema } from './listsHandlers.js'

const todoIdSchema = Joi.number().integer().required()

const createTodoSchema = Joi.object({
  text: Joi.string().min(1).required(),
})
const updateTodoSchema = Joi.object({
  text: Joi.string().min(1).optional(),
  completed: Joi.boolean().optional(),
})
const updateTodoParamsSchema = Joi.object({
  listId: listIdSchema,
  todoId: todoIdSchema,
})

export const getTodos = (req, res) => {
  const { error: listIdError, value: listId } = listIdSchema.validate(req.params.listId)

  if (listIdError) {
    return res.status(400).json({
      success: false,
      message: 'Invalid list ID',
    })
  }
  const lists = getListsService()
  if (!lists.some((l) => l.id === listId)) {
    return res.status(404).json({
      success: false,
      message: 'List not found',
    })
  }

  const todos = getTodoService(listId)
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

  const lists = getListsService()
  if (!lists.some((l) => l.id === listId)) {
    return res.status(404).json({
      success: false,
      message: 'List not found',
    })
  }

  const newTodo = createTodoService(listId, value.text)
  return res.status(201).json({
    success: true,
    message: 'Todo created successfully',
    data: newTodo,
  })
}

export const updateTodo = (req, res) => {
  const { error: paramError, value: paramValues } = updateTodoParamsSchema.validate(req.params)
  if (paramError) {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID(s)',
    })
  }
  const { listId, todoId } = paramValues

  const { error, value } = updateTodoSchema.validate(req.body)
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    })
  }

  const lists = getListsService()
  if (!lists.some((l) => l.id === listId)) {
    return res.status(404).json({
      success: false,
      message: 'List not found',
    })
  }

  const updated = updateTodoService(listId, todoId, value)
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
  const { error: paramError, value: paramValues } = updateTodoParamsSchema.validate(req.params)
  if (paramError) {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID(s)',
    })
  }

  const lists = getListsService()
  if (!lists.some((l) => l.id === paramValues.listId)) {
    return res.status(404).json({
      success: false,
      message: 'List not found',
    })
  }

  const deleted = deleteTodoService(paramValues.listId, paramValues.todoId)
  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: 'Todo not found',
    })
  }
  return res.status(204).send()
}
