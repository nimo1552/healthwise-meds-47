
import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { toast } from "sonner"

// Simple theme toggle button
export function ThemeToggle() {
  const { setTheme } = useTheme()

  React.useEffect(() => {
    // Force light theme
    setTheme("light")
  }, [setTheme])

  return (
    <Button
      variant="outline"
      size="icon"
      className="bg-white border-nimocare-200 text-nimocare-600 hover:bg-nimocare-50"
      onClick={() => {
        toast("Light theme is currently active", {
          description: "This app uses a light green and white theme."
        })
      }}
    >
      <Sun className="h-4 w-4 text-nimocare-600" />
      <span className="sr-only">Light mode</span>
    </Button>
  )
}

// Advanced theme toggle with dropdown (simplified to light theme only)
export function ThemeToggleAdvanced() {
  const { setTheme } = useTheme()

  React.useEffect(() => {
    // Force light theme
    setTheme("light")
  }, [setTheme])

  return (
    <Button
      variant="outline"
      size="sm"
      className="bg-white border-nimocare-200 text-nimocare-600 hover:bg-nimocare-50"
      onClick={() => {
        toast("Light theme is enabled", {
          description: "This app uses a light green and white theme."
        })
      }}
    >
      <Sun className="h-4 w-4 mr-1 text-nimocare-600" />
      <span>Light</span>
    </Button>
  )
}
