import { useState, useEffect } from 'react'
import { Card, CardContent, CardActions, Typography, Box, CardHeader } from '@mui/material'
import { fetchTodos, addTodo } from '../../api/todos'
import { TodoItem } from '../TodoItem/TodoItem'
import { AddNewItem } from '../AddNewItem/AddNewItem'

export const TodosCard = ({ style, activeList }) => {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState(null)

  useEffect(() => {
    const loadTodos = async () => {
      if (!activeList?.id) return
      try {
        const response = await fetchTodos(activeList.id)
        setTodos(response.data.data)
      } catch (error) {
        console.error('Error fetching todos:', error)
      }
    }
    loadTodos()
  }, [activeList])

  const handleSubmit = (event) => {
    event.preventDefault()
    handleAddTodo()
  }

  const handleAddTodo = async () => {
    if (newTodo && !newTodo.trim()) return
    try {
      const response = await addTodo(activeList.id, newTodo.trim())
      setTodos((prev) => [...prev, response.data.data])
      setNewTodo('')
    } catch (error) {
      console.error('Error adding todo:', error)
    }
  }
  return (
    <Card
      style={style}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100% - 2rem)',
        margin: '1rem',
        flexGrow: 2,
      }}
    >
      <CardHeader
        title={
          <Typography component='h2' fontWeight='bold'>
            {activeList.title}
          </Typography>
        }
      />
      <CardContent
        sx={{
          flex: 1,
          overflowY: 'auto',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 2 }}>
          {todos &&
            todos.map((todo, index) => (
              <TodoItem
                key={todo.id || index}
                index={index}
                activeListId={activeList.id}
                todo={todo}
                onSetTodos={(value) => setTodos(value)}
              />
            ))}
        </Box>
      </CardContent>

      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <AddNewItem
          type={'todo'}
          value={newTodo}
          onChange={(value) => setNewTodo(value)}
          onSubmit={handleSubmit}
        />
      </CardActions>
    </Card>
  )
}
