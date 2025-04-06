
import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-full bg-white/20 backdrop-blur-sm border border-white/10 shadow-sm"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-gray-800" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-gray-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export function ThemeToggleAdvanced() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setTheme("light")}
        className={`px-3 py-1.5 ${theme === 'light' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}
      >
        <Sun className="h-4 w-4 mr-1.5" />
        Light
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setTheme("dark")}
        className={`px-3 py-1.5 ${theme === 'dark' ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-600'}`}
      >
        <Moon className="h-4 w-4 mr-1.5" />
        Dark
      </Button>
    </div>
  )
}
