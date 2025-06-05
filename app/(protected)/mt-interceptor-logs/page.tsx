"use client"

import { useRouter } from "next/navigation"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"

const sampleData = [
  {
    id: "1",
    message_id: "MTINT001",
    action: "BLOCK",
    reason: "Rate limit exceeded",
    timestamp: "2024-01-15T10:30:00Z",
  },
  { id: "2", message_id: "MTINT002", action: "ALLOW", reason: "Valid message", timestamp: "2024-01-15T10:31:00Z" },
  { id: "3", message_id: "MTINT003", action: "MODIFY", reason: "Content filter", timestamp: "2024-01-15T10:32:00Z" },
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
  action: ["BLOCK", "ALLOW", "MODIFY", "QUARANTINE"],
}

export default function MTInterceptorLogsPage() {
  const router = useRouter()

  const handleRowClick = (item: any) => {
    router.push(`/mt-interceptor-logs/${item.id}`)
  }

  return (
    <div className="space-y-6">
      <PageHeader title="MT Interceptor Logs" description="Mobile Terminated message interception logs" />

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
