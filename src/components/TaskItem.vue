<template>
  <div class="bg-[#23242C] p-4 rounded-lg shadow-md w-80 md:w-md lg:w-xl xl:w-3xl mx-auto">
    <div class="flex flex-col lg:flex-row justify-between items-start sm:items-center gap-2">
      <!-- Título da Tarefa -->
      <h3 class="text-2xl font-semibold text-white break-words overflow-hidden text-ellipsis max-w-full">
        {{ task.title }}
      </h3>
      
      <!-- Status Dropdown -->
      <div class="relative w-full sm:w-64">
        <button @click="toggleDropdown" 
                :class="['font-medium text-lg w-full sm:w-64 px-3 py-1 text-white rounded flex items-center', creator ? 'justify-between' : 'justify-center', statusColorSwitch]">
          {{ statusLabel(task.status) }} <ChevronDown v-if="creator" />
        </button>
        <div v-if="dropdownOpen" class="absolute right-0 mt-1 bg-white border rounded shadow-md z-10 w-full">
          <button v-if="task.status !== 'PENDING'" @click="updateStatus('PENDING')" 
            class="block px-4 py-2 hover:bg-gray-100 w-full text-left">Pendente</button>
          <button v-if="task.status !== 'IN_PROGRESS'" @click="updateStatus('IN_PROGRESS')" 
            class="block px-4 py-2 hover:bg-gray-100 w-full text-left">Em Andamento</button>
          <button v-if="task.status !== 'DONE'"
            @click="updateStatus('DONE')" 
            class="block px-4 py-2 hover:bg-gray-100 w-full text-left">Concluído</button>
        </div>
      </div>
    </div>

    <!-- Descrição -->
    <p class="text-[#98959D] text-lg break-words mt-2">{{ task.description }}</p>

    <!-- Rodapé -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-4">
      <!-- Prazo -->
      <div class="flex gap-2 text-white">
        <span class="text-lg">Prazo:</span>
        <h2 class="text-lg font-semibold break-words">{{ format(task.dueDate!, 'dd/MM/yyyy') }}</h2>
      </div>

      <!-- Botões de Ação -->
      <div v-if="creator" class="flex gap-2">
        <button @click="$emit('editTask', task)" 
                class="border-2 text-yellow-500 px-2 py-2 shadow rounded hover:bg-yellow-500 hover:text-white hover:border-0 border-yellow-500">
          <Pencil />
        </button>
        <button @click="$emit('deleteTask', task.id)" 
                class="border-2 text-red-500 px-2 py-2 shadow rounded hover:bg-red-500 hover:text-white hover:border-0 border-red-500">
          <Trash2 />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useTaskStore } from '../store/task';
  import type { Task } from '../types/task.interface';
  import { Pencil, Trash2, ChevronDown } from 'lucide-vue-next';
  import { format } from 'date-fns';
  import type { User } from '../types/user.interface';
  import type { TaskStatus } from '../types/taskStatus.type';

  const props = defineProps<{ task: Task }>();
  const taskStore = useTaskStore();
  const dropdownOpen = ref(false);
  const user: User = JSON.parse(localStorage.getItem("user")!);

  const creator: boolean = user.id === props.task.creator;

  const toggleDropdown = () => {
    if (creator) dropdownOpen.value = !dropdownOpen.value;
  };

  const updateStatus = async (newStatus: TaskStatus) => {
    await taskStore.updateTaskStatus(props.task.id, newStatus);
    dropdownOpen.value = false;
  };

  const statusColorSwitch = computed(() => {
    switch (props.task.status) {
      case 'PENDING':
        return 'bg-yellow-500 border-yellow-500';
      case 'IN_PROGRESS':
        return 'bg-blue-500 border-blue-500';
      case 'DONE':
        return 'bg-green-500 border-green-500';
      default:
        return 'bg-gray-500 border-gray-300';
    }
  });

  const statusLabel = (status: TaskStatus) => {
    const labels: Record<TaskStatus, string> = {
      PENDING: 'Pendente',
      IN_PROGRESS: 'Em Andamento',
      DONE: 'Concluído'
    };
    return labels[status];
  };
</script>
