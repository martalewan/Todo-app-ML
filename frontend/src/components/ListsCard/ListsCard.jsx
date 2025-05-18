import {
  Card,
  CardContent,
  CardActions,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { useState } from 'react'
import { addList } from '../../api/todos'
import { AddNewItem } from '../AddNewItem/AddNewItem'

export const ListsCard = ({ style, lists, onListAdded, onListClicked, activeListId }) => {
  const [newListName, setNewListName] = useState(null)

  const handleCreateList = async () => {
    if (newListName && !newListName.trim()) return
    try {
      const response = await addList(newListName.trim())
      onListAdded(response.data.data)
      setNewListName('')
    } catch (error) {
      console.error('Error adding todo:', error)
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    handleCreateList()
  }

  return (
    <Card style={style}>
      <CardContent>
        <Typography component='h2' fontWeight='bold'>
          My Todo Lists
        </Typography>
        <List>
          {lists.map((list) => {
            const isActive = activeListId === list.id
            return (
              <ListItemButton
                key={list.id}
                onClick={() => onListClicked(list.id)}
                selected={isActive}
                sx={{
                  backgroundColor: activeListId === list.id ? 'rgba(0, 0, 0, 0.08)' : 'inherit',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.08)',
                  },
                }}
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={list.title} />
              </ListItemButton>
            )
          })}
        </List>

        <CardActions>
          <AddNewItem
            type='list'
            value={newListName}
            onChange={(value) => {
              setNewListName(value)
            }}
            onSubmit={handleSubmit}
          />
        </CardActions>
      </CardContent>
    </Card>
  )
}
