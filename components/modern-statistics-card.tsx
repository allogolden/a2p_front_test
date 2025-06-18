import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface ModernStatisticsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  color?: "blue" | "green" | "orange" | "red" | "purple"
  loading?: boolean
}

const colorVariants = {
  blue: {
    bg: "bg-blue-50/50",
    icon: "bg-blue-100 text-blue-600",
    trend: "text-blue-600",
  },
  green: {
    bg: "bg-green-50/50",
    icon: "bg-green-100 text-green-600",
    trend: "text-green-600",
  },
  orange: {
    bg: "bg-orange-50/50",
    icon: "bg-orange-100 text-orange-600",
    trend: "text-orange-600",
  },
  red: {
    bg: "bg-red-50/50",
    icon: "bg-red-100 text-red-600",
    trend: "text-red-600",
  },
  purple: {
    bg: "bg-purple-50/50",
    icon: "bg-purple-100 text-purple-600",
    trend: "text-purple-600",
  },
}

export function ModernStatisticsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend = "neutral",
  trendValue,
  color = "blue",
  loading = false,
}: ModernStatisticsCardProps) {
  const colors = colorVariants[color]

  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus

  if (loading) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-8 bg-gray-200 rounded w-32"></div>
              </div>
              <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className={cn(
        "bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-[1.02]",
        colors.bg,
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
              {typeof value === "number" ? value.toLocaleString() : value}
            </p>
          </div>
          <div
            className={cn(
              "p-3 rounded-xl transition-all duration-300 group-hover:scale-110 flex items-center justify-center",
              colors.icon,
            )}
          >
            <Icon className="w-6 h-6 flex-shrink-0" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          {subtitle && <p className="text-sm text-gray-500 flex-1">{subtitle}</p>}
          {trendValue && (
            <Badge
              variant="secondary"
              className={cn(
                "ml-2 flex items-center gap-1 transition-colors",
                trend === "up" && "bg-green-100 text-green-700 hover:bg-green-200",
                trend === "down" && "bg-red-100 text-red-700 hover:bg-red-200",
                trend === "neutral" && "bg-gray-100 text-gray-700 hover:bg-gray-200",
              )}
            >
              <TrendIcon className="w-3 h-3" />
              {trendValue}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
