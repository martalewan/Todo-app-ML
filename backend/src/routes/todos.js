import express from 'express'
import { getTodos, createTodo, deleteTodo, updateTodo } from '../handlers/todosHandlers.js'

const router = express.Router({ mergeParams: true })

router.get('/', getTodos)
router.post('/', createTodo)
router.put('/:todoId', updateTodo)
router.delete('/:todoId', deleteTodo)

export default router
