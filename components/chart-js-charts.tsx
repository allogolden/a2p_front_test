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

interface ChartJSChartsProps {
  data: ChartData[]
  title: string
  type: "pie" | "bar" | "line" | "doughnut"
  height?: number
}

const COLORS = [
  "#3B82F6", // blue
  "#10B981", // green
  "#F59E0B", // yellow
  "#EF4444", // red
  "#8B5CF6", // purple
  "#06B6D4", // cyan
  "#84CC16", // lime
  "#F97316", // orange
  "#EC4899", // pink
]

export function ChartJSCharts({ data, title, type, height = 400 }: ChartJSChartsProps) {
  console.log(`${title} - Chart data:`, data)

  if (!data || data.length === 0) {
    return (
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center text-gray-500" style={{ height }}>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              </div>
              <p>No data available</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#1F2937",
        bodyColor: "#374151",
        borderColor: "#E5E7EB",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: (context: any) => {
            const value = context.parsed?.y ?? context.parsed
            return `${context.label}: ${typeof value === "number" ? value.toLocaleString() : value}`
          },
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
              },
            },
            y: {
              grid: {
                color: "#F3F4F6",
              },
              ticks: {
                color: "#6B7280",
                callback: (value: any) => (typeof value === "number" ? value.toLocaleString() : value),
              },
            },
          }
        : undefined,
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
            backgroundColor: COLORS.slice(0, data.length),
            borderColor: "#FFFFFF",
            borderWidth: 2,
            hoverBorderWidth: 3,
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
            backgroundColor: COLORS[0],
            borderColor: COLORS[0],
            borderWidth: 0,
            borderRadius: 6,
            borderSkipped: false,
          },
        ],
      }
    }

    if (type === "line") {
      const datasets = [
        {
          label: "Total Messages",
          data: values,
          borderColor: COLORS[0],
          backgroundColor: COLORS[0] + "20",
          borderWidth: 3,
          pointBackgroundColor: COLORS[0],
          pointBorderColor: "#FFFFFF",
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
          fill: true,
          tension: 0.4,
        },
      ]

      // Добавляем линии для delivered и failed если есть данные
      if (data.some((item) => item.delivered !== undefined)) {
        datasets.push({
          label: "Delivered",
          data: data.map((item) => item.delivered || 0),
          borderColor: COLORS[1],
          backgroundColor: COLORS[1] + "20",
          borderWidth: 2,
          pointBackgroundColor: COLORS[1],
          pointBorderColor: "#FFFFFF",
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: false,
          tension: 0.4,
        })
      }

      if (data.some((item) => item.failed !== undefined)) {
        datasets.push({
          label: "Failed",
          data: data.map((item) => item.failed || 0),
          borderColor: COLORS[3],
          backgroundColor: COLORS[3] + "20",
          borderWidth: 2,
          pointBackgroundColor: COLORS[3],
          pointBorderColor: "#FFFFFF",
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
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
    <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height, position: "relative" }}>{renderChart()}</div>
      </CardContent>
    </Card>
  )
}
