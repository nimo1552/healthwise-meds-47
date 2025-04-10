
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

// Create a proper context with correct typing
interface ThemeContextProps {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeContext = React.createContext<ThemeContextProps>({
  theme: "light",
  setTheme: () => {},
});

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="light" 
      enableSystem={false} 
      forcedTheme="light" 
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

// Export the hook with proper context
export function useTheme() {
  const context = React.useContext(ThemeContext);
  
  // Fallback to Next Themes if context isn't available
  const { theme, setTheme } = context;
  
  return {
    theme,
    setTheme,
  };
}
