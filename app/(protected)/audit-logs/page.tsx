"use client"

import { useRouter } from "next/navigation"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"

const sampleData = [
  {
    id: "1",
    action: "CREATE",
    resource: "AN_PATTERN",
    user: "admin",
    timestamp: "2024-01-15T10:30:00Z",
    status: "success",
  },
  {
    id: "2",
    action: "UPDATE",
    resource: "PARTNER",
    user: "admin",
    timestamp: "2024-01-15T11:45:00Z",
    status: "success",
  },
  {
    id: "3",
    action: "DELETE",
    resource: "ALPHANAME",
    user: "admin",
    timestamp: "2024-01-15T12:15:00Z",
    status: "failed",
  },
]

const columns = [
  { key: "id", label: "ID" },
  { key: "action", label: "ACTION" },
  { key: "resource", label: "RESOURCE" },
  { key: "user", label: "USER" },
  {
    key: "timestamp",
    label: "TIMESTAMP",
    render: (value: string) => new Date(value).toLocaleString(),
  },
  { key: "status", label: "STATUS" },
]

const filters = {
  action: ["CREATE", "UPDATE", "DELETE"],
  resource: ["AN_PATTERN", "PARTNER", "ALPHANAME"],
  status: ["success", "failed"],
}

export default function AuditLogsPage() {
  const router = useRouter()

  const handleRowClick = (item: any) => {
    router.push(`/audit-logs/${item.id}`)
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Audit Logs" description="System audit trail and activity logs" />

      <DataTable
        columns={columns}
        data={sampleData}
        onRowClick={handleRowClick}
        searchPlaceholder="Search audit logs..."
        filters={filters}
      />
    </div>
  )
}
