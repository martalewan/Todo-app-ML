import { Typography, TextField, Button, Checkbox, Box } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { deleteTodo, updateTodo } from '../../api/todos'

export const TodoItem = ({ index, activeListId, todo, onSetTodos }) => {
  const handleKeyDown = (e, todo) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleUpdateTodo(todo.id, { text: e.target.value })
      e.target.blur()
    }
  }

  const handleDeleteTodo = async (todoId) => {
    try {
      await deleteTodo(activeListId, todoId)
      onSetTodos((prev) => prev.filter((todo) => todo.id !== todoId))
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  const handleUpdateTodo = async (todoId, updates) => {
    try {
      await updateTodo(activeListId, todoId, updates)
      onSetTodos((prev) =>
        prev.map((todo) => (todo.id === todoId ? { ...todo, ...updates } : todo)),
      )
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  return (
    <Box
      key={todo.id}
      sx={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant='h6'>{index + 1}</Typography>
      <TextField
        size='small'
        sx={{ flexGrow: 1 }}
        label='What to do?'
        defaultValue={todo.text}
        onBlur={(e) => handleUpdateTodo(todo.id, { text: e.target.value })}
        onKeyDown={(e) => handleKeyDown(e, todo)}
        disabled={todo.completed}
        InputProps={{
          style: todo.completed ? { textDecoration: 'line-through', color: '#888' } : {},
        }}
      />
      <Button
        size='small'
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
  )
}
