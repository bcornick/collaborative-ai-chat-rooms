'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
