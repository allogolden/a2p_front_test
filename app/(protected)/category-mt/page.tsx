"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState, useMemo } from "react"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { PageHeader } from "@/components/common/page-header"
import type { CategoryMT } from "@/lib/api/category-mt"
import { categoryMTAPI } from "@/lib/api/category-mt"
import type { CategoryStatistic } from "@/lib/api/category-statistics"
import { categoryStatisticsAPI } from "@/lib/api/category-statistics"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Данные теперь загружаются через API

// Колонки по старой таблице
const columns = [
  { key: "name", label: "Category Name" },
  { key: "ip_address", label: "IP Address" },
  { key: "cdr", label: "Cdr" },
  { key: "sms_type_number", label: "SMS type number" },
  { 
    key: "created", 
    label: "Created",
    render: (value: string) => value ? value.replace(/,\d+$/, "") : ""
  },
  { 
    key: "modified", 
    label: "Modified",
    render: (value: string) => value ? value.replace(/,\d+$/, "") : ""
  },
  { key: "created_by", label: "Created By" },
  { key: "updated_by", label: "Updated By" },
]

// Фильтры (по имени категории)
const filters = {
  name: [
    "Default_category",
    "eGov",
    "Reklama",
    "Service",
    "Transaction",
    "Transactions",
  ]
}

function StatsTable({
  data,
  isLoading,
  onRowClick,
}: {
  data: CategoryStatistic[]
  isLoading: boolean
  onRowClick?: (item: CategoryStatistic) => void
}) {
  if (isLoading) {
    return (
      <div className="rounded-lg border bg-card p-8">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="rounded-lg border bg-card overflow-auto">
      <Table>
        <TableBody>
          {data.map((item) => (
            <TableRow
              key={item.id}
              className="cursor-pointer hover:bg-muted"
              onClick={() => onRowClick?.(item)}
            >
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.ctn}</TableCell>
              <TableCell>{item.message_types}</TableCell>
              <TableCell>{item.pattern_stats}</TableCell>
              <TableCell>{item.source_types}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


export default function CategoryMTPage() {
  const router = useRouter()
  const [data, setData] = useState<CategoryMT[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState<CategoryStatistic[]>([])
  const [statsLoading, setStatsLoading] = useState(true)
  const [statsError, setStatsError] = useState<string | null>(null)

  const [chartOpts, setChartOpts] = useState({
    messageTypes: true,
    patternStats: true,
    sourceTypes: true,
  })

  const chartData = useMemo(() => {
    return stats.map((s) => {
      const msg = s.message_types.match(/Total:\s*(\d+)\s*\(SAR:\s*(\d+),\s*UDH:\s*(\d+),\s*Payload:\s*(\d+),\s*Simple:\s*(\d+)\)/)
      const pattern = s.pattern_stats.match(/Pattern Matched:\s*(\d+),\s*Auto Categorized:\s*(\d+)/)
      const source = s.source_types.match(/Alphaname:\s*(\d+),\s*Short Number:\s*(\d+)/)
      return {
        name: s.name,
        total: parseInt(msg?.[1] || "0"),
        sar: parseInt(msg?.[2] || "0"),
        udh: parseInt(msg?.[3] || "0"),
        payload: parseInt(msg?.[4] || "0"),
        simple: parseInt(msg?.[5] || "0"),
        patternMatched: parseInt(pattern?.[1] || "0"),
        autoCategorized: parseInt(pattern?.[2] || "0"),
        alphaname: parseInt(source?.[1] || "0"),
        shortNumber: parseInt(source?.[2] || "0"),
      }
    })
  }, [stats])

  useEffect(() => {
    setLoading(true)
    categoryMTAPI
      .list()
      .then((list) => setData(list))
      .catch(() => setError("Failed to load categories"))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    setStatsLoading(true)
    categoryStatisticsAPI
      .list()
      .then((list) => setStats(list))
      .catch(() => setStatsError("Failed to load statistics"))
      .finally(() => setStatsLoading(false))
  }, [])

  const handleRowClick = (item: CategoryMT) => {
    router.push(`/category-mt/${item.id}`)
  }

  const handleStatsRowClick = (item: CategoryStatistic) => {
    router.push(`/category-statistics/${item.id}`)
  }

  const handleAdd = () => {
    router.push("/category-mt/new")
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Category MT"
        description="Mobile Terminated message categories"
        action={{
          label: "Add Category",
          onClick: handleAdd,
          icon: Plus,
        }}
      />

      <div className="space-y-4">
        <StatsTable
          data={stats}
          isLoading={statsLoading}
          onRowClick={handleStatsRowClick}
        />
        {statsError && <div className="text-red-600">{statsError}</div>}

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={chartOpts.messageTypes}
              onCheckedChange={() =>
                setChartOpts({ ...chartOpts, messageTypes: !chartOpts.messageTypes })
              }
            />
            Message Types
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={chartOpts.patternStats}
              onCheckedChange={() =>
                setChartOpts({ ...chartOpts, patternStats: !chartOpts.patternStats })
              }
            />
            Pattern Stats
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={chartOpts.sourceTypes}
              onCheckedChange={() =>
                setChartOpts({ ...chartOpts, sourceTypes: !chartOpts.sourceTypes })
              }
            />
            Source Types
          </label>
        </div>

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          {chartOpts.messageTypes && (
            <div className="rounded-lg border bg-card p-4">
              <h3 className="mb-2 text-lg font-bold">Message Types</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sar" stackId="a" fill="#8884d8" name="SAR" />
                  <Bar dataKey="udh" stackId="a" fill="#82ca9d" name="UDH" />
                  <Bar dataKey="payload" stackId="a" fill="#ffc658" name="Payload" />
                  <Bar dataKey="simple" stackId="a" fill="#ff7f50" name="Simple" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
          {chartOpts.patternStats && (
            <div className="rounded-lg border bg-card p-4">
              <h3 className="mb-2 text-lg font-bold">Pattern Stats</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="patternMatched" stackId="a" fill="#8884d8" name="Pattern Matched" />
                  <Bar dataKey="autoCategorized" stackId="a" fill="#82ca9d" name="Auto Categorized" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
          {chartOpts.sourceTypes && (
            <div className="rounded-lg border bg-card p-4">
              <h3 className="mb-2 text-lg font-bold">Source Types</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="alphaname" stackId="a" fill="#82ca9d" name="Alphaname" />
                  <Bar dataKey="shortNumber" stackId="a" fill="#8884d8" name="Short Number" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data}
        isLoading={loading}
        onRowClick={handleRowClick}
        searchPlaceholder="Search categories..."
        filters={filters}
      />
      {error && <div className="text-red-600">{error}</div>}
    </div>
  )
}
