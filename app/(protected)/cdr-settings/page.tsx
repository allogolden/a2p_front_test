"use client"

import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"

// Данные соответствуют структуре старой таблицы
const sampleData = [
  {
    cdr_setting: "CDR Settings Configuration",
    sms_process_batch: "4",
    generation_time_value: "4",
    event_type: "On SMS Delivery to Abonent",
  },
]

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
        data={sampleData}
        onRowClick={handleRowClick}
        searchPlaceholder="Search CDR settings..."
        filters={filters}
      />
    </div>
  )
}
