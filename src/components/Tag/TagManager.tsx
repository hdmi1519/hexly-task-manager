import { useState } from "react";
import { useTranslation } from "react-i18next";
import { X, Plus, Trash2, Tag as TagIcon } from "../../assets/icons";
import { useTaskStore } from "../../store/task.store";

interface TagManagerProps {
  onClose: () => void;
}

const DEFAULT_COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
  "#84cc16",
];

export const TagManager: React.FC<TagManagerProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const { tags, addTag, deleteTag } = useTaskStore();
  const [name, setName] = useState("");
  const [color, setColor] = useState(DEFAULT_COLORS[0]);
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addTag({ name: name.trim(), color });
    setName("");
    setColor(DEFAULT_COLORS[0]);
    setIsCreating(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />

      <div className="relative bg-light-bg dark:bg-dark-bg rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto z-10">
        <div className="flex items-center justify-between p-4 border-b border-light-border dark:border-dark-border">
          <h2 className="text-xl font-bold text-light-text dark:text-dark-text">
            {t("tags.manage")}
          </h2>
          <button
            onClick={onClose}
            className="text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          {!isCreating ? (
            <button
              onClick={() => setIsCreating(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-light-border dark:border-dark-border rounded-xl text-light-text-secondary dark:text-dark-text-secondary hover:border-light-primary dark:hover:border-dark-primary hover:text-light-primary dark:hover:text-dark-primary transition-colors"
            >
              <Plus className="w-5 h-5" />
              {t("tags.create")}
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 mb-4">
              <div>
                <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-1">
                  {t("tags.name")}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-xl bg-light-bg dark:bg-dark-bg-secondary text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                  autoFocus
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                  {t("tags.color")}
                </label>
                <div className="flex gap-2 flex-wrap">
                  {DEFAULT_COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setColor(c)}
                      className={`w-8 h-8 rounded-full transition-all ${
                        color === c
                          ? "ring-2 ring-offset-2 ring-light-primary dark:ring-dark-primary scale-110"
                          : ""
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-light-primary dark:bg-dark-primary text-white rounded-xl hover:bg-light-primary-hover dark:hover:bg-dark-primary-hover transition-colors font-medium"
                >
                  {t("form.save")}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setName("");
                    setColor(DEFAULT_COLORS[0]);
                  }}
                  className="px-4 py-2 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text rounded-xl hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary transition-colors"
                >
                  {t("form.cancel")}
                </button>
              </div>
            </form>
          )}

          <div className="mt-4 space-y-2">
            {tags.length === 0 ? (
              <div className="text-center py-8 text-light-text-secondary dark:text-dark-text-secondary">
                {t("tags.noTags")}
              </div>
            ) : (
              tags.map((tag) => (
                <div
                  key={tag.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-light-bg-secondary dark:bg-dark-bg-secondary"
                >
                  <div className="flex items-center gap-3">
                    <TagIcon className="w-5 h-5" style={{ color: tag.color }} />
                    <span className="font-medium" style={{ color: tag.color }}>
                      {tag.name}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteTag(tag.id)}
                    className="p-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-danger dark:hover:text-dark-danger transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
