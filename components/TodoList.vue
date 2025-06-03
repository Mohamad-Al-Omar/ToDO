<template>
  <div class="max-w-2xl mx-auto p-4">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold">Todo List</h2>
          <UBadge v-if="todos.length" color="primary" variant="subtle">
            {{ todos.filter(t => !t.completed).length }} remaining
          </UBadge>
        </div>
      </template>

      <!-- Add Todo Form -->
      <form @submit.prevent="handleSubmit" class="mb-6">
        <UInput
          v-model="newTodo"
          placeholder="Add a new todo..."
          class="w-full"
          size="lg"
        >
          <template #trailing>
            <UButton
              type="submit"
              color="primary"
              :disabled="!newTodo.trim()"
              size="lg"
            >
              Add
            </UButton>
          </template>
        </UInput>
      </form>

      <!-- Todo List -->
      <div class="space-y-2">
        <TransitionGroup name="list">
          <div 
            v-for="todo in todos" 
            :key="todo.id" 
            class="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <UCheckbox
              :model-value="todo.completed"
              @update:model-value="() => toggleTodo(todo.id)"
              color="primary"
            />
            <span 
              class="flex-1"
              :class="{ 'line-through text-gray-500': todo.completed }"
            >
              {{ todo.text }}
            </span>
            <div class="flex items-center gap-2">
              <UBadge
                v-if="todo.completed"
                color="success"
                variant="subtle"
                size="sm"
              >
                Done
              </UBadge>
              <UButton
                color="error"
                variant="ghost"
                icon="i-heroicons-trash"
                size="sm"
                @click="() => deleteTodo(todo.id)"
              />
            </div>
          </div>
        </TransitionGroup>
      </div>

      <!-- Empty State -->
      <div v-if="todos.length === 0" class="text-center py-8">
        <UIcon name="i-heroicons-clipboard-document-list" class="w-12 h-12 text-gray-400 mb-4" />
        <p class="text-gray-500">No todos yet. Add one above!</p>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTodos } from '~/composables/useTodos'

const { todos, addTodo, toggleTodo, deleteTodo } = useTodos()
const newTodo = ref('')

const handleSubmit = () => {
  if (newTodo.value.trim()) {
    addTodo(newTodo.value.trim())
    newTodo.value = ''
  }
}
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style> 