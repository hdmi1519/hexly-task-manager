import { Languages } from "../../assets/icons";
import { useTranslation } from "react-i18next";

export const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ru" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("__language__", newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 rounded-lg text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary transition-colors"
      title={t("language.toggle")}
    >
      <Languages className="w-5 h-5" />
    </button>
  );
};
