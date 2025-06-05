"use client"

import { useRouter } from "next/navigation"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"

const sampleData = [
  { id: "1", message_id: "P2A001", source: "+998901234567", text: "STOP", status: "processed" },
  { id: "2", message_id: "P2A002", source: "+998901234568", text: "HELP", status: "processed" },
  { id: "3", message_id: "P2A003", source: "+998901234569", text: "INFO", status: "failed" },
]

const columns = [
  { key: "id", label: "ID" },
  { key: "message_id", label: "MESSAGE ID" },
  { key: "source", label: "SOURCE" },
  { key: "text", label: "TEXT" },
  { key: "status", label: "STATUS" },
]

const filters = {
  status: ["processed", "failed", "pending"],
}

export default function DeliverSMP2APage() {
  const router = useRouter()

  const handleRowClick = (item: any) => {
    router.push(`/deliver-sm-p2a/${item.id}`)
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Deliver SM (P2A)" description="Person-to-Application delivery messages" />

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
