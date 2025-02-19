<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-gray-800/50">
      <div class="bg-[#23242C] p-6 rounded-lg shadow-md w-96 flex flex-col gap-5 ">
        <div class="flex items-center justify-center relative mb-4">
          <button @click="emit('close');" type="button" class="text-white  absolute left-0 cursor-pointer">
            <CircleX />
          </button>
          <h2 class="text-2xl font-semibold text-white ">{{ isEditing ? 'Editar Tarefa' : 'Nova Tarefa' }}</h2>
        </div>
        <form @submit.prevent="saveTask">
          <div class="space-y-6">
            <div class="text-white">
              <label class="block font-semibold ">Título</label>
              <input v-model="task.title" type="text" class="w-full p-2 border border-[#3E3C41] rounded" required />
            </div>
            <div class="text-white">
              <label class="block font-semibold ">Descrição</label>
              <textarea v-model="task.description" class="w-full p-2 border border-[#3E3C41] rounded"></textarea>
            </div>
            <div class="text-white">
              <label class="block font-semibold ">Data de vencimento</label>
              <input v-model="task.dueDate" type="date" class="w-full p-2 border border-[#3E3C41] text-white rounded" required />
            </div>

            <div class="flex justify-end w-full">
        
              <button type="submit" class="bg-[#9282FA] hover:bg-blue-400 text-white px-4 py-2 rounded">
                Salvar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { defineEmits, reactive, computed, watch } from 'vue';
import type { Task } from '../types/task.interface';
import {CircleX} from "lucide-vue-next"

const props = defineProps<{ isOpen: boolean, taskData?: Task }>();
const emit = defineEmits(['close', 'save']);

const task = reactive({
  id: null as string | null,
  title: '',
  description: '',
  dueDate: ''
});

// Verifica se a tarefa está sendo editada ou criada
const isEditing = computed(() => !!task.id);

// Atualiza os dados do modal ao abrir para edição
watch(() => props.taskData, (newTask) => {
  if (newTask) {
    Object.assign(task, newTask); // Preenche os dados no formulário
  } else {
    Object.assign(task, { id: null, title: '', description: '', dueDate: '' });
  }
}, { immediate: true });

// Salva a tarefa e fecha o modal
const saveTask = () => {
  emit('save', { ...task });
  emit('close');
};
</script>
