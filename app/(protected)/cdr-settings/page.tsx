"use client"

import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"

const sampleData = [
  { id: "1", name: "Default CDR", format: "CSV", retention_days: "90", status: "active" },
  { id: "2", name: "Partner CDR", format: "JSON", retention_days: "30", status: "active" },
  { id: "3", name: "Archive CDR", format: "XML", retention_days: "365", status: "inactive" },
]

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "NAME" },
  { key: "format", label: "FORMAT" },
  { key: "retention_days", label: "RETENTION DAYS" },
  { key: "status", label: "STATUS" },
]

const filters = {
  format: ["CSV", "JSON", "XML"],
  status: ["active", "inactive"],
}

export default function CDRSettingsPage() {
  const router = useRouter()

  const handleRowClick = (item: any) => {
    router.push(`/cdr-settings/${item.id}`)
  }

  const handleAdd = () => {
    router.push("/cdr-settings/new")
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="CDR Settings"
        description="Call Detail Record configuration settings"
        action={{
          label: "Add CDR Setting",
          onClick: handleAdd,
          icon: Plus,
        }}
      />

      <DataTable
        columns={columns}
        data={sampleData}
        onRowClick={handleRowClick}
        searchPlaceholder="Search CDR settings..."
        filters={filters}
      />
    </div>
  )
}
