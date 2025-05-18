import { TextField, Button, Box } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

export const AddNewItem = ({ type, value, onChange, onSubmit }) => {
  return (
    <Box
      component='form'
      onSubmit={onSubmit}
      sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
    >
      {typeof value === 'string' ? (
        <TextField
          size='small'
          label='Add new'
          value={value}
          onChange={(event) => {
            onChange(event.target.value)
          }}
          onBlur={() => {
            if (!value.trim()) {
              onChange(null)
            }
          }}
        />
      ) : (
        <Button
          type='button'
          color='primary'
          variant='outlined'
          onClick={() => {
            onChange('')
          }}
        >
          Add new {type}
          <AddIcon />
        </Button>
      )}
      <Button type='submit' variant='contained' color='primary' disabled={!value || !value.trim()}>
        Add {type}
      </Button>
    </Box>
  )
}
