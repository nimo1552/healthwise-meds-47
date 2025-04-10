
import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-full bg-white text-gray-800 border border-gray-200 shadow-sm"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-orange-500" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-700" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export function ThemeToggleAdvanced() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setTheme("light")}
        className={`px-3 py-1.5 text-gray-800 ${theme === 'light' ? 'bg-white shadow-sm border-gray-300' : 'text-gray-600'}`}
      >
        <Sun className="h-4 w-4 mr-1.5 text-orange-500" />
        Light
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setTheme("dark")}
        className={`px-3 py-1.5 ${theme === 'dark' ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-600'}`}
      >
        <Moon className="h-4 w-4 mr-1.5 text-blue-400" />
        Dark
      </Button>
    </div>
  )
}
