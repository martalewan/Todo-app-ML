let lists = [
  {
    id: 2,
    title: 'Work Tasks',
  },
  {
    id: 3,
    title: 'Personal Projects',
  },
  {
    id: 4,
    title: 'Chores',
  },
  {
    id: 5,
    title: 'Books to Read',
  },
]
const todosByListId = new Map()

/**
 * @returns {List[]}
 */
export const getLists = () => {
  return lists
}

/**
 * @param {string} title
 * @returns {List}
 */
export const createList = (title) => {
  const newList = {
    id: lists.length ? Math.max(...lists.map((l) => l.id)) + 1 : 1,
    title: title.trim(),
  }
  lists.push(newList)
  todosByListId.set(newList.id, [])
  return newList
}

/**
 * @param {number} id
 * @param {{ title?: string }} updates
 * @returns {List | null}
 */
export const updateList = (id, updates) => {
  const list = lists.find((l) => l.id === id)
  if (!list) return null
  if (typeof updates.title === 'string') {
    list.title = updates.title.trim()
  }
  return list
}

/**
 * @param {number} id
 * @returns {boolean}
 */
export const deleteList = (id) => {
  const initialLength = lists.length
  lists = lists.filter((l) => l.id !== id)
  todosByListId.delete(id)
  return lists.length !== initialLength
}

/**
 * @param {number} listId
 * @returns {Todo[]}
 */
export const getTodos = (listId) => {
  return todosByListId.get(listId) || []
}

/**
 * @param {number} listId
 * @param {string} text
 * @returns {Todo | null}
 */
export const createTodo = (listId, text) => {
  let todos = todosByListId.get(listId)

  if (!todos) {
    todos = []
    todosByListId.set(listId, todos)
  }
  const newTodo = {
    id: todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1,
    text: text.trim(),
    completed: false,
  }
  todos.push(newTodo)
  return newTodo
}

/**
 * @param {number} listId
 * @param {number} todoId
 * @param {{ text?: string, completed?: boolean }} updates
 * @returns {Todo | null}
 */
export const updateTodo = (listId, todoId, updates) => {
  const todos = todosByListId.get(listId)
  if (!todos) return null

  const todo = todos.find((t) => t.id === todoId)
  if (!todo) return null

  if (typeof updates.text === 'string') todo.text = updates.text.trim()
  if (typeof updates.completed === 'boolean') todo.completed = updates.completed
  return todo
}

/**
 * @param {number} listId
 * @param {number} todoId
 * @returns {boolean}
 */
export const deleteTodo = (listId, todoId) => {
  const todos = todosByListId.get(listId)
  if (!todos) return false

  const initialLength = todos.length
  const newTodos = todos.filter((t) => t.id !== todoId)
  if (newTodos.length === initialLength) return false

  todosByListId.set(listId, newTodos)
  return true
}

export const clearData = () => {
  lists = []
  todosByListId.clear()
}
