"use client"

import { useState, useMemo, useEffect } from "react"
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Users,
  MessageSquare,
  BarChart3,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DateRangeSelector, DATE_RANGES } from "@/components/ui/date-range-selector"
import { StatsCard } from "@/components/ui/stats-card"
import { MessagesByCategoryPie } from "@/components/ui/chart-messages-by-category-pie"
import { MessagesVolumeBar } from "@/components/ui/chart-messages-volume-bar"
import { MessageTypeChart } from "@/components/ui/chart-message-type"
import { PatternStatsChart } from "@/components/ui/chart-pattern-stats"
import { SourceTypesChart } from "@/components/ui/chart-source-types"
import { TrendsChart } from "@/components/ui/chart-trends"
import { trendsAPI, type TrendPoint } from "@/lib/api/category-charts"

interface CategoryStatistic {
  id: string
  name: string
  ctn: string
  message_types: string
  pattern_stats: string
  source_types: string
  last_updated: string
}

export interface StatisticsPanelProps {
  data: CategoryStatistic[]
  isLoading?: boolean
  onCategoryClick?: (categoryId: string) => void
}

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7300",
  "#00ff00",
  "#ff00ff",
  "#00ffff",
  "#ff0000",
  "#0000ff",
  "#ffff00",
]

function getRangeDates(range: string): { from: Date | null; to: Date | null } {
  if (range === "all") return { from: null, to: null }
  const to = new Date()
  const from = new Date()
  switch (range) {
    case "7d":
      from.setDate(to.getDate() - 7)
      break
    case "30d":
      from.setDate(to.getDate() - 30)
      break
    case "3m":
      from.setMonth(to.getMonth() - 3)
      break
    case "6m":
      from.setMonth(to.getMonth() - 6)
      break
    case "1y":
      from.setFullYear(to.getFullYear() - 1)
      break
    default:
      return { from: null, to: null }
  }
  return { from, to }
}

export function StatisticsPanel({ data, isLoading = false, onCategoryClick }: StatisticsPanelProps) {
  const [dateRange, setDateRange] = useState("30d")
  const [trendData, setTrendData] = useState<TrendPoint[]>([])

  const filteredData = useMemo(() => {
    const { from } = getRangeDates(dateRange)
    if (!from) return data
    return data.filter((item) => new Date(item.last_updated) >= from)
  }, [data, dateRange])

  const statistics = useMemo(() => {
    const totalMessages = filteredData.reduce((sum, item) => {
      const total = parseInt(item.message_types.match(/Total:\s*(\d+)/)?.[1] || "0")
      return sum + total
    }, 0)
    const totalPatterns = filteredData.reduce((sum, item) => {
      const matched = parseInt(item.pattern_stats.match(/Pattern Matched:\s*(\d+)/)?.[1] || "0")
      const auto = parseInt(item.pattern_stats.match(/Auto Categorized:\s*(\d+)/)?.[1] || "0")
      return sum + matched + auto
    }, 0)
    const activePatterns = filteredData.reduce((sum, item) => {
      const matched = parseInt(item.pattern_stats.match(/Pattern Matched:\s*(\d+)/)?.[1] || "0")
      return sum + matched
    }, 0)
    const totalSources = filteredData.reduce((sum, item) => {
      const alphaname = parseInt(item.source_types.match(/Alphaname:\s*(\d+)/)?.[1] || "0")
      const shortNumber = parseInt(item.source_types.match(/Short Number:\s*(\d+)/)?.[1] || "0")
      return sum + alphaname + shortNumber
    }, 0)
    return {
      totalMessages,
      totalPatterns,
      activePatterns,
      totalSources,
      categories: filteredData.length,
      patternEfficiency: totalPatterns > 0 ? Math.round((activePatterns / totalPatterns) * 100) : 0,
    }
  }, [filteredData])

  const messagesByCategory = filteredData.map((item, index) => ({
    name: item.name,
    id: item.id,
    value: parseInt(item.message_types.match(/Total:\s*(\d+)/)?.[1] || "0"),
    color: COLORS[index % COLORS.length],
  }))

  const messageTypeData = filteredData.map((item) => ({
    name: item.name,
    id: item.id,
    sar: parseInt(item.message_types.match(/SAR:\s*(\d+)/)?.[1] || "0"),
    udh: parseInt(item.message_types.match(/UDH:\s*(\d+)/)?.[1] || "0"),
    payload: parseInt(item.message_types.match(/Payload:\s*(\d+)/)?.[1] || "0"),
    simple: parseInt(item.message_types.match(/Simple:\s*(\d+)/)?.[1] || "0"),
  }))

  const sourceTypesData = filteredData.map((item) => ({
    name: item.name,
    id: item.id,
    alphaname: parseInt(item.source_types.match(/Alphaname:\s*(\d+)/)?.[1] || "0"),
    shortNumber: parseInt(item.source_types.match(/Short Number:\s*(\d+)/)?.[1] || "0"),
  }))

  const patternStatusData = filteredData.map((item) => ({
    name: item.name,
    id: item.id,
    matched: parseInt(item.pattern_stats.match(/Pattern Matched:\s*(\d+)/)?.[1] || "0"),
    auto: parseInt(item.pattern_stats.match(/Auto Categorized:\s*(\d+)/)?.[1] || "0"),
  }))

  useEffect(() => {
    const { from, to } = getRangeDates(dateRange)
    trendsAPI
      .list(from ? from.toISOString() : undefined, to ? to.toISOString() : undefined)
      .then(setTrendData)
  }, [dateRange])

  const handleChartClick = (d: any) => {
    if (d && d.id && onCategoryClick) {
      onCategoryClick(d.id)
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Statistics Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Statistics Dashboard
            </CardTitle>
            <div className="flex items-center gap-4">
              <DateRangeSelector value={dateRange} onChange={setDateRange} ranges={DATE_RANGES} />
              <Badge variant="outline" className="text-xs">
                {filteredData.length} categories
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Messages"
          value={statistics.totalMessages.toLocaleString()}
          icon={MessageSquare}
          footer={
            <>
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />+12.5% from last period
            </>
          }
        />
        <StatsCard
          title="Active Patterns"
          value={statistics.activePatterns}
          icon={Activity}
          iconClassName="h-8 w-8 text-green-600"
          footer={
            <>
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              {statistics.patternEfficiency}% efficiency
            </>
          }
        />
        <StatsCard
          title="Total Sources"
          value={statistics.totalSources.toLocaleString()}
          icon={Users}
          iconClassName="h-8 w-8 text-purple-600"
          footer={
            <>
              <TrendingDown className="h-3 w-3 mr-1 text-red-600" />-2.1% from last period
            </>
          }
        />
        <StatsCard
          title="Categories"
          value={statistics.categories}
          icon={BarChart3}
          iconClassName="h-8 w-8 text-orange-600"
          footer={
            <>
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />+5.2% from last period
            </>
          }
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="message-types">Message Types</TabsTrigger>
          <TabsTrigger value="pattern-stats">Pattern Stats</TabsTrigger>
          <TabsTrigger value="source-types">Source Types</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Messages by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <MessagesByCategoryPie data={messagesByCategory} onClick={handleChartClick} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Message Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <MessagesVolumeBar data={messagesByCategory} onClick={handleChartClick} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="message-types" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Message Type Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <MessageTypeChart data={messageTypeData} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pattern-stats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pattern Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <PatternStatsChart data={patternStatusData} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="source-types" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Source Types Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <SourceTypesChart data={sourceTypesData} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <TrendsChart data={trendData} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

