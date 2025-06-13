"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"
import type { DeliverSmDLR } from "@/lib/api/deliver-sm-dlr"
import { deliverSmDLRAPI } from "@/lib/api/deliver-sm-dlr"

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
  const [data, setData] = useState<DeliverSmDLR[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    deliverSmDLRAPI
      .list()
      .then((list) => setData(list))
      .catch(() => setError("Failed to load DLRs"))
      .finally(() => setLoading(false))
  }, [])

  const handleRowClick = (item: DeliverSmDLR) => {
    router.push(`/deliver-sm-dlr/${item.id}`)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Deliver SM (DLR)"
        description="Delivery receipt messages log"
      />

      <DataTable
        columns={columns}
        data={data}
        isLoading={loading}
        onRowClick={handleRowClick}
        searchPlaceholder="Search delivery receipts..."
        filters={filters}
      />
      {error && <div className="text-red-600">{error}</div>}
    </div>
  )
}
