import axios from 'axios'
const BASE_URL = 'http://localhost:3001'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

/* LISTS */
export const fetchLists = () => apiClient.get('/lists')
export const addList = (title) => apiClient.post('/lists', { title })
export const updateList = (listId, updates) => apiClient.put(`/lists/${listId}`, updates)
export const deleteList = (listId) => apiClient.delete(`/lists/${listId}`)

/* TODOS */
export const fetchTodos = (listId) => apiClient.get(`/lists/${listId}/todos`)
export const addTodo = (listId, text) => apiClient.post(`/lists/${listId}/todos`, { text })
export const updateTodo = (listId, todoId, updates) =>
  apiClient.put(`/lists/${listId}/todos/${todoId}`, updates)
export const deleteTodo = (listId, todoId) => apiClient.delete(`/lists/${listId}/todos/${todoId}`)
