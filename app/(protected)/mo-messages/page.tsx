"use client"

import { useRouter } from "next/navigation"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"

// Пример данных по старой структуре
const sampleData = [
  {
    queue_message_id: "2D6FE4F8,698A4BE4,ECC36CD7",
    smpp_message_id: "D6AE5661,D6A72BD3,D6AE74D1",
    source_addr: "Ihmanafaqa",
    destination_addr: "998909125286",
    category: "eGov",
    submit_status: "-",
    submit_resp_status: "CommandStatus.ESME_ROK",
    delivery_status: "DELIVRD",
    mt_interceptor_log_id: "b3e71e9a-f667-4ba7-b8d8-68ef33c2be9f",
    process_status: "Completed",
    sent_at: "June 9, 2025, 12:37 p.m.",
    delivered_at: "June 9, 2025, 12:37 p.m.",
  },
  {
    queue_message_id: "742B08B7,2764CEC7,8F2CBAE1",
    smpp_message_id: "D6A5E6F3,D6A5F9F3,D6AD4351",
    source_addr: "Ihmanafaqa",
    destination_addr: "998910059727",
    category: "-",
    submit_status: "-",
    submit_resp_status: "CommandStatus.ESME_ROK",
    delivery_status: "DELIVRD",
    mt_interceptor_log_id: "-",
    process_status: "Completed",
    sent_at: "June 9, 2025, 12:36 p.m.",
    delivered_at: "June 9, 2025, 12:36 p.m.",
  },
  {
    queue_message_id: "5D5E29AF,F5A6DCFB,1649A9D4",
    smpp_message_id: "D6885401,D68867E1,D6887A31",
    source_addr: "Ihmanafaqa",
    destination_addr: "998909125286",
    category: "-",
    submit_status: "-",
    submit_resp_status: "CommandStatus.ESME_ROK",
    delivery_status: "DELIVRD",
    mt_interceptor_log_id: "-",
    process_status: "Completed",
    sent_at: "June 9, 2025, 12:27 p.m.",
    delivered_at: "June 9, 2025, 12:27 p.m.",
  },
  // ...добавь остальные строки, если нужно
]

// Колонки из старой таблицы
const columns = [
  { key: "queue_message_id", label: "Queue Message ID" },
  { key: "smpp_message_id", label: "SMPP Message ID" },
  { key: "source_addr", label: "Source addr" },
  { key: "destination_addr", label: "Destination addr" },
  { key: "category", label: "Category" },
  { key: "submit_status", label: "Submit status" },
  { key: "submit_resp_status", label: "Submit resp status" },
  { key: "delivery_status", label: "Delivery status" },
  { key: "mt_interceptor_log_id", label: "Mt interceptor log id" },
  { key: "process_status", label: "Process status" },
  { key: "sent_at", label: "Sent at" },
  { key: "delivered_at", label: "Delivered at" },
]

// Пример фильтров (можешь добавить другие)
const filters = {
  delivery_status: ["DELIVRD", "UNDELIV", "REJECTED"],
  process_status: ["Completed", "Failed", "Pending"],
}

export default function MOMessagesPage() {
  const router = useRouter()

  const handleRowClick = (item: any) => {
    router.push(`/mo-messages/${item.queue_message_id}`)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="MO Messages"
        description="Mobile Originated messages log"
      />

      <DataTable
        columns={columns}
        data={sampleData}
        onRowClick={handleRowClick}
        searchPlaceholder="Search MO messages..."
        filters={filters}
      />
    </div>
  )
}
