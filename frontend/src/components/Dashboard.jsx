import { Fragment, useState, useEffect } from 'react'
import { TodosCard } from './TodosCard'
import { fetchLists } from '../api/todos'
import ListsCard from './ListsCard'

export const Dashboard = ({ style }) => {
  const [lists, setLists] = useState([])
  const [activeList, setActiveList] = useState()

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

  if (!Object.keys(lists).length) return null
  return (
    <Fragment>
      <ListsCard style={style} lists={lists} setActiveList={setActiveList} setLists={setLists} />

      {activeList && <TodosCard activeList={activeList} />}
    </Fragment>
  )
}
