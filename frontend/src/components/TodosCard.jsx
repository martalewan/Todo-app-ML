import { useState, useEffect } from 'react'
import {
  TextField,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
  Checkbox,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { fetchTodos, addTodo, deleteTodo, updateTodo } from '../api/todos'

export const TodosCard = ({ activeList }) => {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    handleAddTodo()
  }

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

  const handleDeleteTodo = async (todoId) => {
    try {
      await deleteTodo(activeList.id, todoId)
      setTodos((prev) => prev.filter((todo) => todo.id !== todoId))
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  const handleUpdateTodo = async (todoId, updates) => {
    try {
      await updateTodo(activeList.id, todoId, updates)
      setTodos((prev) => prev.map((todo) => (todo.id === todoId ? { ...todo, ...updates } : todo)))
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  const handleKeyDown = (e, todo) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleUpdateTodo(todo.id, { text: e.target.value })
      e.target.blur()
    }
  }

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{activeList.title}</Typography>
        <Box
          component='form'
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 2 }}
        >
          {todos &&
            todos.map((todo, index) => (
              <Box key={todo.id} style={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ margin: '8px' }} variant='h6'>
                  {index + 1}
                </Typography>
                <TextField
                  sx={{ flexGrow: 1, marginTop: '1rem' }}
                  label='What to do?'
                  defaultValue={todo.text}
                  onBlur={(e) => handleUpdateTodo(todo.id, { text: e.target.value })}
                  onKeyDown={(e) => handleKeyDown(e, todo)}
                />
                <Button
                  sx={{ margin: '8px' }}
                  size='small'
                  color='secondary'
                  onClick={() => {
                    handleDeleteTodo(todo.id)
                  }}
                >
                  <DeleteIcon />
                </Button>
                <Checkbox
                  checked={todo.completed}
                  onChange={() => handleUpdateTodo(todo.id, { completed: !todo.completed })}
                />
              </Box>
            ))}

          <CardActions>
            {newTodo !== null ? (
              <TextField
                sx={{ flexGrow: 1, marginTop: '1rem' }}
                label='What to do?'
                value={newTodo}
                onChange={(event) => {
                  setNewTodo(event.target.value)
                }}
              />
            ) : (
              <Button
                type='button'
                color='primary'
                onClick={() => {
                  setNewTodo('')
                }}
              >
                Add Todo <AddIcon />
              </Button>
            )}
            <Button
              type='submit'
              variant='contained'
              color='primary'
              disabled={!newTodo || !newTodo.trim()}
            >
              Add
            </Button>
          </CardActions>
        </Box>
      </CardContent>
    </Card>
  )
}
