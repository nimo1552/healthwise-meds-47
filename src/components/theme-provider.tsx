
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="light" 
      enableSystem={true} 
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

export function useTheme() {
  const context = React.useContext(
    React.createContext({
      theme: "light",
      setTheme: (_theme: string) => {},
    })
  )
  
  return context
}
