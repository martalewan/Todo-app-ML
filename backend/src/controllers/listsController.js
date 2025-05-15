import { getLists, addList, updateList, deleteList } from '../models/listsModel.js'

export const getListsHandler = (req, res) => {
  const lists = getLists()

  res.json(lists)
}

export const addListHandler = (req, res) => {
  const { title } = req.body
  if (typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'Title is required' })
  }
  const newList = addList(title)
  res.status(201).json(newList)
}

export const updateListHandler = (req, res) => {
  const listId = Number(req.params.listId)
  const { title } = req.body

  if (Number.isNaN(listId)) {
    return res.status(400).json({ error: 'Invalid list ID' })
  }

  const updated = updateList(listId, { title })
  if (!updated) {
    return res.status(404).json({ error: 'List not found' })
  }

  res.json(updated)
}

export const deleteListHandler = (req, res) => {
  const listId = Number(req.params.listId)

  if (Number.isNaN(listId)) {
    return res.status(400).json({ error: 'Invalid list ID' })
  }

  const deleted = deleteList(listId)
  if (!deleted) {
    return res.status(404).json({ error: 'List not found' })
  }

  res.status(204).send()
}
