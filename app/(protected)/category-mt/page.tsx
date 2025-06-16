"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState, useMemo } from "react"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"
import type { CategoryMT } from "@/lib/api/category-mt"
import { categoryMTAPI } from "@/lib/api/category-mt"
import type { CategoryStatistic } from "@/lib/api/category-statistics"
import { categoryStatisticsAPI } from "@/lib/api/category-statistics"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

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

// Columns and filters for category statistics table
const statsColumns = [
  { key: "name", label: "Name" },
  { key: "ctn", label: "CTN" },
  { key: "message_types", label: "Message Types" },
  { key: "pattern_stats", label: "Pattern Stats" },
  { key: "source_types", label: "Source Types" },
  { key: "last_updated", label: "Last Updated" },
]

const statsFilters = {
  name: [
    "Default_category",
    "eGov",
    "Reklama",
    "Reklama (Digital)",
    "Service",
    "Transaction",
    "Transactions",
  ],
}

export default function CategoryMTPage() {
  const router = useRouter()
  const [data, setData] = useState<CategoryMT[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState<CategoryStatistic[]>([])
  const [statsLoading, setStatsLoading] = useState(true)
  const [statsError, setStatsError] = useState<string | null>(null)

  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")

  const filteredStats = useMemo(() => {
    return stats.filter((s) => {
      const date = s.last_updated.split(" ")[0]
      if (dateFrom && date < dateFrom) return false
      if (dateTo && date > dateTo) return false
      return true
    })
  }, [stats, dateFrom, dateTo])

  const messagesByCategory = filteredStats.map((s) => ({
    name: s.name,
    value: parseInt(s.message_types.match(/Total:\s*(\d+)/)?.[1] || "0"),
  }))

  const sourceTypesTotals = filteredStats.reduce(
    (acc, s) => {
      acc.alphaname += parseInt(s.source_types.match(/Alphaname:\s*(\d+)/)?.[1] || "0")
      acc.shortNumber += parseInt(s.source_types.match(/Short Number:\s*(\d+)/)?.[1] || "0")
      return acc
    },
    { alphaname: 0, shortNumber: 0 }
  )

  const sourceTypesData = [
    { name: "Alphaname", value: sourceTypesTotals.alphaname },
    { name: "Short Number", value: sourceTypesTotals.shortNumber },
  ]

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
        <Card>
          <CardHeader>
            <CardTitle>Category Statistics</CardTitle>
            <div className="mt-4 flex flex-wrap items-end gap-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="date-from">From</Label>
                <Input
                  id="date-from"
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="max-w-[160px]"
                />
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="date-to">To</Label>
                <Input
                  id="date-to"
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="max-w-[160px]"
                />
              </div>
              <Button
                variant="ghost"
                onClick={() => {
                  setDateFrom("")
                  setDateTo("")
                }}
              >
                Reset
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <DataTable
              columns={statsColumns}
              data={filteredStats}
              isLoading={statsLoading}
              onRowClick={handleStatsRowClick}
              searchPlaceholder="Search statistics..."
              filters={statsFilters}
            />
            {statsError && <div className="text-red-600">{statsError}</div>}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border bg-card p-4">
                <h3 className="mb-2 text-lg font-bold">Messages by Category</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={messagesByCategory} dataKey="value" nameKey="name" outerRadius={80}>
                      {messagesByCategory.map((entry, index) => (
                        <Cell key={`mc-${index}`} fill={index % 2 === 0 ? '#8884d8' : '#82ca9d'} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <h3 className="mb-2 text-lg font-bold">Source Types</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={sourceTypesData} dataKey="value" nameKey="name" outerRadius={80}>
                      {sourceTypesData.map((entry, index) => (
                        <Cell key={`st-${index}`} fill={index === 0 ? '#82ca9d' : '#8884d8'} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
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
