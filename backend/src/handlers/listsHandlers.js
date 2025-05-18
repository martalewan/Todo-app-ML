import {
  getLists as getListsService,
  createList as createListService,
  updateList as updateListService,
  deleteList as deleteListService,
} from '../services/listsService.js'
import Joi from 'joi'

const createListSchema = Joi.object({
  title: Joi.string().min(1).required(),
})

const updateListSchema = Joi.object({
  title: Joi.string().min(1).optional(),
})

export const listIdSchema = Joi.number().integer().required()

export const getLists = (_, res) => {
  const lists = getListsService()
  res.status(200).json({
    success: true,
    message: 'Lists retrieved successfully',
    data: lists,
  })
}

export const createList = (req, res) => {
  const { error, value } = createListSchema.validate(req.body)

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    })
  }

  const newList = createListService(value.title)
  res.status(201).json({
    success: true,
    message: 'List created successfully',
    data: newList,
  })
}

export const updateList = (req, res) => {
  const { error: listIdError, value: listId } = listIdSchema.validate(req.params.listId)

  if (listIdError) {
    return res.status(400).json({
      success: false,
      message: 'Invalid list ID',
    })
  }
  const { error, value } = updateListSchema.validate(req.body)
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    })
  }

  const updated = updateListService(listId, { title: value.title })
  if (!updated) {
    return res.status(404).json({
      success: false,
      message: 'List not found',
    })
  }

  res.status(200).json({
    success: true,
    message: 'List updated successfully',
    data: updated,
  })
}

export const deleteList = (req, res) => {
  const { error: errorListId, value: listId } = listIdSchema.validate(req.params.listId)

  if (errorListId) {
    return res.status(400).json({
      success: false,
      message: 'Invalid list ID',
    })
  }

  const deleted = deleteListService(listId)
  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: 'List not found',
    })
  }
  return res.status(204).send()
}
