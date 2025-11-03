import React from "react";
import { useTranslation } from "react-i18next";
import { Home, Search } from "../assets/icons";
import { useNavigate } from "react-router-dom";
import { LanguageSwitcher } from "../components/LanguageSwitcher/LanguageSwitcher";
import { ThemeSwitcher } from "../components/ThemeSwitcher/ThemeSwitcher";

export const NotFound: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg relative">
      <header className="absolute top-0 right-0 p-6 z-10">
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </header>

      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-2xl shadow-xl border border-light-border dark:border-dark-border p-8 text-center">
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-danger dark:text-danger" />
              </div>
            </div>

            <div className="mb-4">
              <h1 className="text-6xl font-bold text-danger mb-2">404</h1>
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-2">
                {t("errors.404.title")}
              </h2>
              <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
                {t("errors.404.subtitle")}
              </p>
            </div>

            <p className="text-light-text-secondary dark:text-dark-text-secondary mb-8 leading-relaxed">
              {t("errors.404.description")}
            </p>

            <div className="space-y-3">
              <button
                onClick={() => navigate("/")}
                className="w-full bg-light-bg-secondary dark:bg-dark-bg-secondary hover:bg-light-bg-tertiary dark:hover:bg-dark-bg text-light-text dark:text-dark-text font-medium py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                {t("errors.404.back_home")}
              </button>
            </div>
          </div>
        </div>
      </main>

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 dark:bg-blue-900 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-200 dark:bg-blue-900 rounded-full opacity-10 blur-3xl"></div>
      </div>
    </div>
  );
};
