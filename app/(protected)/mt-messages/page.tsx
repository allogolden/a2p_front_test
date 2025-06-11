"use client"

import { useRouter } from "next/navigation"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"
import { useAPI } from "@/hooks/use-api"
import { messagesAPI } from "@/lib/api"
import type { Message } from "@/types"

const columns = [
  { key: "queue_message_id", label: "Queue Message ID" },
  { key: "smpp_message_id", label: "SMPP Message ID" },
  { key: "source_addr", label: "Source addr" },
  { key: "destination_addr", label: "Destination addr" },
  { key: "category", label: "Category" },
  { key: "submit_status", label: "Submit status" },
  { key: "submit_resp_status", label: "Submit resp status" },
  { key: "delivery_status", label: "Delivery status" },
  { key: "mt_interceptor_log_id", label: "MT Interceptor Log ID" },
  { key: "process_status", label: "Process status" },
  { key: "sent_at", label: "Sent at", render: (v: string) => v ? new Date(v).toLocaleString() : "-" },
  { key: "delivered_at", label: "Delivered at", render: (v: string) => v ? new Date(v).toLocaleString() : "-" },
]

const filters = {
  process_status: [
    "Waiting for SubmitSMResp",
    "Waiting for DeliverSM",
    "Completed",
  ],
  delivery_status: [
    "DELIVRD",
    "-",
  ],
  category: [
    "eGov",
    "-",
  ],
  // Можешь добавить фильтры по submit_status и submit_resp_status если нужно
}

export default function MTMessagesPage() {
  const router = useRouter()
  const { data: messages, isLoading } = useAPI<Message>(() => messagesAPI.getAll())

  const handleRowClick = (item: Message) => {
    router.push(`/mt-messages/${item.id}`)
  }

  return (
    <div className="space-y-6">
      <PageHeader title="MT Messages" description="Mobile Terminated messages log" />
      <DataTable
        columns={columns}
        data={(messages as Message[]) || []}
        onRowClick={handleRowClick}
        searchPlaceholder="Search messages..."
        filters={filters}
        isLoading={isLoading}
      />
    </div>
  )
}
