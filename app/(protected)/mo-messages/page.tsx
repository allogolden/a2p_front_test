"use client"

import { useRouter } from "next/navigation"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"

const sampleData = [
  { id: "1", message_id: "MO001", source: "+998901234567", destination: "1234", text: "BALANCE", status: "delivered" },
  { id: "2", message_id: "MO002", source: "+998901234568", destination: "5678", text: "HELP", status: "delivered" },
  { id: "3", message_id: "MO003", source: "+998901234569", destination: "9999", text: "STOP", status: "failed" },
]

const columns = [
  { key: "id", label: "ID" },
  { key: "message_id", label: "MESSAGE ID" },
  { key: "source", label: "SOURCE" },
  { key: "destination", label: "DESTINATION" },
  { key: "text", label: "TEXT" },
  { key: "status", label: "STATUS" },
]

const filters = {
  status: ["delivered", "failed", "pending"],
}

export default function MOMessagesPage() {
  const router = useRouter()

  const handleRowClick = (item: any) => {
    router.push(`/mo-messages/${item.id}`)
  }

  return (
    <div className="space-y-6">
      <PageHeader title="MO Messages" description="Mobile Originated messages log" />

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
