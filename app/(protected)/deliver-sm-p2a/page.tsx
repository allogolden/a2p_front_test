"use client"

import { useRouter } from "next/navigation"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"

// Данные в формате старой таблицы
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
  {
    smpp_message_id: "D6A5F9F3",
    delivery_status: "Delivered",
    message_content_snippet: "DELIVRD",
    created_at: "June 9, 2025, 12:36 p.m.",
  },
  {
    smpp_message_id: "D6AD4351",
    delivery_status: "Delivered",
    message_content_snippet: "DELIVRD",
    created_at: "June 9, 2025, 12:36 p.m.",
  },
  {
    smpp_message_id: "D6A5E6F3",
    delivery_status: "Delivered",
    message_content_snippet: "DELIVRD",
    created_at: "June 9, 2025, 12:36 p.m.",
  },
  // ...добавляй остальные строки по необходимости
]

// Колонки для таблицы
const columns = [
  { key: "smpp_message_id", label: "SMPP Message ID" },
  { key: "delivery_status", label: "Delivery status" },
  { key: "message_content_snippet", label: "Message Content Snippet" },
  { key: "created_at", label: "Created at" },
]

// Фильтры для таблицы (пример)
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

export default function DeliverSMP2APage() {
  const router = useRouter()

  const handleRowClick = (item: any) => {
    router.push(`/deliver-sm-p2a/${item.smpp_message_id}`)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Deliver SM (P2A)"
        description="Person-to-Application delivery messages"
      />

      <DataTable
        columns={columns}
        data={sampleData}
        onRowClick={handleRowClick}
        searchPlaceholder="Search P2A messages..."
        filters={filters}
      />
    </div>
  )
}
