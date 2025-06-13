"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"
import type { MOInterceptorLog } from "@/lib/api/mo-interceptor-logs"
import { moInterceptorLogsAPI } from "@/lib/api/mo-interceptor-logs"

const columns = [
  { key: "system_id", label: "System ID" },
  { key: "source_addr", label: "Source_addr" },
  { key: "destination_addr", label: "Destination_addr" },
  { key: "short_message", label: "Short message" },
  { key: "ip_address", label: "IP Address" },
  { key: "created", label: "Created" },
  { key: "modified", label: "Modified" },
]

const filters = {
  system_id: ["Ihmanafaqa"],
}

export default function MOInterceptorLogsPage() {
  const router = useRouter()
  const [data, setData] = useState<MOInterceptorLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    moInterceptorLogsAPI
      .list()
      .then((list) => setData(list))
      .catch(() => setError("Failed to load logs"))
      .finally(() => setLoading(false))
  }, [])

  const handleRowClick = (item: MOInterceptorLog) => {
    router.push(`/mo-interceptor-logs/${item.id}`)
  }

  const handleAdd = () => router.push("/mo-interceptor-logs/new")

  return (
    <div className="space-y-6">
      <PageHeader
        title="MO Interceptor Logs"
        description="Mobile Originated message interception logs"
      />

      <DataTable
        columns={columns}
        data={data}
        isLoading={loading}
        onRowClick={handleRowClick}
        onAdd={handleAdd}
        searchPlaceholder="Search interceptor logs..."
        filters={filters}
        addLabel="Add Log"
      />
      {error && <div className="text-red-600">{error}</div>}
    </div>
  )
}

