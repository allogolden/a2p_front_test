"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"
import type { CategoryStatistic } from "@/lib/api/category-statistics"
import { categoryStatisticsAPI } from "@/lib/api/category-statistics"

// Колонки для таблицы
const columns = [
  { key: "name", label: "Name" },
  { key: "ctn", label: "CTN" },
  { key: "message_types", label: "Message Types" },
  { key: "pattern_stats", label: "Pattern Stats" },
  { key: "source_types", label: "Source Types" },
  { key: "last_updated", label: "Last Updated" },
]

// Пример фильтров по имени
const filters = {
  name: [
    "Default_category",
    "eGov",
    "Reklama",
    "Reklama (Digital)",
    "Service",
    "Transaction",
    "Transactions",
  ]
}

export default function CategoryStatisticsPage() {
  const router = useRouter()
  const [data, setData] = useState<CategoryStatistic[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    categoryStatisticsAPI
      .list()
      .then((list) => setData(list))
      .catch(() => setError("Failed to load statistics"))
      .finally(() => setLoading(false))
  }, [])

  const handleRowClick = (item: CategoryStatistic) => {
    router.push(`/category-statistics/${item.id}`)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Category Statistics"
        description="Message category performance statistics"
      />

      <DataTable
        columns={columns}
        data={data}
        isLoading={loading}
        onRowClick={handleRowClick}
        searchPlaceholder="Search statistics..."
        filters={filters}
      />
      {error && <div className="text-red-600">{error}</div>}
    </div>
  )
}
