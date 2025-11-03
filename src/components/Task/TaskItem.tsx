import { useTranslation } from "react-i18next";
import {
  Pencil,
  Trash2,
  Calendar,
  CircleCheck,
  Circle,
} from "../../assets/icons";
import { useTaskStore } from "../../store/task.store";
import type { Task } from "../../shared/types/task.types";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
}

export const TaskItem = ({ task, onEdit }: TaskItemProps) => {
  const { t } = useTranslation();
  const { toggleTask, deleteTask, tags } = useTaskStore();

  const isOverdue =
    task.deadline && !task.completed && new Date(task.deadline) < new Date();

  const taskTags = tags.filter((tag) => task.tags.includes(tag.id));

  return (
    <div
      className={`p-4 rounded-2xl border transition-all ${
        task.completed
          ? "bg-light-bg-secondary dark:bg-dark-bg-secondary border-light-border dark:border-dark-border opacity-60"
          : isOverdue
          ? "bg-red-50 dark:bg-red-900/20 border-light-danger dark:border-dark-danger"
          : "bg-light-bg dark:bg-dark-bg-secondary border-light-border dark:border-dark-border"
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => toggleTask(task.id)}
          className="mt-1 text-light-primary dark:text-dark-primary hover:text-light-primary-hover dark:hover:text-dark-primary-hover transition-colors"
        >
          {task.completed ? (
            <CircleCheck className="w-5 h-5" />
          ) : (
            <Circle className="w-5 h-5" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <h3
            className={`text-lg font-semibold text-light-text dark:text-dark-text ${
              task.completed ? "line-through" : ""
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p className="mt-1 text-sm text-light-text-secondary dark:text-dark-text-secondary">
              {task.description}
            </p>
          )}

          {taskTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {taskTags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    backgroundColor: tag.color + "20",
                    color: tag.color,
                  }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          {task.deadline && (
            <div
              className={`flex items-center gap-1 mt-2 text-sm ${
                isOverdue
                  ? "text-light-danger dark:text-dark-danger font-medium"
                  : "text-light-text-secondary dark:text-dark-text-secondary"
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(task.deadline).toLocaleDateString()}
                {isOverdue && ` - ${t("tasks.overdue")}`}
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-primary dark:hover:text-dark-primary transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className="p-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-danger dark:hover:text-dark-danger transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
