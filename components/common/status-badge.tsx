"use client"

import { Badge } from "@/components/ui/badge"

interface StatusBadgeProps {
  status: string
  variant?: "default" | "destructive" | "outline" | "secondary"
}

export function StatusBadge({ status, variant }: StatusBadgeProps) {
  const getStatusColor = (status: string) => {
    const normalizedStatus = status.toLowerCase()

    if (normalizedStatus === "active" || normalizedStatus === "delivered" || normalizedStatus === "success") {
      return "bg-green-100 text-green-800 border-green-200 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
    }

    if (normalizedStatus === "inactive" || normalizedStatus === "failed" || normalizedStatus === "error") {
      return "bg-red-100 text-red-800 border-red-200 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
    }

    if (normalizedStatus === "pending" || normalizedStatus === "processing") {
      return "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
    }

    return "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800"
  }

  return (
    <Badge variant={variant} className={getStatusColor(status)}>
      {status}
    </Badge>
  )
}
