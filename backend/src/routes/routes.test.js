import request from 'supertest'
import app from '../app.js'

const api = request(app)

const createList = async (title = 'Test List') => {
  const response = await api.post('/lists').send({ title })
  return response.body.data
}

const createTodo = async (listId, text) => {
  const response = await api.post(`/lists/${listId}/todos`).send({ text })
  return response.body.data
}

describe('GET /lists/:listId/todos', () => {
  it('should return a list of todos in the list', async () => {
    const list = await createList()
    await createTodo(list.id, 'Todo 1')

    const response = await api.get(`/lists/${list.id}/todos`)
    expect(response.statusCode).toBe(200)
    expect(response.body.data).toEqual([
      {
        listId: list.id,
        id: expect.any(String),
        text: 'Todo 1',
        completed: false,
      },
    ])
  })

  it('should return 404 for non-existing list', async () => {
    const response = await api.get('/lists/00000000-0000-0000-0000-000000000000/todos')
    expect(response.statusCode).toBe(404)
  })
})

describe('POST /lists/:listId/todos', () => {
  it('should add a new todo to the list', async () => {
    const list = await createList()
    const newTodo = { text: 'New Todo' }
    const response = await api.post(`/lists/${list.id}/todos`).send(newTodo)

    expect(response.statusCode).toBe(201)
    expect(response.body.data).toEqual({
      listId: list.id,
      id: expect.any(String),
      text: 'New Todo',
      completed: false,
    })
  })

  it('should return 400 if no text is provided', async () => {
    const list = await createList()
    const response = await api.post(`/lists/${list.id}/todos`).send({})
    expect(response.statusCode).toBe(400)
  })

  it('should return 404 if list not found', async () => {
    const response = await api
      .post('/lists/00000000-0000-0000-0000-000000000000/todos')
      .send({ text: 'Test' })
    expect(response.statusCode).toBe(404)
  })
})

describe('DELETE /lists/:listId/todos/:todoId', () => {
  it('should delete a todo from the list', async () => {
    const list = await createList()
    const todo = await createTodo(list.id, 'Todo to delete')

    const deleteResponse = await api.delete(`/lists/${list.id}/todos/${todo.id}`)
    expect(deleteResponse.statusCode).toBe(204)

    const todosResponse = await api.get(`/lists/${list.id}/todos`)
    expect(todosResponse.body.data).toEqual([])
  })

  it('should return 404 if todo not found', async () => {
    const list = await createList()
    const response = await api.delete(
      `/lists/${list.id}/todos/00000000-0000-0000-0000-000000000000`,
    )
    expect(response.statusCode).toBe(404)
  })

  it('should return 400 if invalid IDs', async () => {
    const response = await api.delete('/lists/not-a-uuid/todos/not-a-uuid')
    expect(response.statusCode).toBe(400)
  })
})

describe('PUT /lists/:listId/todos/:todoId', () => {
  it('should update a todo in the list', async () => {
    const list = await createList()
    const todo = await createTodo(list.id, 'Todo to update')

    const updateResponse = await api
      .put(`/lists/${list.id}/todos/${todo.id}`)
      .send({ text: 'Updated Todo', completed: true })

    expect(updateResponse.statusCode).toBe(200)
    expect(updateResponse.body.data).toEqual({
      listId: list.id,
      id: todo.id,
      text: 'Updated Todo',
      completed: true,
    })
  })

  it('should return 404 if todo not found', async () => {
    const list = await createList()
    const response = await api
      .put(`/lists/${list.id}/todos/00000000-0000-0000-0000-000000000000`)
      .send({ text: 'Updated' })
    expect(response.statusCode).toBe(404)
  })

  it('should return 400 if invalid IDs', async () => {
    const response = await api.put('/lists/not-a-uuid/todos/not-a-uuid').send({ text: 'Updated' })
    expect(response.statusCode).toBe(400)
  })
})
