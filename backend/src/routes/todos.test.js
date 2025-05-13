import request from 'supertest';
import app from '../app.js';
import { addTodo, getTodos, resetTodos } from '../models/todoModel.js';

beforeEach(() => {
  resetTodos();
  addTodo('Todo 1');
  addTodo('Todo 2');
});

describe('GET /todos', () => {
  it('should return a list of todos', async () => {
    const response = await request(app).get('/todos');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(getTodos());
  });
  it('should return an empty list when there are no todos', async () => {
    resetTodos();
    const response = await request(app).get('/todos');
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });
});
