"use client"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
  Filler,
} from "chart.js"
import { Bar, Pie, Line, Doughnut } from "react-chartjs-2"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Maximize2, MoreHorizontal } from "lucide-react"
import { useState } from "react"

// Регистрируем все необходимые компоненты Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
  Filler,
)

interface ChartData {
  name: string
  value: number
  delivered?: number
  failed?: number
}

interface BeautifulChartsProps {
  data: ChartData[]
  title: string
  type: "pie" | "bar" | "line" | "doughnut"
  height?: number
}

// Обновляем цветовую палитру на более приглушенные тона
const GRADIENT_COLORS = [
  { start: "#6366f1", end: "#8b5cf6" }, // Softer purple gradient
  { start: "#ec4899", end: "#f472b6" }, // Softer pink gradient
  { start: "#3b82f6", end: "#06b6d4" }, // Softer blue gradient
  { start: "#10b981", end: "#34d399" }, // Softer green gradient
  { start: "#f59e0b", end: "#fbbf24" }, // Softer orange gradient
  { start: "#8b5cf6", end: "#a78bfa" }, // Softer violet gradient
  { start: "#ef4444", end: "#f87171" }, // Softer red gradient
  { start: "#06b6d4", end: "#67e8f9" }, // Softer cyan gradient
  { start: "#84cc16", end: "#a3e635" }, // Softer lime gradient
]

