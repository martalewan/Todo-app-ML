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

test('should create a new list', () => {
  const list = createList('Buy sunglasses')
  expect(list).toMatchObject({ title: 'Buy sunglasses' })
  expect(list.id).toEqual(expect.any(String)) // UUID
  expect(getLists()).toHaveLength(1)
})

test('should create a todo', () => {
  const list = createList('Temp List')
  const todo = createTodo(list.id, 'Sell shoes')

  expect(todo).toMatchObject({
    listId: list.id,
    text: 'Sell shoes',
    completed: false,
  })
  expect(todo.id).toEqual(expect.any(String)) // UUID
  expect(getTodos(list.id)).toHaveLength(1)
})

test('should update an existing todo', () => {
  const list = createList('Work Tasks')
  const todo = createTodo(list.id, 'Run 5km')

  const updated = updateTodo(todo.id, {
    text: 'Tennis',
    completed: true,
  })

  expect(updated).toMatchObject({
    listId: list.id,
    id: todo.id,
    text: 'Tennis',
    completed: true,
  })
})

test('should delete a todo', () => {
  const list = createList('Work')
  const todo = createTodo(list.id, 'Finish docs')

  const result = deleteTodo(todo.id)

  expect(result).toBe(true)
  expect(getTodos(list.id)).toHaveLength(0)
})

test('should return null if todo not found', () => {
  const result = updateTodo('00000000-0000-0000-0000-000000000000', {
    text: 'Not existing text',
  })
  expect(result).toBeNull()
})

test('should return false if todo not found', () => {
  const result = deleteTodo('00000000-0000-0000-0000-000000000000')
  expect(result).toBe(false)
})
