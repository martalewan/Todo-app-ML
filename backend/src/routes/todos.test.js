import request from 'supertest';
import app from '../app.js';
import { addTodoModel, getTodosModel, resetTodosModel } from '../models/todoModel.js';

beforeEach(() => {
  resetTodosModel();
});

describe('GET /todos', () => {
  it('should return a list of todos', async () => {
    addTodoModel('Todo 1');
    const response = await request(app).get('/todos');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(getTodosModel());
  });

  it('should return an empty list when there are no todos', async () => {
    resetTodosModel();
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