import express from 'express'
import { listTodos } from '../controllers/todosController.js'

const router = express.Router()

router.get('/', listTodos)

export default router
