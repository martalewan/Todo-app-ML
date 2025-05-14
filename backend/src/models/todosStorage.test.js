import { jest } from '@jest/globals'
import fs from 'fs'
import { loadTodos, saveTodos } from './todosStorage.js'

jest.mock('fs')

const fakePath = expect.any(String)

beforeEach(() => {
  jest.clearAllMocks()
  fs.readFileSync = jest.fn()
  fs.writeFileSync = jest.fn()
})

test('loadTodos returns parsed data from file', () => {
  fs.readFileSync.mockReturnValueOnce('[{"id":1,"text":"A","completed":false}]')
  const todos = loadTodos()
  expect(fs.readFileSync).toHaveBeenCalledWith(fakePath, 'utf-8')
  expect(todos).toEqual([{ id: 1, text: 'A', completed: false }])
})

test('loadTodos returns empty array if file read fails', () => {
  fs.readFileSync.mockImplementationOnce(() => {
    throw new Error('fail')
  })
  const todos = loadTodos()
  expect(todos).toEqual([])
})

test('saveTodos writes data to file', () => {
  const todos = [{ id: 2, text: 'B', completed: true }]
  saveTodos(todos)
  expect(fs.writeFileSync).toHaveBeenCalledWith(fakePath, JSON.stringify(todos, null, 2), 'utf-8')
})
