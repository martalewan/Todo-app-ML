import request from 'supertest';
import app from '../app.js';
import { resetTodosModel } from '../models/todoModel.js';

beforeEach(() => {
  resetTodosModel();
});

const api = request(app);
const createTodo = async (text) => {
  const response = await api.post('/todos').send({ text });
  return response.body;
};

describe('GET /todos', () => {
    it('should return a list of todos', async () => {
    await createTodo('Todo 1');
    const response = await api.get('/todos');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
      { id: 1, text: 'Todo 1', completed: false },
    ]);
  });

  it('should return an empty list when there are no todos', async () => {
    const response = await api.get('/todos');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });
});

describe('POST /todos', () => {
  it('should add a new todo', async () => {
    const newTodo = { text: 'New Todo' };
    const response = await api.post('/todos').send(newTodo);
    
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      id: 1,
      text: 'New Todo',
      completed: false,
    });
  });

  it('should return 400 if no text is provided', async () => {
    const response = await api.post('/todos').send({});
    expect(response.statusCode).toBe(400);
  });
})

describe('DELETE /todos/:id', () => {
  it('should delete a todo', async () => {
    const createdTodo = await createTodo('Todo to delete');
    const newTodoId = createdTodo.id;

    const deleteResponse = await api.delete(`/todos/${newTodoId}`);
    expect(deleteResponse.statusCode).toBe(204);

    const todos = (await api.get('/todos')).body;
    expect(todos).toEqual([]);
  });

  it('should return 404 if todo not found', async () => {
    const response = await api.delete('/todos/999');
    expect(response.statusCode).toBe(404);
  });

  it('should return 400 if id is not a number', async () => {
    const response = await api.delete('/todos/abc');
    expect(response.statusCode).toBe(400);
  });
});

describe('PUT /todos/:id', () => {
  it('should update a todo', async () => {
    const createdTodo = await createTodo('Todo to update');
    const newTodoId = createdTodo.id;

    const updateResponse = await api
      .put(`/todos/${newTodoId}`)
      .send({ text: 'Updated Todo', completed: true });

    expect(updateResponse.statusCode).toBe(200);
    expect(updateResponse.body).toEqual({
      id: newTodoId,
      text: 'Updated Todo',
      completed: true,
    });
  });

  it('should return 404 if todo not found', async () => {
    const response = await api.put('/todos/999').send({ text: 'Updated' });
    expect(response.statusCode).toBe(404);
  });

  it('should return 400 if id is not a number', async () => {
    const response = await api.put('/todos/abc').send({ text: 'Updated' });
    expect(response.statusCode).toBe(400);
  });
});