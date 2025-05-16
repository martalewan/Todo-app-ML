import { getLists, addList, updateList, deleteList } from '../models/listsModel.js'
import Joi from 'joi'

const listSchema = Joi.object({
  title: Joi.string().min(1).required(),
})

export const getListsHandler = (_, res) => {
  const lists = getLists()
  res.status(200).json({
    success: true,
    message: 'Lists retrieved successfully',
    data: lists,
  })
}

export const addListHandler = (req, res) => {
  const { error, value } = listSchema.validate(req.body)

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    })
  }

  const newList = addList(value.title)
  res.status(201).json({
    success: true,
    message: 'List created successfully',
    data: newList,
  })
}

export const updateListHandler = (req, res) => {
  const listId = Number(req.params.listId)

  if (Number.isNaN(listId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid list ID',
    })
  }
  const { error, value } = listSchema.validate(req.body)
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    })
  }

  const updated = updateList(listId, { title: value.title })
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

export const deleteListHandler = (req, res) => {
  const listId = Number(req.params.listId)

  if (Number.isNaN(listId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid list ID',
    })
  }

  const deleted = deleteList(listId)
  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: 'List not found',
    })
  }
  res.status(200).json({
    success: true,
    message: 'List deleted successfully',
  })
}
