
import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme as useNextTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function ThemeToggle() {
  const { theme, setTheme } = useNextTheme()
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-9 w-9 rounded-md"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Toggle theme</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function ThemeToggleAdvanced() {
  const { theme, setTheme } = useNextTheme()
  
  return (
    <div className="flex items-center space-x-2">
      <ToggleGroup type="single" value={theme} onValueChange={(value) => value && setTheme(value)}>
        <ToggleGroupItem value="light" aria-label="Light mode">
          <Sun className="h-4 w-4 mr-2" />
          Light
        </ToggleGroupItem>
        <ToggleGroupItem value="dark" aria-label="Dark mode">
          <Moon className="h-4 w-4 mr-2" />
          Dark
        </ToggleGroupItem>
        <ToggleGroupItem value="system" aria-label="System preference">
          System
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
