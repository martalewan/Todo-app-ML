import express from 'express'
import { getLists, createList, updateList, deleteList } from '../handlers/listsHandlers.js'

const router = express.Router()

router.get('/', getLists)
router.post('/', createList)
router.put('/:listId', updateList)
router.delete('/:listId', deleteList)

export default router
