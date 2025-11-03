interface Task {
  id: number;
  title: string;
  description: string;
  tags: number[];
  completed: boolean;
  deadline?: string;
  createdAt: string;
}

export type { Task };
