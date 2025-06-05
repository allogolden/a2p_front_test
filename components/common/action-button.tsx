"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"

interface ActionButtonProps {
  onClick: () => void
  icon?: LucideIcon
  children: React.ReactNode
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  disabled?: boolean
}

export function ActionButton({
  onClick,
  icon: Icon,
  children,
  variant = "default",
  size = "default",
  className = "",
  disabled = false,
}: ActionButtonProps) {
  const baseClasses =
    variant === "default"
      ? "bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-100 dark:hover:bg-gray-200 dark:text-gray-900"
      : ""

  return (
    <Button
      onClick={onClick}
      variant={variant}
      size={size}
      disabled={disabled}
      className={`${baseClasses} ${className}`}
    >
      {Icon && <Icon className="mr-2 h-4 w-4" />}
      {children}
    </Button>
  )
}
