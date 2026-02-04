"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.PropsWithChildren<{ attribute?: string; defaultTheme?: string; enableSystem?: boolean; storageKey?: string }>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
