import express from 'express'
import cors from 'cors'
import routes from './routes/routes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/lists', routes)

app.use((err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    res.status(400).json({
      type: err.type,
      message: err.error.toString(),
    })
  } else {
    next(err)
  }
})

export default app
