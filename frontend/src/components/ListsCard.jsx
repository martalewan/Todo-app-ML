import {
  Card,
  CardContent,
  CardActions,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  Button,
  TextField,
} from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { addList } from '../api/todos'

const ListsCard = ({ style, lists, setLists, setActiveList }) => {
  const [newListName, setNewListName] = useState(null)

  const handleCreateList = async () => {
    if (newListName && !newListName.trim()) return
    try {
      const response = await addList(newListName.trim())
      setLists((prev) => [...prev, response.data.data])
      setNewListName('')
    } catch (error) {
      console.error('Error adding todo:', error)
    }
  }

  return (
    <Card style={style}>
      <CardContent>
        <Typography component='h2'>My Todo Lists</Typography>
        <List>
          {lists.map((list) => (
            <ListItemButton key={list.id} onClick={() => setActiveList(list)}>
              <ListItemIcon>
                <ReceiptIcon />
              </ListItemIcon>
              <ListItemText primary={list.title} />
            </ListItemButton>
          ))}
        </List>

        <CardActions>
          {newListName !== null ? (
            <TextField
              size='small'
              sx={{ flexGrow: 1, marginTop: '1rem' }}
              label='New list name?'
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              fullWidth
              onBlur={() => {
                if (!newListName) {
                  setNewListName(null)
                }
              }}
            />
          ) : (
            <Button
              type='button'
              color='primary'
              onClick={() => {
                setNewListName('')
              }}
            >
              Add List <AddIcon />
            </Button>
          )}

          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              handleCreateList(newListName)
              setNewListName('')
            }}
            disabled={!newListName}
          >
            Add
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  )
}

export default ListsCard
