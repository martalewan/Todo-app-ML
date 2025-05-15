import { getLists, addList, updateList, deleteList } from '../models/listsModel.js'

export const getListsHandler = (req, res) => {
  const lists = getLists()
  res.status(200).json({
    success: true,
    message: 'Lists retrieved successfully',
    data: lists,
  })
}

export const addListHandler = (req, res) => {
  const { title } = req.body
  if (typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Title is required',
    })
  }
  const newList = addList(title)
  res.status(201).json({
    success: true,
    message: 'List created successfully',
    data: newList,
  })
}

export const updateListHandler = (req, res) => {
  const listId = Number(req.params.listId)
  const { title } = req.body

  if (Number.isNaN(listId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid list ID',
    })
  }

  const updated = updateList(listId, { title })
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
