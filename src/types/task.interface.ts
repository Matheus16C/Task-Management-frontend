import type { TaskStatus } from "./taskStatus.type";

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  status: TaskStatus;
  creator: string;
}
