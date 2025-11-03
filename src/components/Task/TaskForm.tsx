import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { X } from "../../assets/icons";
import { useTaskStore } from "../../store/task.store";
import type { Task } from "../../shared/types/task.types";

interface TaskFormProps {
  task?: Task;
  onClose: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ task, onClose }) => {
  const { t } = useTranslation();
  const { addTask, updateTask, tags } = useTaskStore();
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [deadline, setDeadline] = useState(
    task?.deadline ? task.deadline.split("T")[0] : ""
  );
  const [selectedTags, setSelectedTags] = useState<number[]>(task?.tags || []);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDeadline(task.deadline ? task.deadline.split("T")[0] : "");
      setSelectedTags(task.tags);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      tags: selectedTags,
      deadline: deadline || undefined,
      completed: task?.completed || false,
    };

    if (task) {
      updateTask(task.id, taskData);
    } else {
      addTask(taskData);
    }

    onClose();
  };

  const toggleTag = (tagId: number) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="relative bg-light-bg dark:bg-dark-bg rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto z-10">
        <div className="flex items-center justify-between p-4 border-b border-light-border dark:border-dark-border">
          <h2 className="text-xl font-bold text-light-text dark:text-dark-text">
            {task ? t("tasks.editTask") : t("tasks.addTask")}
          </h2>
          <button
            onClick={onClose}
            className="text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-1">
              {t("form.title")}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-xl bg-light-bg dark:bg-dark-bg-secondary text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-1">
              {t("form.description")}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-xl bg-light-bg dark:bg-dark-bg-secondary text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-1">
              {t("form.deadline")}
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-xl bg-light-bg dark:bg-dark-bg-secondary text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
            />
          </div>

          {tags.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                {t("form.tags")}
              </label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => toggleTag(tag.id)}
                    className={`px-3 py-1 text-sm rounded-full transition-all ${
                      selectedTags.includes(tag.id)
                        ? "ring-2 ring-offset-2 ring-light-primary dark:ring-dark-primary"
                        : ""
                    }`}
                    style={{
                      backgroundColor: tag.color + "20",
                      color: tag.color,
                    }}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-light-primary dark:bg-dark-primary text-white rounded-xl hover:bg-light-primary-hover dark:hover:bg-dark-primary-hover transition-colors font-medium"
            >
              {t("form.save")}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text rounded-xl hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary transition-colors"
            >
              {t("form.cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
