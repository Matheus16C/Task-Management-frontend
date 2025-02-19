import type { TaskStatus } from "./taskStatus.type";

export interface Filter {
  search?: string;
  status?: TaskStatus;
  orderBy?: string;
  orderDirection?: string;
}