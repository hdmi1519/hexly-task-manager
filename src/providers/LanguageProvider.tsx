import { I18nextProvider } from "react-i18next";
import i18next from "../lib/i18n";

interface Props {
  children: React.ReactNode;
}

export function LanguageProvider({ children }: Props) {
  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}
