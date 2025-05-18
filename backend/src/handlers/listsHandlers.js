import * as todoService from '../services/listsService.js'

export const getLists = (_, res) => {
  const lists = todoService.getLists()
  res.status(200).json({
    success: true,
    message: 'Lists retrieved successfully',
    data: lists,
  })
}

export const createList = (req, res) => {
  const title = req.body.title

  const newList = todoService.createList(title)
  res.status(201).json({
    success: true,
    message: 'List created successfully',
    data: newList,
  })
}

export const updateList = (req, res) => {
  const title = req.body.title

  const updated = todoService.updateList(req.params.listId, { title })
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
  const listId = req.params.listId
  const deleted = todoService.deleteList(listId)
  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: 'List not found',
    })
  }
  return res.status(204).send()
}
