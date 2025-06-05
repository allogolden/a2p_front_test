"use client"

import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"

const sampleData = [
  {
    id: "1",
    name: "Daily Cleanup",
    type: "Cron",
    schedule: "0 2 * * *",
    status: "active",
    last_run: "2024-01-15T02:00:00Z",
  },
  {
    id: "2",
    name: "Report Generation",
    type: "Interval",
    schedule: "Every 6 hours",
    status: "active",
    last_run: "2024-01-15T06:00:00Z",
  },
  {
    id: "3",
    name: "Backup Task",
    type: "Clocked",
    schedule: "2024-01-16T03:00:00Z",
    status: "inactive",
    last_run: "2024-01-14T03:00:00Z",
  },
]

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "NAME" },
  { key: "type", label: "TYPE" },
  { key: "schedule", label: "SCHEDULE" },
  { key: "status", label: "STATUS" },
  {
    key: "last_run",
    label: "LAST RUN",
    render: (value: string) => new Date(value).toLocaleString(),
  },
]

const filters = {
  type: ["Cron", "Interval", "Clocked"],
  status: ["active", "inactive"],
}

export default function PeriodicTasksPage() {
  const router = useRouter()

  const handleRowClick = (item: any) => {
    router.push(`/periodic-tasks/periodic-tasks/${item.id}`)
  }

  const handleAdd = () => {
    router.push("/periodic-tasks/periodic-tasks/new")
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Periodic Tasks"
        description="Scheduled and recurring tasks"
        action={{
          label: "Add Task",
          onClick: handleAdd,
          icon: Plus,
        }}
      />

      <DataTable
        columns={columns}
        data={sampleData}
        onRowClick={handleRowClick}
        searchPlaceholder="Search tasks..."
        filters={filters}
      />
    </div>
  )
}
