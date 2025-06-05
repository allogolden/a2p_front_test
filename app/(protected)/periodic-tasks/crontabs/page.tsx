"use client"

import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"

const sampleData = [
  { id: "1", name: "Daily Report", schedule: "0 9 * * *", task: "generate_daily_report", status: "active" },
  { id: "2", name: "Cleanup Logs", schedule: "0 2 * * 0", task: "cleanup_old_logs", status: "active" },
  { id: "3", name: "Backup Database", schedule: "0 3 * * *", task: "backup_database", status: "inactive" },
]

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "NAME" },
  { key: "schedule", label: "SCHEDULE" },
  { key: "task", label: "TASK" },
  { key: "status", label: "STATUS" },
]

const filters = {
  status: ["active", "inactive"],
}

export default function CrontabsPage() {
  const router = useRouter()

  const handleRowClick = (item: any) => {
    router.push(`/periodic-tasks/crontabs/${item.id}`)
  }

  const handleAdd = () => {
    router.push("/periodic-tasks/crontabs/new")
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Crontabs"
        description="Manage scheduled cron tasks"
        action={{
          label: "Add Crontab",
          onClick: handleAdd,
          icon: Plus,
        }}
      />

      <DataTable
        columns={columns}
        data={sampleData}
        onRowClick={handleRowClick}
        searchPlaceholder="Search crontabs..."
        filters={filters}
      />
    </div>
  )
}
