import {
  getLists,
  addList,
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  resetData,
} from './listsModel.js'

beforeEach(() => {
  resetData()
})

test('addList creates a new list', () => {
  const list = addList('Buy sunglasses')
  expect(list).toMatchObject({ id: 1, title: 'Buy sunglasses' })
  expect(getLists()).toHaveLength(1)
})

test('addTodo adds a todo to a list', () => {
  const list = addList('Tasks')
  const todo = addTodo(list.id, 'Sell shoes')
  expect(todo).toMatchObject({ id: 1, text: 'Sell shoes', completed: false })
  expect(getTodos(list.id)).toHaveLength(1)
})

test('updateTodo updates an existing todo', () => {
  const list = addList('Sports')
  const todo = addTodo(list.id, 'Run 5km')
  const updated = updateTodo(list.id, todo.id, { text: 'Tennis', completed: true })
  expect(updated).toMatchObject({ id: todo.id, text: 'Tennis', completed: true })
})

test('deleteTodo removes a todo from list', () => {
  const list = addList('Work')
  const todo = addTodo(list.id, 'Finish docs')
  const result = deleteTodo(list.id, todo.id)
  expect(result).toBe(true)
  expect(getTodos(list.id)).toHaveLength(0)
})

test('updateTodo returns null if todo not found', () => {
  const list = addList('Personal')
  const result = updateTodo(list.id, 2, { text: 'not existing text' })
  expect(result).toBeNull()
})

test('deleteTodo returns false if todo not found', () => {
  const list = addList('Other')
  const result = deleteTodo(list.id, 123)
  expect(result).toBe(false)
})
