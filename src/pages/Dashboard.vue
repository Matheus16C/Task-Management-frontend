<template>
  <div class="min-h-screen flex justify-center w-full px-4">
    <div class="flex flex-col items-center gap-10 py-10 w-full">
      
      <!-- Cabeçalho -->
      <div class="flex flex-col space-y-5 md:flex-row md:justify-between md:space-y-0 items-center w-full ">
        <h1 class="text-white font-bold text-5xl">Tarefas</h1>
        <div class="space-x-3">
          <button @click="openModal()" class="cursor-pointer">
            <CirclePlus  class="text-white size-8"/>
          </button>
          <button @click="handleLogout()" class="cursor-pointer ">
            <LogOut  class="text-white size-8"/>
          </button>
        </div>
      </div>

      <!-- Filtros -->
      <div class="flex flex-col items-center gap-5 justify-center md:flex-row md:items-start md:justify-start ">
        <div class="w-80 md:w-full space-y-4 bg-[#23242C] p-4 rounded-lg">
        <div class="w-full md:w-auto">
          <label class="block text-white font-medium">Pesquise:</label>
          <input v-model="search" @change="handleFilter" placeholder="Pesquise por: título e descrição" 
                 type="text" 
                 class="w-full md:w-80  h-10 px-2 border border-[#3E3C41] rounded text-white" 
                 />
        </div>
        <div class="w-full md:w-auto">
          <label class="block text-white font-medium">Filtrar por status:</label>
          <select @change="handleFilter" v-model="selectedStatus" id="status" 
                  class="w-full md:w-80 h-10 px-2 border border-[#3E3C41] rounded text-white">
            <option value="" disabled selected class="bg-[#3E3C41]">Selecione um status...</option>
            <option class="bg-[#3E3C41]" v-for="option in statusOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
        <div class="w-full md:w-auto">
          <label class="block text-white font-medium">Ordenar por:</label>
          <select @change="handleFilter" v-model="selectOrder" id="order" 
                  class="w-full md:w-80 h-10 px-2 border border-[#3E3C41] rounded text-white">
            <option value="" disabled selected class="bg-[#3E3C41]">Selecione um critério...</option>
            <option class="bg-[#3E3C41]" v-for="option in orderOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
          
          <!-- Opções de Crescente e Decrescente -->
          <div class="mt-2 flex items-center gap-4">
            <label class="text-white flex items-center gap-2">
              <input type="radio" v-model="orderDirection" value="asc" @change="handleFilter" class="cursor-pointer" />
              Crescente
            </label>
            <label class="text-white flex items-center gap-2">
              <input type="radio" v-model="orderDirection" value="desc" @change="handleFilter" class="cursor-pointer" />
              Decrescente
            </label>
          </div>

          <div class="w-full flex justify-end">
          <button @click="cleanFilter" class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            <FilterX />
          </button>
        </div>
        </div>
      </div>
      <div class="w-full flex justify-center">
        <TaskList :tasks="taskStore.tasks" @editTask="openModal" />
      </div>
      </div>

      <!-- Lista de Tarefas -->
  

      <TaskModal 
        :isOpen="isModalOpen" 
        :taskData="selectedTask" 
        @close="closeModal" 
        @save="saveTask"
      />
    </div>
  </div>
</template>


<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue';
  import { useTaskStore } from '../store/task';
  import TaskList from '../components/TaskList.vue';
  import TaskModal from '../components/TaskModal.vue';
  import type { Task } from '../types/task.interface';
  import {CirclePlus, LogOut, FilterX} from "lucide-vue-next"
import type { Filter } from '../types/filter.interface';
import type { TaskStatus } from '../types/taskStatus.type';
import { useAuthStore } from '../store/auth';



  const taskStore = useTaskStore();
  const isModalOpen = ref(false);
  const selectedTask = ref<any>(null);
  const authStore = useAuthStore();

  const statusOptions = ref([
    {value: 'PENDING', label: 'Pendente' },
    {value: 'IN_PROGRESS', label: 'Em andamento' },
    {value: 'DONE', label: 'Concluído' }
  ]);

  const orderOptions = ref([
    {value: 'title', label: 'Título' },
    {value: 'dueDate', label: 'Prazo' },
  ]);

  const selectedStatus = ref('')

  const selectOrder = ref('')

  const search = ref('')

  const orderDirection = ref("asc");

  onMounted(() => {
    taskStore.fetchTasks();
  });

  const openModal = (task?: Task) => {
    selectedTask.value = task;
    isModalOpen.value = true;
  };

  const closeModal = () => {
    isModalOpen.value = false;
    selectedTask.value = null;
  };

  const cleanFilter = () => {
    search.value = "";
    selectedStatus.value = "";
    selectOrder.value = "";
    orderDirection.value = "asc";

    taskStore.fetchTasks();
  };

  const saveTask = (task: any,) => {
    if (task.id) {
      taskStore.updateTask(task);
    } else {
      taskStore.addTask(task);
    }
    closeModal();

    const filter:Filter = {
        search: search.value,
        status: selectedStatus.value as TaskStatus,
        orderBy: selectOrder.value,
        orderDirection: orderDirection.value, 
      }
      
      taskStore.fetchTasks(filter);
  };

  const handleLogout = () => {
    authStore.logout();
  }

  const handleFilter = () => {
    const filter:Filter = {
        search: search.value,
        status: selectedStatus.value as TaskStatus,
        orderBy: selectOrder.value,
        orderDirection: orderDirection.value, 
      }

    taskStore.fetchTasks(filter);
  }

  watch([search, selectedStatus, selectOrder, orderDirection], handleFilter);


</script>