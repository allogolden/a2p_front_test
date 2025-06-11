"use client"

import { useRouter } from "next/navigation"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"

// Пример данных, соответствующих старой таблице
const sampleData = [
  {
    user: "System",
    timestamp: "09.06.2025 12:37:07,768",
    action: "Create",
    table: "Momessagelog",
    object: "Ihmanafaqa",
    changes: "-",
  },
  {
    user: "System",
    timestamp: "09.06.2025 12:37:06,941",
    action: "Create",
    table: "Momessagelog",
    object: "Ihmanafaqa",
    changes: "-",
  },
  // ... (остальные записи)
]

// Описание колонок
const columns = [
  { key: "user", label: "User" },
  { key: "timestamp", label: "Timestamp"},
  { key: "action", label: "Action" },
  { key: "table", label: "Table" },
  { key: "object", label: "Object" },
  { key: "changes", label: "Changes" },
]

// Пример фильтров (можно добавить по необходимости)
const filters = {
  action: ["Create", "Update", "Delete"],
  table: [
    "Momessagelog",
    "Mtmessagelog",
    // ...все используемые таблицы
  ],
  user: ["System", "admin", "AAbdusamadov", "akhadimetov", "-"],
}

export default function AuditLogsPage() {
  const router = useRouter()

  // Здесь rowClick можно заменить на переход к подробной информации по логу, если потребуется
  const handleRowClick = (item: any) => {
    // router.push(`/audit-logs/${item.id}`) // если есть id
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Audit Logs"
        description="System audit trail and activity logs"
      />

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
