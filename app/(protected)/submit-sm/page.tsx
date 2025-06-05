"use client"

import { useRouter } from "next/navigation"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"

const sampleData = [
  { id: "1", message_id: "SM001", destination: "+998901234567", text: "Your OTP: 123456", status: "submitted" },
  { id: "2", message_id: "SM002", destination: "+998901234568", text: "Payment confirmed", status: "submitted" },
  { id: "3", message_id: "SM003", destination: "+998901234569", text: "Welcome message", status: "failed" },
]

const columns = [
  { key: "id", label: "ID" },
  { key: "message_id", label: "MESSAGE ID" },
  { key: "destination", label: "DESTINATION" },
  { key: "text", label: "TEXT", render: (value: string) => value.substring(0, 30) + "..." },
  { key: "status", label: "STATUS" },
]

const filters = {
  status: ["submitted", "failed", "pending"],
}

export default function SubmitSMPage() {
  const router = useRouter()

  const handleRowClick = (item: any) => {
    router.push(`/submit-sm/${item.id}`)
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Submit SM" description="Submitted short messages log" />

      <DataTable
        columns={columns}
        data={sampleData}
        onRowClick={handleRowClick}
        searchPlaceholder="Search submitted messages..."
        filters={filters}
      />
    </div>
  )
}
