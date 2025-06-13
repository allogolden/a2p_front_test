"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"
import type { MOMessages } from "@/lib/api/mo-messages"
import { moMessagesAPI } from "@/lib/api/mo-messages"

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

const filters = {
  delivery_status: ["DELIVRD", "UNDELIV", "REJECTED"],
  process_status: ["Completed", "Failed", "Pending"],
}

export default function MOMessagesPage() {
  const router = useRouter()
  const [data, setData] = useState<MOMessages[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    moMessagesAPI
      .list()
      .then((list) => setData(list))
      .catch(() => setError("Failed to load messages"))
      .finally(() => setLoading(false))
  }, [])

  const handleRowClick = (item: MOMessages) => {
    router.push(`/mo-messages/${item.id}`)
  }

  const handleAdd = () => router.push("/mo-messages/new")

  return (
    <div className="space-y-6">
      <PageHeader title="MO Messages" description="Mobile Originated messages log" />

      <DataTable
        columns={columns}
        data={data}
        isLoading={loading}
        onRowClick={handleRowClick}
        onAdd={handleAdd}
        searchPlaceholder="Search MO messages..."
        filters={filters}
        addLabel="Add Message"
      />
      {error && <div className="text-red-600">{error}</div>}
    </div>
  )
}

