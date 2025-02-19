import type { Filter } from '../types/filter.interface';
import type { Task } from '../types/task.interface';
import type { TaskStatus } from '../types/taskStatus.type';
import api from "./api";

export default {
  async getTasks(filter?: Filter): Promise<Task[]> {

    const params = Object.fromEntries(
      Object.entries(filter || {}).filter(([_, value]) => value !== undefined && value !== "")
    );

    const response = await api.get('/task', { params });
    return response.data;
  },

  async createTask(task: Omit<Task, 'id' | 'status'>) {
    await api.post('/task', {
      title: task.title,
      description: task.description,
      dueDate: task.dueDate
    });
  },

  async updateTask(task: Omit<Task, 'status'>) {
    await api.put(`/task/${task.id}`, {
      title: task.title,
      description: task.description,
      dueData: task.dueDate
    });
  },

  async updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    await api.put('task/change-status', {
      id: taskId,
      status: newStatus
    })
  },

  async deleteTask(id: string) {
    await api.delete(`/task/${id}`);
  }
}