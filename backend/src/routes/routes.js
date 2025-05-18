import express from 'express'
import { getLists, createList, updateList, deleteList } from '../handlers/listsHandlers.js'
import { getTodos, createTodo, updateTodo, deleteTodo } from '../handlers/todosHandlers.js'

const router = express.Router()

router.get('/', getLists)
router.post('/', createList)
router.put('/:listId', updateList)
router.delete('/:listId', deleteList)

router.get('/:listId/todos', getTodos)
router.post('/:listId/todos', createTodo)
router.put('/:listId/todos/:todoId', updateTodo)
router.delete('/:listId/todos/:todoId', deleteTodo)

export default router
