"use client"

import { useRouter } from "next/navigation"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"

const sampleData = [
  {
    id: "1",
    message_id: "DLR001",
    destination: "+998901234567",
    status: "delivered",
    timestamp: "2024-01-15T10:30:00Z",
  },
  { id: "2", message_id: "DLR002", destination: "+998901234568", status: "failed", timestamp: "2024-01-15T10:31:00Z" },
  { id: "3", message_id: "DLR003", destination: "+998901234569", status: "pending", timestamp: "2024-01-15T10:32:00Z" },
]

const columns = [
  { key: "id", label: "ID" },
  { key: "message_id", label: "MESSAGE ID" },
  { key: "destination", label: "DESTINATION" },
  { key: "status", label: "STATUS" },
  {
    key: "timestamp",
    label: "TIMESTAMP",
    render: (value: string) => new Date(value).toLocaleString(),
  },
]

const filters = {
  status: ["delivered", "failed", "pending", "rejected"],
}

export default function DeliverSMDLRPage() {
  const router = useRouter()

  const handleRowClick = (item: any) => {
    router.push(`/deliver-sm-dlr/${item.id}`)
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Deliver SM (DLR)" description="Delivery receipt messages log" />

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
