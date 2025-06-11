"use client"

import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"

const sampleData = [
  {
    id: "1",
    name: "celery.backend_cleanup",
    enabled: true,
    scheduler: "0 4 * * * (m/h/dM/MY/d) Asia/Tashkent",
    interval_schedule: "-",
    start_datetime: null,
    last_run: "2025-06-10T04:00:00+05:00",
    one_off: false,
  },
  {
    id: "2",
    name: "process-cdr-periodic-task",
    enabled: true,
    scheduler: "every 4 seconds",
    interval_schedule: "every 4 seconds",
    start_datetime: null,
    last_run: "2025-06-10T15:37:00+05:00",
    one_off: false,
  },
]

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "NAME" },
  { key: "enabled", label: "ENABLED", render: (v: boolean) => v ? "Yes" : "No" },
  { key: "scheduler", label: "SCHEDULER" },
  { key: "interval_schedule", label: "INTERVAL SCHEDULE" },
  { key: "start_datetime", label: "START DATETIME", render: (v: string) => v ? new Date(v).toLocaleString() : "-" },
  { key: "last_run", label: "LAST RUN DATETIME", render: (v: string) => v ? new Date(v).toLocaleString() : "-" },
  { key: "one_off", label: "ONE-OFF TASK", render: (v: boolean) => v ? "Yes" : "No" },
]

const filters = {
  enabled: ["Yes", "No"],
  scheduler: ["Cron", "Interval", "Clocked"], // если хочешь фильтровать по типу расписания
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
