import express from 'express'
import {
  getListsHandler,
  addListHandler,
  updateListHandler,
  deleteListHandler,
} from '../controllers/listsController.js'

const router = express.Router()

router.get('/', getListsHandler)
router.post('/', addListHandler)
router.put('/:listId', updateListHandler)
router.delete('/:listId', deleteListHandler)

export default router
