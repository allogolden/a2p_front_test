"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"
import type { MTInterceptorLog } from "@/lib/api/mt-interceptor-logs"
import { mtInterceptorLogsAPI } from "@/lib/api/mt-interceptor-logs"

const columns = [
  { key: "source_addr", label: "Source_addr" },
  { key: "system_id", label: "System ID" },
  { key: "destination_addr", label: "Destination_addr" },
  { key: "ip_address", label: "IP Address" },
  { key: "short_message", label: "Short message" },
  { key: "category", label: "Category" },
  { key: "mt_interceptor_id", label: "MT Interceptor ID" },
  { key: "category_id", label: "Category ID" },
  { key: "created", label: "Created" },
  { key: "modified", label: "Modified" },
]

const filters = {
  category: ["eGov", "-"],
  // Добавь дополнительные фильтры, если нужно
}

export default function MTInterceptorLogsPage() {
  const router = useRouter()
  const [data, setData] = useState<MTInterceptorLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    mtInterceptorLogsAPI
      .list()
      .then((list) => setData(list))
      .catch(() => setError("Failed to load logs"))
      .finally(() => setLoading(false))
  }, [])

  const handleRowClick = (item: MTInterceptorLog) => {
    router.push(`/mt-interceptor-logs/${item.id}`)
  }

  const handleAdd = () => router.push("/mt-interceptor-logs/new")

  return (
    <div className="space-y-6">
      <PageHeader title="MT Interceptor Logs" description="Mobile Terminated message interception logs" />
      <DataTable
        columns={columns}
        data={data}
        isLoading={loading}
        onRowClick={handleRowClick}
        onAdd={handleAdd}
        searchPlaceholder="Search MT interceptor logs..."
        filters={filters}
        addLabel="Add Log"
      />
      {error && <div className="text-red-600">{error}</div>}
    </div>
  )
}
