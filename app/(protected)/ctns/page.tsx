"use client"

import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"
import type { CTN } from "@/lib/api/ctns"
import { ctnAPI } from "@/lib/api/ctns"


// Колонки по старой таблице
const columns = [
  { key: "system_id", label: "System ID" },
  { key: "category", label: "Category" },
  { key: "ctn", label: "CTN" },
  { key: "ip_address", label: "IP Address" },
  { key: "active", label: "Active" },
  { key: "description", label: "Description" },
  {
    key: "created",
    label: "Created",
    render: (value: string) => value ? value.replace(/,\d+$/, "") : "",
  },
  {
    key: "modified",
    label: "Modified",
    render: (value: string) => value ? value.replace(/,\d+$/, "") : "",
  },
  { key: "created_by", label: "Created By" },
  { key: "updated_by", label: "Updated By" },
]

// Фильтры по нужным полям (пример)
const filters = {
  category: ["Default_category", "Service"],
  active: ["True", "False"],
  system_id: ["20100", "224200"],
}

export default function CTNsPage() {
  const router = useRouter()
  const [data, setData] = useState<CTN[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    ctnAPI
      .list()
      .then((list) => setData(list))
      .catch(() => setError("Failed to load CTNs"))
      .finally(() => setLoading(false))
  }, [])

  const handleRowClick = (item: CTN) => {
    router.push(`/ctns/${item.id}`)
  }

  const handleAdd = () => {
    router.push("/ctns/new")
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="CTNs"
        description="Calling/Called Telephone Numbers management"
        action={{
          label: "Add CTN",
          onClick: handleAdd,
          icon: Plus,
        }}
      />

      <DataTable
        columns={columns}
        data={data}
        isLoading={loading}
        onRowClick={handleRowClick}
        searchPlaceholder="Search CTNs..."
        filters={filters}
      />
      {error && <div className="text-red-600">{error}</div>}
    </div>
  )
}
