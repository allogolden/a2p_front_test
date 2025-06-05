"use client"

import { useRouter } from "next/navigation"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"

const sampleData = [
  { id: "1", message_id: "INT001", action: "BLOCK", reason: "Spam detected", timestamp: "2024-01-15T10:30:00Z" },
  { id: "2", message_id: "INT002", action: "ALLOW", reason: "Valid message", timestamp: "2024-01-15T10:31:00Z" },
  {
    id: "3",
    message_id: "INT003",
    action: "QUARANTINE",
    reason: "Suspicious content",
    timestamp: "2024-01-15T10:32:00Z",
  },
]

const columns = [
  { key: "id", label: "ID" },
  { key: "message_id", label: "MESSAGE ID" },
  { key: "action", label: "ACTION" },
  { key: "reason", label: "REASON" },
  {
    key: "timestamp",
    label: "TIMESTAMP",
    render: (value: string) => new Date(value).toLocaleString(),
  },
]

const filters = {
  action: ["BLOCK", "ALLOW", "QUARANTINE"],
}

export default function MOInterceptorLogsPage() {
  const router = useRouter()

  const handleRowClick = (item: any) => {
    router.push(`/mo-interceptor-logs/${item.id}`)
  }

  return (
    <div className="space-y-6">
      <PageHeader title="MO Interceptor Logs" description="Mobile Originated message interception logs" />

      <DataTable
        columns={columns}
        data={sampleData}
        onRowClick={handleRowClick}
        searchPlaceholder="Search interceptor logs..."
        filters={filters}
      />
    </div>
  )
}
