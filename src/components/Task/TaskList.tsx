import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Plus, Search } from "../../assets/icons";
import { useTaskStore } from "../../store/task.store";
import type { Task } from "../../shared/types/task.types";

import { TaskItem } from "./TaskItem";
import { TaskForm } from "./TaskForm";

export const TaskList = () => {
  const { t } = useTranslation();
  const { tasks, searchQuery, setSearchQuery } = useTaskStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const filteredTasks = useMemo(() => {
    if (!searchQuery.trim()) return tasks;

    const query = searchQuery.toLowerCase();
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
    );
  }, [tasks, searchQuery]);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(undefined);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
          <input
            type="text"
            placeholder={t("search.placeholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-light-border dark:border-dark-border rounded-2xl bg-light-bg dark:bg-dark-bg-secondary text-light-text dark:text-dark-text placeholder-light-text-secondary dark:placeholder-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
          />
        </div>

        <button
          onClick={() => setIsFormOpen(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-light-primary dark:bg-dark-primary text-white rounded-2xl hover:bg-light-primary-hover dark:hover:bg-dark-primary-hover transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          {t("tasks.addTask")}
        </button>
      </div>

      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 text-light-text-secondary dark:text-dark-text-secondary">
            {searchQuery ? t("search.placeholder") : t("tasks.noTasks")}
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} onEdit={handleEdit} />
          ))
        )}
      </div>

      {isFormOpen && <TaskForm task={editingTask} onClose={handleCloseForm} />}
    </div>
  );
};
