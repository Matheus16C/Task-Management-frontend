import { defineStore } from "pinia";
import taskService from "../services/taskService";
import type { TaskStatus } from "../types/taskStatus.type";
import type { Filter } from "../types/filter.interface";
import { useToast } from "vue-toastification";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: [] as any[],
  }),

  actions: {
    async fetchTasks(filter?: Filter) {
      const toast = useToast();
      try {
        this.tasks = await taskService.getTasks(filter);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Erro ao carregar tarefas.");
      }
    },

    async addTask(task: any) {
      const toast = useToast();
      try {
        await taskService.createTask(task);
        toast.success("Tarefa adicionada com sucesso!");
        await this.fetchTasks();
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Erro ao adicionar tarefa.");
      }
    },

    async updateTask(task: any) {
      const toast = useToast();
      try {
        await taskService.updateTask(task);
        toast.success("Tarefa atualizada!");
        await this.fetchTasks();
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Erro ao atualizar tarefa.");
      }
    },


    async updateTaskStatus(taskId: string, newStatus: TaskStatus) {
      const toast = useToast();
      try {
        await taskService.updateTaskStatus(taskId, newStatus);
        toast.info("Status da tarefa atualizado.");
        await this.fetchTasks();
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Erro ao atualizar status.");
      }
    },

    async removeTask(id: string) {
      const toast = useToast();
      try {
        await taskService.deleteTask(id);
        toast.success("Tarefa removida!");
        await this.fetchTasks();
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Erro ao remover tarefa.");
      }
    },
  },
});
