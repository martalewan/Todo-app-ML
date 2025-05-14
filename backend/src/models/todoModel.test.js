import mockFS from 'mock-fs'
import {
  getTodosModel,
  addTodoModel,
  deleteTodoModel,
  updateTodoModel,
  resetTodosModel,
} from './todoModel.js'

beforeEach(() => {
  mockFS({
    'data/todos.json': JSON.stringify([]),
  })

  resetTodosModel()
})

afterEach(() => {
  mockFS.restore()
})

test('addTodoModel adds a todo', () => {
  const todo = addTodoModel('Test')
  expect(todo).toMatchObject({ id: 1, text: 'Test', completed: false })
  expect(getTodosModel()).toHaveLength(1)
})

test('deleteTodoModel removes a todo', () => {
  const todo = addTodoModel('To delete')
  deleteTodoModel(todo.id)
  expect(getTodosModel()).toHaveLength(0)
})

test('updateTodoModel updates a todo', () => {
  const todo = addTodoModel('To update')
  const updated = updateTodoModel(todo.id, { text: 'Updated', completed: true })
  expect(updated).toMatchObject({ id: todo.id, text: 'Updated', completed: true })
})

test('updateTodoModel returns null for missing id', () => {
  expect(updateTodoModel(999, { text: 'Nope' })).toBeNull()
})

test('resetTodosModel clears all todos and resets id', () => {
  addTodoModel('A')
  resetTodosModel()
  expect(getTodosModel()).toEqual([])
  const todo = addTodoModel('B')
  expect(todo.id).toBe(1)
})
