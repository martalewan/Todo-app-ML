import express from 'express'
import {
  getTodosHandler,
  addTodoHandler,
  deleteTodoHandler,
  updateTodoHandler,
} from '../controllers/todosController.js'

const router = express.Router({ mergeParams: true })

router.get('/', getTodosHandler)
router.post('/', addTodoHandler)
router.put('/:todoId', updateTodoHandler)
router.delete('/:todoId', deleteTodoHandler)

export default router
