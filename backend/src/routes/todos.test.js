import request from 'supertest';
import app from '../app.js';
import { resetTodosModel } from '../models/todoModel.js';

beforeEach(() => {
  resetTodosModel();
});

describe('GET /todos', () => {
    it('should return a list of todos', async () => {
    await request(app).post('/todos').send({ text: 'Todo 1' });
    const response = await request(app).get('/todos');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
      { id: 1, text: 'Todo 1', completed: false },
    ]);
  });

  it('should return an empty list when there are no todos', async () => {
    const response = await request(app).get('/todos');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });
});

describe('POST /todos', () => {
  it('should add a new todo', async () => {
    const newTodo = { text: 'New Todo' };
    const response = await request(app).post('/todos').send(newTodo);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      id: 1,
      text: 'New Todo',
      completed: false,
    });
  });

  it('should return 400 if no text is provided', async () => {
    const response = await request(app).post('/todos').send({});
    expect(response.statusCode).toBe(400);
  });
})

describe('DELETE /todos/:id', () => {
  it('should delete a todo', async () => {
    const createResponse = await request(app)
      .post('/todos')
      .send({ text: 'Todo to delete' });

    const newTodoId = createResponse.body.id;

    const deleteResponse = await request(app).delete(`/todos/${newTodoId}`);
    expect(deleteResponse.statusCode).toBe(204);

    const todos = (await request(app).get('/todos')).body;
    expect(todos).toEqual([]);
  });

  it('should return 404 if todo not found', async () => {
    const response = await request(app).delete('/todos/999');
    expect(response.statusCode).toBe(404);
  });

  it('should return 400 if id is not a number', async () => {
    const response = await request(app).delete('/todos/abc');
    expect(response.statusCode).toBe(400);
  });
});

describe('PUT /todos/:id', () => {
  it('should update a todo', async () => {
    const createResponse = await request(app)
      .post('/todos')
      .send({ text: 'Todo to update' });

    const newTodoId = createResponse.body.id;

    const updateResponse = await request(app)
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
    const response = await request(app).put('/todos/999').send({ text: 'Updated' });
    expect(response.statusCode).toBe(404);
  });

  it('should return 400 if id is not a number', async () => {
    const response = await request(app).put('/todos/abc').send({ text: 'Updated' });
    expect(response.statusCode).toBe(400);
  });
});