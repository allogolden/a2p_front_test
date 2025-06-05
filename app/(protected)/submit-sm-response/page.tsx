"use client"

import { useRouter } from "next/navigation"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"

const sampleData = [
  { id: "1", message_id: "SMR001", response_code: "0", description: "Success", timestamp: "2024-01-15T10:30:00Z" },
  { id: "2", message_id: "SMR002", response_code: "8", description: "System error", timestamp: "2024-01-15T10:31:00Z" },
  {
    id: "3",
    message_id: "SMR003",
    response_code: "1",
    description: "Invalid destination",
    timestamp: "2024-01-15T10:32:00Z",
  },
]

const columns = [
  { key: "id", label: "ID" },
  { key: "message_id", label: "MESSAGE ID" },
  { key: "response_code", label: "RESPONSE CODE" },
  { key: "description", label: "DESCRIPTION" },
  {
    key: "timestamp",
    label: "TIMESTAMP",
    render: (value: string) => new Date(value).toLocaleString(),
  },
]

const filters = {
  response_code: ["0", "1", "8", "9"],
}

export default function SubmitSMResponsePage() {
  const router = useRouter()

  const handleRowClick = (item: any) => {
    router.push(`/submit-sm-response/${item.id}`)
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Submit SM Response" description="Submit short message response codes" />

      <DataTable
        columns={columns}
        data={sampleData}
        onRowClick={handleRowClick}
        searchPlaceholder="Search responses..."
        filters={filters}
      />
    </div>
  )
}
