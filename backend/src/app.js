import express from 'express'
import cors from 'cors'
import todosRouter from './routes/todos.js'
import listsRouter from './routes/lists.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/lists', listsRouter)
app.use('/lists/:listId/todos', todosRouter)

export default app
