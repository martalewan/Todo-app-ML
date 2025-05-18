import {
  getLists,
  createList,
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  clearData,
} from './listsService.js'

beforeEach(() => {
  clearData()
})

test('addList creates a new list', () => {
  const list = createList('Buy sunglasses')
  expect(list).toMatchObject({ id: 1, title: 'Buy sunglasses' })
  expect(getLists()).toHaveLength(1)
})

test('addTodo adds a todo to a list', () => {
  const list = createList('Tasks')
  const todo = createTodo(list.id, 'Sell shoes')
  expect(todo).toMatchObject({ id: 1, text: 'Sell shoes', completed: false })
  expect(getTodos(list.id)).toHaveLength(1)
})

test('updateTodo updates an existing todo', () => {
  const list = createList('Sports')
  const todo = createTodo(list.id, 'Run 5km')
  const updated = updateTodo(list.id, todo.id, { text: 'Tennis', completed: true })
  expect(updated).toMatchObject({ id: todo.id, text: 'Tennis', completed: true })
})

test('deleteTodo removes a todo from list', () => {
  const list = createList('Work')
  const todo = createTodo(list.id, 'Finish docs')
  const result = deleteTodo(list.id, todo.id)
  expect(result).toBe(true)
  expect(getTodos(list.id)).toHaveLength(0)
})

test('updateTodo returns null if todo not found', () => {
  const list = createList('Personal')
  const result = updateTodo(list.id, 2, { text: 'not existing text' })
  expect(result).toBeNull()
})

test('deleteTodo returns false if todo not found', () => {
  const list = createList('Other')
  const result = deleteTodo(list.id, 123)
  expect(result).toBe(false)
})
