"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
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

  const chartData = stats.map((s) => ({
    name: s.name,
    total: parseInt(s.message_types.match(/Total:\s*(\d+)/)?.[1] || "0"),
    alphaname: parseInt(s.source_types.match(/Alphaname:\s*(\d+)/)?.[1] || "0"),
    shortNumber: parseInt(s.source_types.match(/Short Number:\s*(\d+)/)?.[1] || "0"),
  }))

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
        <h2 className="text-xl font-bold">Category Statistics</h2>
        <DataTable
          columns={statsColumns}
          data={stats}
          isLoading={statsLoading}
          onRowClick={handleStatsRowClick}
          searchPlaceholder="Search statistics..."
          filters={statsFilters}
        />
        {statsError && <div className="text-red-600">{statsError}</div>}

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-4">
            <h3 className="mb-2 text-lg font-bold">Messages by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#8884d8" name="Total" />
              </BarChart>
            </ResponsiveContainer>
          </div>
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
