"use client"

import { useRouter } from "next/navigation"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"

// Пример данных из старой таблицы
const sampleData = [
  {
    smpp_message_id: "D6AE74D1",
    delivery_status: "Delivered",
    message_content_snippet: "DELIVRD",
    created_at: "June 9, 2025, 12:37 p.m.",
  },
  {
    smpp_message_id: "D6A72BD3",
    delivery_status: "Delivered",
    message_content_snippet: "DELIVRD",
    created_at: "June 9, 2025, 12:37 p.m.",
  },
  {
    smpp_message_id: "D6AE5661",
    delivery_status: "Delivered",
    message_content_snippet: "DELIVRD",
    created_at: "June 9, 2025, 12:37 p.m.",
  },
  // ... (добавь остальные по необходимости)
]

// Колонки по старой таблице
const columns = [
  { key: "smpp_message_id", label: "SMPP Message ID" },
  { key: "delivery_status", label: "Delivery status" },
  { key: "message_content_snippet", label: "Message Content Snippet" },
  { key: "created_at", label: "Created at" },
]

// Фильтры, аналогичные тем, что в интерфейсе
const filters = {
  delivery_status: [
    "Delivered",
    "Undelivered",
    "Rejected",
    "Accepted",
    "Unknown",
    "P2A",
  ],
}

export default function DeliverSMDLRPage() {
  const router = useRouter()

  const handleRowClick = (item: any) => {
    router.push(`/deliver-sm-dlr/${item.smpp_message_id}`)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Deliver SM (DLR)"
        description="Delivery receipt messages log"
      />

      <DataTable
        columns={columns}
        data={sampleData}
        onRowClick={handleRowClick}
        searchPlaceholder="Search delivery receipts..."
        filters={filters}
      />
    </div>
  )
}
