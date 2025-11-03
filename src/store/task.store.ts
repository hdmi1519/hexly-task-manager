import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Task } from "../shared/types/task.types";
import type { Tag } from "../shared/types/tag.types";

interface TaskStore {
  tasks: Task[];
  tags: Tag[];
  searchQuery: string;
  addTask: (task: Omit<Task, "id" | "createdAt">) => void;
  updateTask: (id: number, task: Partial<Task>) => void;
  deleteTask: (id: number) => void;
  toggleTask: (id: number) => void;
  addTag: (tag: Omit<Tag, "id">) => void;
  deleteTag: (id: number) => void;
  setSearchQuery: (query: string) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      tags: [],
      searchQuery: "",

      addTask: (task) => {
        const { tasks } = get();
        const maxId = tasks.length ? Math.max(...tasks.map((t) => t.id)) : 0;
        const newTask: Task = {
          ...task,
          id: maxId + 1,
          createdAt: new Date().toISOString(),
        };
        set({ tasks: [...tasks, newTask] });
      },

      updateTask: (id, updatedTask) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updatedTask } : task
          ),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),

      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        })),

      addTag: (tag) => {
        const { tags } = get();
        const maxId = tags.length ? Math.max(...tags.map((t) => t.id)) : 0;
        const newTag: Tag = { ...tag, id: maxId + 1 };
        set({ tags: [...tags, newTag] });
      },

      deleteTag: (id) =>
        set((state) => ({
          tags: state.tags.filter((tag) => tag.id !== id),
          tasks: state.tasks.map((task) => ({
            ...task,
            tags: task.tags.filter((tagId) => tagId !== id),
          })),
        })),

      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: "__task_storage__",
    }
  )
);
