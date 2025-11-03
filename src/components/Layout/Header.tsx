import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Tag as TagIcon } from "../../assets/icons";
import { TagManager } from "../Tag/TagManager";
import { LanguageSwitcher } from "../LanguageSwitcher/LanguageSwitcher";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const [isTagManagerOpen, setIsTagManagerOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg backdrop-blur supports-backdrop-filter:bg-light-bg/95 dark:supports-backdrop-filter:bg-dark-bg/95">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-light-text dark:text-dark-text">
              {t("app.title")}
            </h1>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsTagManagerOpen(true)}
                className="p-2 rounded-lg text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary transition-colors"
                title={t("tags.manage")}
              >
                <TagIcon className="w-5 h-5" />
              </button>

              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </header>

      {isTagManagerOpen && (
        <TagManager onClose={() => setIsTagManagerOpen(false)} />
      )}
    </>
  );
};
