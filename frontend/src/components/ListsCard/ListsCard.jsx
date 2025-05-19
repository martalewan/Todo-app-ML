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
  Box,
  CardHeader,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { useState } from 'react'
import { addList } from '../../api/todos'
import { AddNewItem } from '../AddNewItem/AddNewItem'

export const ListsCard = ({
  style,
  lists,
  onListAdded,
  onListClicked,
  activeListId,
  handleDeleteList,
}) => {
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
    <Card
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100% - 2rem)',
        maxWidth: '30%',
        margin: '1rem',
      }}
    >
      <CardHeader
        title={
          <Typography component='h2' fontWeight='bold'>
            My Todo Lists
          </Typography>
        }
      />

      <CardContent
        sx={{
          overflowY: 'auto',
          p: 0,
        }}
      >
        <List>
          {lists.map((list) => {
            const isActive = activeListId === list.id
            return (
              <Box key={list.id} display={'flex'} alignItems='center'>
                <ListItemButton
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
                <Button
                  size='small'
                  onClick={() => {
                    handleDeleteList(list.id)
                  }}
                >
                  <DeleteIcon />
                </Button>
              </Box>
            )
          })}
        </List>
      </CardContent>

      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <AddNewItem
          type='list'
          value={newListName}
          onChange={(value) => {
            setNewListName(value)
          }}
          onSubmit={handleSubmit}
        />
      </CardActions>
    </Card>
  )
}
