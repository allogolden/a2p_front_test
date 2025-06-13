"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"
import type { AuditLog } from "@/lib/api/audit-logs"
import { auditLogsAPI } from "@/lib/api/audit-logs"

// Данные журнала загружаются через API
const filters = {
  action: ["Create", "Update", "Delete"],
  table: ["Momessagelog", "Mtmessagelog"],
  user: ["System", "admin", "AAbdusamadov", "akhadimetov", "-"],
}

const columns = [
  { key: "user", label: "User" },
  { key: "timestamp", label: "Timestamp"},
  { key: "action", label: "Action" },
  { key: "table", label: "Table" },
  { key: "object", label: "Object" },
  { key: "changes", label: "Changes" },
]

export default function AuditLogsPage() {
  const router = useRouter()
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    auditLogsAPI
      .list()
      .then((data) => setLogs(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const handleRowClick = (item: AuditLog) => {
    router.push(`/audit-logs/${item.id}`)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Audit Logs"
        description="System audit trail and activity logs"
      />

      <DataTable
        columns={columns}
        data={logs}
        onRowClick={handleRowClick}
        searchPlaceholder="Search audit logs..."
        filters={filters}
        isLoading={loading}
      />
      {error && <div className="text-red-600">{error}</div>}
    </div>
  )
}
