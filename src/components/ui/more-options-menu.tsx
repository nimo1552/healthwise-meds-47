
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
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={size} className="focus:ring-0">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">More options</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-[180px] bg-white">
        {items.map((item, index) => (
          <React.Fragment key={`${item.label}-${index}`}>
            <DropdownMenuItem
              onClick={item.onClick}
              className={`flex cursor-pointer items-center ${
                item.variant === "destructive" ? "text-red-600" : ""
              }`}
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {item.label}
            </DropdownMenuItem>
            {index < items.length - 1 && <DropdownMenuSeparator />}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
