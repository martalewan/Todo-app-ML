import { Fragment, useState, useEffect } from 'react'
import { TodosCard } from '../TodosCard/TodosCard'
import { fetchLists } from '../../api/todos'
import { ListsCard } from '../ListsCard/ListsCard'

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

  return (
    <Fragment>
      <ListsCard
        style={style}
        lists={lists}
        onListClicked={(id) => {
          setActiveList(lists.find((list) => list.id === id))
        }}
        onListAdded={(newList) => {
          setLists((prev) => [...prev, newList])
        }}
        activeListId={activeList?.id}
      />
      {activeList && <TodosCard style={style} activeList={activeList} />}
    </Fragment>
  )
}
