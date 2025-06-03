import { ref, watch } from 'vue'
import type { Todo } from '~/types/todo'

export const useTodos = () => {
  const todos = ref<Todo[]>([])
  const STORAGE_KEY = 'todos'

  // Load todos from localStorage on init
  const loadTodos = () => {
    if (import.meta.client) {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        todos.value = JSON.parse(stored)
      }
    }
  }

  // Save todos to localStorage whenever they change
  watch(todos, (newTodos) => {
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos))
    }
  }, { deep: true })

  // Add new todo
  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date().toISOString()
    }
    todos.value.push(newTodo)
  }

  // Toggle todo completion
  const toggleTodo = (id: string) => {
    const todo = todos.value.find(t => t.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  }

  // Delete todo
  const deleteTodo = (id: string) => {
    todos.value = todos.value.filter(t => t.id !== id)
  }

  // Initialize
  loadTodos()

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo
  }
} 