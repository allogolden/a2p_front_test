"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"
import type { DeliverSmP2A } from "@/lib/api/deliver-sm-p2a"
import { deliverSmP2AAPI } from "@/lib/api/deliver-sm-p2a"

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
  const [data, setData] = useState<DeliverSmP2A[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    deliverSmP2AAPI
      .list()
      .then((list) => setData(list))
      .catch(() => setError("Failed to load messages"))
      .finally(() => setLoading(false))
  }, [])

  const handleRowClick = (item: DeliverSmP2A) => {
    router.push(`/deliver-sm-p2a/${item.id}`)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Deliver SM (P2A)"
        description="Person-to-Application delivery messages"
      />

      <DataTable
        columns={columns}
        data={data}
        isLoading={loading}
        onRowClick={handleRowClick}
        searchPlaceholder="Search P2A messages..."
        filters={filters}
      />
      {error && <div className="text-red-600">{error}</div>}
    </div>
  )
}
