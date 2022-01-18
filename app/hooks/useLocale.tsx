import { createContext, ReactNode, useContext } from "react";

const LocaleContext = createContext<string>(undefined as unknown as string);

export function LocaleProvider({
  children,
  locale,
}: {
  children: ReactNode;
  locale: string;
}) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

export default function useLocale() {
  return useContext(LocaleContext);
}
