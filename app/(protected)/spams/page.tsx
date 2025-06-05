"use client"

import { useRouter } from "next/navigation"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"

const sampleData = [
  {
    id: "1",
    content: "Free money! Click here!",
    source: "+998901234567",
    detected_at: "2024-01-15T10:30:00Z",
    status: "blocked",
  },
  {
    id: "2",
    content: "Win a prize now!",
    source: "+998901234568",
    detected_at: "2024-01-15T10:31:00Z",
    status: "blocked",
  },
  {
    id: "3",
    content: "Urgent: Update your info",
    source: "+998901234569",
    detected_at: "2024-01-15T10:32:00Z",
    status: "quarantined",
  },
]

const columns = [
  { key: "id", label: "ID" },
  { key: "content", label: "CONTENT", render: (value: string) => value.substring(0, 50) + "..." },
  { key: "source", label: "SOURCE" },
  {
    key: "detected_at",
    label: "DETECTED AT",
    render: (value: string) => new Date(value).toLocaleString(),
  },
  { key: "status", label: "STATUS" },
]

const filters = {
  status: ["blocked", "quarantined", "reviewed"],
}

export default function SpamsPage() {
  const router = useRouter()

  const handleRowClick = (item: any) => {
    router.push(`/spams/${item.id}`)
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Spams" description="Detected spam messages and content" />

      <DataTable
        columns={columns}
        data={sampleData}
        onRowClick={handleRowClick}
        searchPlaceholder="Search spam content..."
        filters={filters}
      />
    </div>
  )
}
