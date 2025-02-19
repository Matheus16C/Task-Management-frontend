<template>
  <div >
    <div v-if="tasks.length" class="grid gap-4">
      <TaskItem v-for="task in tasks" :key="task.id" :task="task" @editTask="$emit('editTask', task)" />
    </div>
    <p v-else class="text-center text-white">Nenhuma tarefa encontrada.</p>
  </div>
</template>

<script setup lang="ts">
  import type { Task } from '../types/task.interface';
  import TaskItem from '../components/TaskItem.vue';

  defineProps<{ tasks: Task[] }>();
</script>