import express from 'express'
import { createValidator } from 'express-joi-validation'
import { getLists, createList, updateList, deleteList } from '../handlers/listsHandlers.js'
import { getTodos, createTodo, updateTodo, deleteTodo } from '../handlers/todosHandlers.js'
import { createListSchema, updateListSchema, listIdSchema } from '../schemas/listsSchemas.js'
import { createTodoSchema, updateTodoSchema, todoIdSchema } from '../schemas/todosSchemas.js'

const router = express.Router()
const validator = createValidator({
  passError: true,
})

// Lists
router.get('/', getLists)
router.post('/', validator.body(createListSchema), createList)
router.put('/:listId', validator.params(listIdSchema), validator.body(updateListSchema), updateList)
router.delete('/:listId', validator.params(listIdSchema), deleteList)

// Todos
router.get('/:listId/todos', validator.params(listIdSchema), getTodos)
router.post(
  '/:listId/todos',
  validator.params(listIdSchema),
  validator.body(createTodoSchema),
  createTodo,
)
router.put(
  '/:listId/todos/:todoId',
  validator.params(listIdSchema.concat(todoIdSchema)),
  validator.body(updateTodoSchema),
  updateTodo,
)
router.delete(
  '/:listId/todos/:todoId',
  validator.params(listIdSchema.concat(todoIdSchema)),
  deleteTodo,
)

export default router
