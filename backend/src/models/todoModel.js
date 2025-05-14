let todos = [];
let nextId = 1;

export const getTodosModel = () => todos;

export const addTodoModel = (text) => {
  const newTodo = {
    id: nextId++,
    text,
    completed: false,
  };
  todos.push(newTodo);
  return newTodo;
};

export const deleteTodoModel = (id) => {
  todos = todos.filter((todo) => todo.id !== id);
};

export const updateTodoModel = (id, updates) => {
  const todo = todos.find((t) => t.id === id);
  if (!todo) return null;
  Object.assign(todo, updates);
  return todo;
};

export const resetTodosModel = () => {
  todos = [];
  nextId = 1;
};