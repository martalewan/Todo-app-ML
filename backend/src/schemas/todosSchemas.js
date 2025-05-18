import Joi from 'joi'

export const createTodoSchema = Joi.object({
  text: Joi.string().min(1).required(),
})

export const updateTodoSchema = Joi.object({
  text: Joi.string().min(1).optional(),
  completed: Joi.boolean().optional(),
})

export const todoIdSchema = Joi.object({
  todoId: Joi.string().uuid().required(),
})
