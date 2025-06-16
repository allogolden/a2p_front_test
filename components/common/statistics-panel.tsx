"use client"

import { useState, useMemo, useEffect } from "react"
import { Calendar, TrendingUp, TrendingDown, Activity, Users, MessageSquare, BarChart3 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  LineChart,
} from "recharts"
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

interface StatisticsPanelProps {
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


const DATE_RANGES = [
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
  { label: "Last 3 months", value: "3m" },
  { label: "Last 6 months", value: "6m" },
  { label: "Last year", value: "1y" },
  { label: "All time", value: "all" },
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

  // Filter data based on date range
  const filteredData = useMemo(() => {
    const { from } = getRangeDates(dateRange)
    if (!from) return data

    return data.filter((item) => {
      const itemDate = new Date(item.last_updated)
      return itemDate >= from
    })
  }, [data, dateRange])

  // Calculate statistics
  const statistics = useMemo(() => {
    const totalMessages = filteredData.reduce((sum, item) => {
      const total = Number.parseInt(item.message_types.match(/Total:\s*(\d+)/)?.[1] || "0")
      return sum + total
    }, 0)

    const totalPatterns = filteredData.reduce((sum, item) => {
      const matched = Number.parseInt(item.pattern_stats.match(/Pattern Matched:\s*(\d+)/)?.[1] || "0")
      const auto = Number.parseInt(item.pattern_stats.match(/Auto Categorized:\s*(\d+)/)?.[1] || "0")
      return sum + matched + auto
    }, 0)

    const activePatterns = filteredData.reduce((sum, item) => {
      const matched = Number.parseInt(item.pattern_stats.match(/Pattern Matched:\s*(\d+)/)?.[1] || "0")
      return sum + matched
    }, 0)

    const totalSources = filteredData.reduce((sum, item) => {
      const alphaname = Number.parseInt(item.source_types.match(/Alphaname:\s*(\d+)/)?.[1] || "0")
      const shortNumber = Number.parseInt(item.source_types.match(/Short Number:\s*(\d+)/)?.[1] || "0")
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

  // Chart data
  const messagesByCategory = filteredData.map((item, index) => ({
    name: item.name,
    id: item.id,
    value: Number.parseInt(item.message_types.match(/Total:\s*(\d+)/)?.[1] || "0"),
    color: COLORS[index % COLORS.length],
  }))

  const messageTypeData = filteredData.map((item) => ({
    name: item.name,
    id: item.id,
    sar: Number.parseInt(item.message_types.match(/SAR:\s*(\d+)/)?.[1] || "0"),
    udh: Number.parseInt(item.message_types.match(/UDH:\s*(\d+)/)?.[1] || "0"),
    payload: Number.parseInt(item.message_types.match(/Payload:\s*(\d+)/)?.[1] || "0"),
    simple: Number.parseInt(item.message_types.match(/Simple:\s*(\d+)/)?.[1] || "0"),
  }))

  const sourceTypesData = filteredData.map((item, index) => ({
    name: item.name,
    id: item.id,
    alphaname: Number.parseInt(item.source_types.match(/Alphaname:\s*(\d+)/)?.[1] || "0"),
    shortNumber: Number.parseInt(item.source_types.match(/Short Number:\s*(\d+)/)?.[1] || "0"),
  }))

  const patternStatusData = filteredData.map((item) => ({
    name: item.name,
    id: item.id,
    matched: Number.parseInt(item.pattern_stats.match(/Pattern Matched:\s*(\d+)/)?.[1] || "0"),
    auto: Number.parseInt(item.pattern_stats.match(/Auto Categorized:\s*(\d+)/)?.[1] || "0"),
  }))


  useEffect(() => {
    const { from, to } = getRangeDates(dateRange)
    trendsAPI
      .list(from ? from.toISOString() : undefined, to ? to.toISOString() : undefined)
      .then(setTrendData)
  }, [dateRange])



  const handleChartClick = (data: any) => {
    if (data && data.id && onCategoryClick) {
      onCategoryClick(data.id)
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Statistics Dashboard
            </CardTitle>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DATE_RANGES.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Badge variant="outline" className="text-xs">
                {filteredData.length} categories
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Messages</p>
                <p className="text-2xl font-bold">{statistics.totalMessages.toLocaleString()}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
            <div className="mt-2 flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              +12.5% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Patterns</p>
                <p className="text-2xl font-bold">{statistics.activePatterns}</p>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
            <div className="mt-2 flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              {statistics.patternEfficiency}% efficiency
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Sources</p>
                <p className="text-2xl font-bold">{statistics.totalSources.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <div className="mt-2 flex items-center text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 mr-1 text-red-600" />
              -2.1% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Categories</p>
                <p className="text-2xl font-bold">{statistics.categories}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-600" />
            </div>
            <div className="mt-2 flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              +5.2% from last period
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
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

                <div className="flex items-center justify-center">
                  <div className="w-64 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={messagesByCategory}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          onClick={handleChartClick}
                          style={{ cursor: "pointer" }}
                        >
                          {messagesByCategory.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [value.toLocaleString(), "Messages"]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="ml-4 space-y-1 text-sm">
                    {messagesByCategory.map((entry, index) => {
                      const total = messagesByCategory.reduce((sum, m) => sum + m.value, 0)
                      const percent = total > 0 ? ((entry.value / total) * 100).toFixed(0) : "0"
                      return (
                        <div key={entry.name} className="flex items-center space-x-2">
                          <span
                            className="block w-3 h-3 rounded-sm"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span>{`${entry.name} (${percent}%)`}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Message Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={messagesByCategory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [value.toLocaleString(), "Messages"]} />
                    <Bar dataKey="value" fill="#8884d8" onClick={handleChartClick} style={{ cursor: "pointer" }} />
                  </BarChart>
                </ResponsiveContainer>
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
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={messageTypeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sar" stackId="a" fill="#8884d8" name="SAR" />
                  <Bar dataKey="udh" stackId="a" fill="#82ca9d" name="UDH" />
                  <Bar dataKey="payload" stackId="a" fill="#ffc658" name="Payload" />
                  <Bar dataKey="simple" stackId="a" fill="#ff7300" name="Simple" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pattern-stats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pattern Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={patternStatusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="matched" fill="#22c55e" name="Pattern Matched" />
                  <Bar dataKey="auto" fill="#8884d8" name="Auto Categorized" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="source-types" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Source Types Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={sourceTypesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="alphaname" stackId="a" fill="#8884d8" name="Alphaname" />
                  <Bar dataKey="shortNumber" stackId="a" fill="#82ca9d" name="Short Number" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />

                  <Line type="monotone" dataKey="messages" stroke="#8884d8" name="Messages" dot />
                  <Line type="monotone" dataKey="patterns" stroke="#22c55e" name="Pattern Matched" dot />
                  <Line type="monotone" dataKey="sources" stroke="#ff7300" name="Sources" dot />

                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

