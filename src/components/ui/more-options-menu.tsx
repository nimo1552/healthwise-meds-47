
import * as React from "react";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useGarbageCollection } from "@/hooks/use-garbage-collection";

interface MoreOptionsMenuProps {
  items: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
    variant?: "default" | "destructive";
  }[];
  align?: "start" | "center" | "end";
  size?: "icon" | "sm" | "default" | "lg";
}

export const MoreOptionsMenu = ({
  items,
  align = "end",
  size = "icon",
}: MoreOptionsMenuProps) => {
  const menuId = React.useId();
  
  // Register with garbage collection
  useGarbageCollection(`more-options-menu-${menuId}`, undefined, {
    touchOnRender: true,
  });
  
  // Prevent menu from closing when clicking inside
  const handleItemClick = (e: React.MouseEvent, callback: () => void) => {
    e.preventDefault();
    e.stopPropagation();
    callback();
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size={size} 
          className="focus:ring-0"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">More options</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align={align} 
        className="w-[180px] border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-lg z-[9999]"
        sideOffset={8}
        onClick={(e) => e.stopPropagation()}
      >
        {items.map((item, index) => (
          <React.Fragment key={`${item.label}-${index}`}>
            <DropdownMenuItem
              onSelect={(e) => {
                // Prevent default select behavior
                e.preventDefault();
              }}
              onClick={(e) => handleItemClick(e, item.onClick)}
              className={`flex cursor-pointer items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                item.variant === "destructive" ? "text-red-600 dark:text-red-400" : ""
              }`}
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {item.label}
            </DropdownMenuItem>
            {index < items.length - 1 && <DropdownMenuSeparator className="dark:bg-gray-700" />}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
