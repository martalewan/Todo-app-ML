let todos = [];
let nextId = 1;

export const getTodos = () => todos;

export const addTodo = (text) => {
  const newTodo = {
    id: nextId++,
    text,
    completed: false,
  };
  todos.push(newTodo);
  return newTodo;
};

export const deleteTodo = (id) => {
  todos = todos.filter((todo) => todo.id !== id);
};

export const updateTodo = (id, updates) => {
  const todo = todos.find((t) => t.id === id);
  if (!todo) return null;
  Object.assign(todo, updates);
  return todo;
};

export const resetTodos = () => {
  todos = [];
  nextId = 1;
};