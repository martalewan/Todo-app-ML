import { useState, useEffect } from 'react'
import { TodosCard } from '../TodosCard/TodosCard'
import { fetchLists, deleteList } from '../../api/todos'
import { ListsCard } from '../ListsCard/ListsCard'
import { Box } from '@mui/material'

export const TodoManager = ({ style }) => {
  const [lists, setLists] = useState([])
  const [activeList, setActiveList] = useState(null)

  useEffect(() => {
    const loadLists = async () => {
      try {
        const response = await fetchLists()
        setLists(response.data.data)
      } catch (error) {
        console.error('Error fetching lists:', error)
      }
    }
    loadLists()
  }, [])

  const handleDeleteList = async (listId) => {
    try {
      await deleteList(listId)
      setLists((prev) => prev.filter((list) => list.id !== listId))

      if (activeList?.id === listId) {
        setActiveList(null)
      }
    } catch (error) {
      console.error('Error deleting list:', error)
    }
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        maxWidth: 1200,
      }}
    >
      <ListsCard
        style={style}
        lists={lists}
        onListClicked={(id) => {
          setActiveList(lists.find((list) => list.id === id))
        }}
        onListAdded={(newList) => {
          setLists((prev) => [...prev, newList])
        }}
        handleDeleteList={handleDeleteList}
        activeListId={activeList?.id}
      />
      {activeList && <TodosCard style={style} activeList={activeList} />}
    </Box>
  )
}
