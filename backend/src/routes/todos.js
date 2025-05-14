import express from 'express'
import { listTodos, addTodo } from '../controllers/todosController.js'

const router = express.Router()

router.get('/', listTodos)
router.post('/', addTodo)

export default router
