import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ar" | "en";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
}

const Context = createContext<LangCtx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");

  const toggleLang = () => setLang((p) => (p === "ar" ? "en" : "ar"));

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title =
      lang === "ar" ? "Oppyans — استوديو تسويق رقمي" : "Oppyans — Digital Marketing Studio";
  }, [lang]);

  return <Context.Provider value={{ lang, setLang, toggleLang }}>{children}</Context.Provider>;
}

export function useLanguage() {
  const ctx = useContext(Context);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
