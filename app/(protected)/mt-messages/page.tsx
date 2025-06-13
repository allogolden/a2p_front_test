"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"
import type { MTMessages } from "@/lib/api/mt-messages"
import { mtMessagesAPI } from "@/lib/api/mt-messages"

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
  const [data, setData] = useState<MTMessages[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    mtMessagesAPI
      .list()
      .then((list) => setData(list))
      .catch(() => setError("Failed to load messages"))
      .finally(() => setLoading(false))
  }, [])

  const handleRowClick = (item: MTMessages) => {
    router.push(`/mt-messages/${item.id}`)
  }

  const handleAdd = () => router.push("/mt-messages/new")

  return (
    <div className="space-y-6">
      <PageHeader title="MT Messages" description="Mobile Terminated messages log" />
      <DataTable
        columns={columns}
        data={data}
        isLoading={loading}
        onRowClick={handleRowClick}
        onAdd={handleAdd}
        searchPlaceholder="Search messages..."
        filters={filters}
        addLabel="Add Message"
      />
      {error && <div className="text-red-600">{error}</div>}
    </div>
  )
}
