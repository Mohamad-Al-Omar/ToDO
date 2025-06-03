<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="flex items-center justify-between px-8 py-4 border-b bg-white">
      <div class="flex items-center gap-2">
        <UIcon name="i-heroicons-rectangle-stack" class="w-6 h-6 text-black" />
        <span class="font-bold text-lg">TaskMaster</span>
      </div>
      <div class="flex items-center gap-3">
        <UInput
          icon="i-heroicons-magnifying-glass"
          placeholder="Search"
          class="w-64"
        />
        <UButton icon="i-heroicons-plus" color="primary" variant="soft"> </UButton>
        <UAvatar src="https://randomuser.me/api/portraits/women/44.jpg" size="md" />
      </div>
    </header>

    <UContainer class="py-10">
      <h1 class="text-3xl font-bold mb-6">My Tasks</h1>
      <UInput
        icon="i-heroicons-magnifying-glass"
        placeholder="Search tasks"
        class="mb-6 w-full"
        size="xl"
      />

      <!-- Tabs -->
      <UTabs
        v-model="tab"
        :items="tabs"
        class="mb-6"
        :ui="{ list: 'border-b', tab: 'px-4 py-2 font-medium' }"
      />

      <!-- Sort By -->
      <div class="mb-4">
        <span class="font-semibold mr-4">Sort By</span>
        <UButton
          v-for="sort in sorts"
          :key="sort"
          :color="sortBy === sort ? 'primary' : 'gray'"
          variant="soft"
          class="mr-2"
          @click="sortBy = sort"
        >
          {{ sort }}
        </UButton>
      </div>

      <!-- Task Table -->
      <UTable :columns="columns" :rows="filteredTasks" class="rounded-xl overflow-hidden" />
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTodos } from '~/composables/useTodos'

const { todos } = useTodos()

const tab = ref(0)
const tabs = [
  { label: 'All Tasks' },
  { label: 'Completed' },
  { label: 'Incomplete' }
]

const sortBy = ref('Due Date')
const sorts = ['Due Date', 'Priority']

const columns = [
  { key: 'text', label: 'Task', id: 'task' },
  { key: 'dueDate', label: 'Due Date', id: 'dueDate' },
  { key: 'completed', label: 'Status', id: 'status' }
]

// Example: Add dueDate and priority to todos for demo
const demoTasks = [
  { text: 'Grocery Shopping', dueDate: '2024-07-15', completed: false },
  { text: 'Project Report', dueDate: '2024-07-20', completed: true },
  { text: 'Meeting Preparation', dueDate: '2024-07-22', completed: false },
  { text: 'Book Appointment', dueDate: '2024-07-25', completed: false },
  { text: 'Pay Bills', dueDate: '2024-07-30', completed: true }
]

const filteredTasks = computed(() => {
  let list = demoTasks
  if (tab.value === 1) list = list.filter(t => t.completed)
  if (tab.value === 2) list = list.filter(t => !t.completed)
  // Sorting logic can be added here
  return list
})
</script> 