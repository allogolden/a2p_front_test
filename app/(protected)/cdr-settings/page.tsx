"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"
import type { CDRSetting } from "@/lib/api/cdr-settings"
import { cdrSettingsAPI } from "@/lib/api/cdr-settings"


// Колонки под старую таблицу
const columns = [
  { key: "cdr_setting", label: "CDR Setting" },
  { key: "sms_process_batch", label: "How many sms(MT+MO) to process by CDR worker at once" },
  { key: "generation_time_value", label: "Generation time value" },
  { key: "event_type", label: "Event type" },
]

const filters = {
  event_type: ["On SMS Delivery to Abonent"],
}

export default function CDRSettingsPage() {
  const router = useRouter()
  const [data, setData] = useState<CDRSetting[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    cdrSettingsAPI
      .list()
      .then((list) => setData(list))
      .catch(() => setError("Failed to load settings"))
      .finally(() => setLoading(false))
  }, [])

  const handleRowClick = (item: any) => {
    router.push(`/cdr-settings/${item.cdr_setting}`)
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
        data={data}
        isLoading={loading}
        onRowClick={handleRowClick}
        searchPlaceholder="Search CDR settings..."
        filters={filters}
      />
      {error && <div className="text-red-600">{error}</div>}
    </div>
  )
}
