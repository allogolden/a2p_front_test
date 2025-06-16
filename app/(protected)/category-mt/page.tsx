"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"
import { StatisticsPanel } from "@/components/common/statistics-panel"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { CategoryMT } from "@/lib/api/category-mt"
import { categoryMTAPI } from "@/lib/api/category-mt"
import type { CategoryStatistic } from "@/lib/api/category-statistics"
import { categoryStatisticsAPI } from "@/lib/api/category-statistics"


const columns = [
  { key: "name", label: "Category Name" },
  { key: "ip_address", label: "IP Address" },
  { key: "cdr", label: "CDR" },
  { key: "sms_type_number", label: "SMS Type Number" },
  {
    key: "created",
    label: "Created",
    render: (value: string) => new Date(value).toLocaleDateString(),
  },
  {
    key: "modified",
    label: "Modified",
    render: (value: string) => new Date(value).toLocaleDateString(),
  },
  { key: "created_by", label: "Created By" },
  { key: "updated_by", label: "Updated By" },
]

const filters = {
  name: ["Default_category", "eGov", "Reklama", "Service", "Transaction"],
  cdr: ["enabled", "disabled"],
  created_by: ["admin", "operator"],
}

export default function CategoryMTPage() {
  const router = useRouter()
  const [data, setData] = useState<CategoryMT[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState<CategoryStatistic[]>([])
  const [statsLoading, setStatsLoading] = useState(true)
  const [statsError, setStatsError] = useState<string | null>(null)
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")

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
      .list(fromDate || undefined, toDate || undefined)
      .then((list) => setStats(list))
      .catch(() => setStatsError("Failed to load statistics"))
      .finally(() => setStatsLoading(false))
  }, [fromDate, toDate])

  const handleRowClick = (item: CategoryMT) => {
    router.push(`/category-mt/${item.id}`)
  }

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/category-mt/${categoryId}`)
  }

  const handleAdd = () => {
    router.push("/category-mt/new")
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Category MT"
        description="Mobile Terminated message categories and analytics"
        action={{
          label: "Add Category",
          onClick: handleAdd,
          icon: Plus,
        }}
      />

      <div className="flex items-end gap-4">
        <div className="space-y-2">
          <Label htmlFor="from-date">From</Label>
          <Input
            id="from-date"
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="to-date">To</Label>
          <Input
            id="to-date"
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
      </div>

      <StatisticsPanel data={stats} isLoading={statsLoading} onCategoryClick={handleCategoryClick} />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Category Management</h2>
        <DataTable
          columns={columns}
          data={data}
          isLoading={loading}
          onRowClick={handleRowClick}
          onAdd={handleAdd}
          addLabel="Add Category"
          searchPlaceholder="Search categories..."
          filters={filters}
        />
        {error && <div className="text-red-600 dark:text-red-400">{error}</div>}
      </div>
    </div>
  )
}

