import express from 'express'
import { listTodos, addTodo, deleteTodo, updateTodo } from '../controllers/todosController.js'

const router = express.Router()

router.get('/', listTodos)
router.post('/', addTodo)
router.delete('/:id', deleteTodo)
router.put('/:id', updateTodo)

export default router
