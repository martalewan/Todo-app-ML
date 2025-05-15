import request from 'supertest'
import app from '../app.js'

const api = request(app)

const addListHandler = async (title = 'Test List') => {
  const response = await api.post('/lists').send({ title })
  return response.body
}

const createTodo = async (listId, text) => {
  const response = await api.post(`/lists/${listId}/todos`).send({ text })
  return response.body
}

describe('GET /lists/:listId/todos', () => {
  it('should return a list of todos in the list', async () => {
    const list = await addListHandler()
    await createTodo(list.id, 'Todo 1')

    const response = await api.get(`/lists/${list.id}/todos`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual([{ id: 1, text: 'Todo 1', completed: false }])
  })

  it('should return 404 for non-existing list', async () => {
    const response = await api.get('/lists/999/todos')
    expect(response.statusCode).toBe(404)
  })
})

describe('POST /lists/:listId/todos', () => {
  it('should add a new todo to the list', async () => {
    const list = await addListHandler()
    const newTodo = { text: 'New Todo' }
    const response = await api.post(`/lists/${list.id}/todos`).send(newTodo)

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      id: 1,
      text: 'New Todo',
      completed: false,
    })
  })

  it('should return 400 if no text is provided', async () => {
    const list = await addListHandler()
    const response = await api.post(`/lists/${list.id}/todos`).send({})
    expect(response.statusCode).toBe(400)
  })

  it('should return 404 if list not found', async () => {
    const response = await api.post('/lists/999/todos').send({ text: 'Test' })
    expect(response.statusCode).toBe(404)
  })
})

describe('DELETE /lists/:listId/todos/:todoId', () => {
  it('should delete a todo from the list', async () => {
    const list = await addListHandler()
    const todo = await createTodo(list.id, 'Todo to delete')

    const deleteResponse = await api.delete(`/lists/${list.id}/todos/${todo.id}`)
    expect(deleteResponse.statusCode).toBe(204)

    const todosResponse = await api.get(`/lists/${list.id}/todos`)
    expect(todosResponse.body).toEqual([])
  })

  it('should return 404 if todo not found', async () => {
    const list = await addListHandler()
    const response = await api.delete(`/lists/${list.id}/todos/999`)
    expect(response.statusCode).toBe(404)
  })

  it('should return 400 if invalid IDs', async () => {
    const response = await api.delete('/lists/abc/todos/xyz')
    expect(response.statusCode).toBe(400)
  })
})

describe('PUT /lists/:listId/todos/:todoId', () => {
  it('should update a todo in the list', async () => {
    const list = await addListHandler()
    const todo = await createTodo(list.id, 'Todo to update')

    const updateResponse = await api
      .put(`/lists/${list.id}/todos/${todo.id}`)
      .send({ text: 'Updated Todo', completed: true })

    expect(updateResponse.statusCode).toBe(200)
    expect(updateResponse.body).toEqual({
      id: todo.id,
      text: 'Updated Todo',
      completed: true,
    })
  })

  it('should return 404 if todo not found', async () => {
    const list = await addListHandler()
    const response = await api.put(`/lists/${list.id}/todos/999`).send({ text: 'Updated' })
    expect(response.statusCode).toBe(404)
  })

  it('should return 400 if invalid IDs', async () => {
    const response = await api.put('/lists/abc/todos/xyz').send({ text: 'Updated' })
    expect(response.statusCode).toBe(400)
  })
})
