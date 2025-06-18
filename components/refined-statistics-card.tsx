import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface RefinedStatisticsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  trend?: "up" | "down" | "neutral"
}

export function RefinedStatisticsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend = "neutral",
}: RefinedStatisticsCardProps) {
  const trendColors = {
    up: "text-green-600",
    down: "text-red-500",
    neutral: "text-gray-500",
  }

  return (
    <Card className="p-6 bg-white/60 backdrop-blur-sm border-gray-200/50 hover:bg-white/80 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-semibold text-gray-900">
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
          {subtitle && <p className={cn("text-xs font-medium", trendColors[trend])}>{subtitle}</p>}
        </div>
        <div className="p-3 bg-gray-100/50 rounded-xl">
          <Icon className="w-6 h-6 text-gray-700" />
        </div>
      </div>
    </Card>
  )
}
