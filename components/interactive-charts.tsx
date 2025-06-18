"use client"

import { useState } from "react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
  ComposedChart,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Download, Maximize2 } from "lucide-react"

interface ChartData {
  name: string
  value: number
  color?: string
  delivered?: number
  failed?: number
  trend?: number
}

interface InteractiveChartProps {
  data: ChartData[]
  title: string
  type: "pie" | "bar" | "line" | "area" | "composed"
  height?: number
  showLegend?: boolean
  showGrid?: boolean
  animated?: boolean
}

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
  "#84CC16",
  "#F97316",
  "#EC4899",
  "#6366F1",
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-gray-200/50">
        <p className="font-semibold text-gray-900 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-gray-600">{entry.name}:</span>
            <span className="font-medium text-gray-900">
              {typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export function InteractiveChart({
  data,
  title,
  type,
  height = 400,
  showLegend = true,
  showGrid = true,
  animated = true,
}: InteractiveChartProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [selectedData, setSelectedData] = useState<string | null>(null)

  const handleDataClick = (data: any) => {
    setSelectedData(selectedData === data.name ? null : data.name)
  }

  const handleExport = () => {
    // Export functionality would be implemented here
    console.log("Exporting chart data:", data)
  }

  const renderChart = () => {
    if (!data || data.length === 0) {
      return (
        <div className="h-full flex items-center justify-center text-gray-500">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
            <p>No data available</p>
          </div>
        </div>
      )
    }

    const chartProps = {
      data,
      margin: { top: 20, right: 30, left: 20, bottom: 5 },
    }

    switch (type) {
      case "pie":
        return (
          <PieChart>
            <Pie
              {...chartProps}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={Math.min(height / 3, 120)}
              fill="#8884d8"
              dataKey="value"
              stroke="none"
              onClick={handleDataClick}
              animationBegin={animated ? 0 : undefined}
              animationDuration={animated ? 800 : 0}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color || COLORS[index % COLORS.length]}
                  stroke={selectedData === entry.name ? "#374151" : "none"}
                  strokeWidth={selectedData === entry.name ? 2 : 0}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend />}
          </PieChart>
        )

      case "bar":
        return (
          <BarChart {...chartProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
              angle={-45}
              textAnchor="end"
              height={60}
              interval={0}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend />}
            <Bar
              dataKey="value"
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
              onClick={handleDataClick}
              animationDuration={animated ? 800 : 0}
            />
          </BarChart>
        )

      case "line":
        return (
          <LineChart {...chartProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend />}
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "#3B82F6", strokeWidth: 2 }}
              animationDuration={animated ? 800 : 0}
            />
            {data.some((d) => d.delivered !== undefined) && (
              <Line
                type="monotone"
                dataKey="delivered"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ fill: "#10B981", strokeWidth: 2, r: 3 }}
                animationDuration={animated ? 1000 : 0}
              />
            )}
            {data.some((d) => d.failed !== undefined) && (
              <Line
                type="monotone"
                dataKey="failed"
                stroke="#EF4444"
                strokeWidth={2}
                dot={{ fill: "#EF4444", strokeWidth: 2, r: 3 }}
                animationDuration={animated ? 1200 : 0}
              />
            )}
          </LineChart>
        )

      case "area":
        return (
          <AreaChart {...chartProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend />}
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3B82F6"
              fill="#3B82F6"
              fillOpacity={0.3}
              strokeWidth={2}
              animationDuration={animated ? 800 : 0}
            />
            {data.some((d) => d.delivered !== undefined) && (
              <Area
                type="monotone"
                dataKey="delivered"
                stackId="1"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.6}
                animationDuration={animated ? 1000 : 0}
              />
            )}
            {data.some((d) => d.failed !== undefined) && (
              <Area
                type="monotone"
                dataKey="failed"
                stackId="1"
                stroke="#EF4444"
                fill="#EF4444"
                fillOpacity={0.6}
                animationDuration={animated ? 1200 : 0}
              />
            )}
          </AreaChart>
        )

      case "composed":
        return (
          <ComposedChart {...chartProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend />}
            <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} animationDuration={animated ? 800 : 0} />
            <Line
              type="monotone"
              dataKey="trend"
              stroke="#F59E0B"
              strokeWidth={3}
              dot={{ fill: "#F59E0B", strokeWidth: 2, r: 4 }}
              animationDuration={animated ? 1000 : 0}
            />
          </ComposedChart>
        )

      default:
        return <></>
    }
  }

  return (
    <Card
      className={`bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 ${isFullscreen ? "fixed inset-4 z-50" : ""}`}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
            {selectedData && (
              <Badge variant="secondary" className="mt-2">
                Selected: {selectedData}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleExport} className="text-gray-500 hover:text-gray-700">
              <Download className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="text-gray-500 hover:text-gray-700"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div style={{ height: isFullscreen ? "calc(100vh - 200px)" : height }}>
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
