import { v4 as uuidv4 } from 'uuid'

const initialState = [
  {
    id: uuidv4(),
    title: 'Work Tasks',
  },
  {
    id: uuidv4(),
    title: 'Personal Projects',
  },
  {
    id: uuidv4(),
    title: 'Chores',
  },
]
const db = {
  lists: [...initialState],
  todos: [],
}

export const getLists = () => {
  return db.lists
}

export const createList = (title) => {
  const newList = {
    id: uuidv4(),
    title: title,
  }
  db.lists.push(newList)
  return newList
}

export const updateList = (id, updates) => {
  const list = db.lists.find((l) => l.id === id)
  if (!list) return null
  list.title = updates.title
  return list
}

export const deleteList = (id) => {
  const initialLength = db.lists.length
  db.lists = db.lists.filter((l) => l.id !== id)
  db.todos = db.todos.filter((l) => l.listId !== id)
  return db.lists.length !== initialLength
}

export const getTodos = (listId) => {
  return db.todos.filter((t) => t.listId === listId)
}

export const createTodo = (listId, text) => {
  const newTodo = {
    listId,
    id: uuidv4(),
    text: text,
    completed: false,
  }
  db.todos.push(newTodo)
  return newTodo
}

export const updateTodo = (todoId, updates) => {
  const todo = db.todos.find((t) => t.id === todoId)
  if (!todo) return null

  if (typeof updates.text === 'string') todo.text = updates.text.trim()
  if (typeof updates.completed === 'boolean') todo.completed = updates.completed
  return todo
}

export const deleteTodo = (todoId) => {
  const initialLength = db.todos.length
  db.todos = db.todos.filter((t) => t.id !== todoId)
  return db.todos.length !== initialLength
}

export const clearData = () => {
  db.lists = []
  db.todos = []
}
