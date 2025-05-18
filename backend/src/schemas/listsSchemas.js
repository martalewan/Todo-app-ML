import Joi from 'joi'

export const createListSchema = Joi.object({
  title: Joi.string().min(1).required(),
})

export const updateListSchema = Joi.object({
  title: Joi.string().min(1).optional(),
})

export const listIdSchema = Joi.object({
  listId: Joi.string().uuid().required(),
})