const SOLID_COLORS = ["#6366f1", "#ec4899", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444", "#06b6d4", "#84cc16"]

export function BeautifulCharts({ data, title, type, height = 400 }: BeautifulChartsProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null)

  console.log(`${title} - Chart data:`, data)

  if (!data || data.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-white to-gray-50 shadow-xl border-0 hover:shadow-2xl transition-all duration-500">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              {title}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
                <Download className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center text-gray-500" style={{ height }}>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-inner">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full animate-pulse"></div>
              </div>
              <p className="text-lg font-medium">No data available</p>
              <p className="text-sm text-gray-400 mt-2">Data will appear here when available</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Создаем градиенты для Canvas
  const createGradient = (ctx: CanvasRenderingContext2D, colorIndex: number) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400)
    const colors = GRADIENT_COLORS[colorIndex % GRADIENT_COLORS.length]
    gradient.addColorStop(0, colors.start)
    gradient.addColorStop(1, colors.end)
    return gradient
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "index" as const,
    },
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 25,
          usePointStyle: true,
          pointStyle: "circle",
          font: {
            size: 13,
            weight: "500" as const,
          },
          color: "#374151",
          generateLabels: (chart: any) => {
            const original = ChartJS.defaults.plugins.legend.labels.generateLabels
            const labels = original.call(this, chart)

            labels.forEach((label: any, index: number) => {
              label.fillStyle = SOLID_COLORS[index % SOLID_COLORS.length]
              label.strokeStyle = SOLID_COLORS[index % SOLID_COLORS.length]
            })

            return labels
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.98)",
        titleColor: "#1F2937",
        bodyColor: "#374151",
        borderColor: "#E5E7EB",
        borderWidth: 1,
        cornerRadius: 12,
        displayColors: true,
        padding: 16,
        titleFont: {
          size: 14,
          weight: "600" as const,
        },
        bodyFont: {
          size: 13,
          weight: "500" as const,
        },
        boxPadding: 8,
        usePointStyle: true,
        callbacks: {
          title: (context: any) => {
            return context[0]?.label || ""
          },
          label: (context: any) => {
            const value = context.parsed?.y ?? context.parsed
            const percentage =
              type === "pie" || type === "doughnut"
                ? ` (${((value / data.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%)`
                : ""
            return `${context.dataset.label}: ${typeof value === "number" ? value.toLocaleString() : value}${percentage}`
          },
        },
        animation: {
          duration: 300,
        },
        external: (context: any) => {
          // Кастомный hover эффект
          const { chart, tooltip } = context
          if (tooltip.opacity === 0) {
            chart.canvas.style.cursor = "default"
            return
          }
          chart.canvas.style.cursor = "pointer"
        },
      },
    },
    scales:
      type === "bar" || type === "line"
        ? {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                color: "#6B7280",
                font: {
                  size: 12,
                  weight: "500" as const,
                },
                maxRotation: 45,
              },
              border: {
                display: false,
              },
            },
            y: {
              grid: {
                color: "#F3F4F6",
                lineWidth: 1,
              },
              ticks: {
                color: "#6B7280",
                font: {
                  size: 12,
                  weight: "500" as const,
                },
                callback: (value: any) => (typeof value === "number" ? value.toLocaleString() : value),
                padding: 10,
              },
              border: {
                display: false,
              },
            },
          }
        : undefined,
    animation: {
      duration: 1500,
      easing: "easeInOutQuart" as const,
    },
    hover: {
      animationDuration: 300,
    },
    onHover: (event: any, elements: any) => {
      event.native.target.style.cursor = elements.length > 0 ? "pointer" : "default"
    },
    onClick: (event: any, elements: any) => {
      if (elements.length > 0) {
        const elementIndex = elements[0].index
        const clickedData = data[elementIndex]
        setSelectedSegment(selectedSegment === clickedData.name ? null : clickedData.name)
        console.log("Clicked on:", clickedData)
      }
    },
  }

  const prepareChartData = () => {
    const labels = data.map((item) => item.name)
    const values = data.map((item) => item.value)

    if (type === "pie" || type === "doughnut") {
      return {
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: (ctx: any) => {
              const canvas = ctx.chart.ctx
              return data.map((_, index) => createGradient(canvas, index))
            },
            borderColor: "#FFFFFF",
            borderWidth: 3,
            hoverBorderWidth: 5,
            hoverOffset: 15,
            cutout: type === "doughnut" ? "60%" : "0%",
            spacing: 2,
            borderRadius: type === "doughnut" ? 8 : 0,
          },
        ],
      }
    }

    if (type === "bar") {
      return {
        labels,
        datasets: [
          {
            label: "Messages",
            data: values,
            backgroundColor: (ctx: any) => {
              const canvas = ctx.chart.ctx
              return data.map((_, index) => createGradient(canvas, index))
            },
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 12,
            borderSkipped: false,
            barThickness: "flex" as const,
            maxBarThickness: 60,
            hoverBackgroundColor: (ctx: any) => {
              const canvas = ctx.chart.ctx
              return data.map((_, index) => {
                const gradient = createGradient(canvas, index)
                return gradient
              })
            },
          },
        ],
      }
    }

    if (type === "line") {
      const datasets = [
        {
          label: "Total Messages",
          data: values,
          borderColor: "#667eea",
          backgroundColor: (ctx: any) => {
            const canvas = ctx.chart.ctx
            const gradient = canvas.createLinearGradient(0, 0, 0, 400)
            gradient.addColorStop(0, "rgba(102, 126, 234, 0.3)")
            gradient.addColorStop(1, "rgba(102, 126, 234, 0.05)")
            return gradient
          },
          borderWidth: 4,
          pointBackgroundColor: "#667eea",
          pointBorderColor: "#FFFFFF",
          pointBorderWidth: 3,
          pointRadius: 8,
          pointHoverRadius: 12,
          pointHoverBackgroundColor: "#667eea",
          pointHoverBorderColor: "#FFFFFF",
          pointHoverBorderWidth: 4,
          fill: true,
          tension: 0.4,
        },
      ]

      // Добавляем линии для delivered и failed если есть данные
      if (data.some((item) => item.delivered !== undefined)) {
        datasets.push({
          label: "Delivered",
          data: data.map((item) => item.delivered || 0),
          borderColor: "#43e97b",
          backgroundColor: "rgba(67, 233, 123, 0.1)",
          borderWidth: 3,
          pointBackgroundColor: "#43e97b",
          pointBorderColor: "#FFFFFF",
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 10,
          pointHoverBackgroundColor: "#43e97b",
          pointHoverBorderColor: "#FFFFFF",
          pointHoverBorderWidth: 3,
          fill: false,
          tension: 0.4,
        })
      }

      if (data.some((item) => item.failed !== undefined)) {
        datasets.push({
          label: "Failed",
          data: data.map((item) => item.failed || 0),
          borderColor: "#f093fb",
          backgroundColor: "rgba(240, 147, 251, 0.1)",
          borderWidth: 3,
          pointBackgroundColor: "#f093fb",
          pointBorderColor: "#FFFFFF",
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 10,
          pointHoverBackgroundColor: "#f093fb",
          pointHoverBorderColor: "#FFFFFF",
          pointHoverBorderWidth: 3,
          fill: false,
          tension: 0.4,
        })
      }

      return {
        labels,
        datasets,
      }
    }

    return { labels: [], datasets: [] }
  }

  const chartData = prepareChartData()

  const renderChart = () => {
    switch (type) {
      case "pie":
        return <Pie data={chartData} options={chartOptions} />
      case "doughnut":
        return <Doughnut data={chartData} options={chartOptions} />
      case "bar":
        return <Bar data={chartData} options={chartOptions} />
      case "line":
        return <Line data={chartData} options={chartOptions} />
      default:
        return <div>Unsupported chart type</div>
    }
  }

  return (
    <Card
      className={`bg-gradient-to-br from-white via-gray-50/50 to-white shadow-xl border-0 hover:shadow-2xl transition-all duration-500 group ${
        isFullscreen ? "fixed inset-4 z-50" : ""
      }`}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              {title}
            </CardTitle>
            {selectedSegment && <p className="text-sm text-blue-600 mt-2 font-medium">Selected: {selectedSegment}</p>}
          </div>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              onClick={() => console.log("Export chart")}
            >
              <Download className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-colors"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div
          style={{
            height: isFullscreen ? "calc(100vh - 200px)" : height,
            position: "relative",
          }}
          className="rounded-lg overflow-hidden"
        >
          {renderChart()}
        </div>

        {/* Дополнительная информация */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3">
              <p className="text-xs text-blue-600 font-medium">Total Items</p>
              <p className="text-lg font-bold text-blue-800">{data.length}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3">
              <p className="text-xs text-green-600 font-medium">Total Value</p>
              <p className="text-lg font-bold text-green-800">
                {data.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3">
              <p className="text-xs text-purple-600 font-medium">Average</p>
              <p className="text-lg font-bold text-purple-800">
                {Math.round(data.reduce((sum, item) => sum + item.value, 0) / data.length).toLocaleString()}
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3">
              <p className="text-xs text-orange-600 font-medium">Max Value</p>
              <p className="text-lg font-bold text-orange-800">
                {Math.max(...data.map((item) => item.value)).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
