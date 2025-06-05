"use client"

import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"

const sampleData = [
  { id: "1", name: "BANK_ALERT", pattern: "^BANK.*", status: "active", created_at: "2024-01-15T00:00:00Z" },
  { id: "2", name: "PROMO_MSG", pattern: "^PROMO.*", status: "active", created_at: "2024-01-16T00:00:00Z" },
  { id: "3", name: "OTP_CODE", pattern: "^OTP.*", status: "inactive", created_at: "2024-01-17T00:00:00Z" },
]

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "NAME" },
  { key: "pattern", label: "PATTERN" },
  { key: "status", label: "STATUS" },
  {
    key: "created_at",
    label: "CREATED AT",
    render: (value: string) => new Date(value).toLocaleDateString(),
  },
]

const filters = {
  status: ["active", "inactive"],
}

export default function AlphanamesPage() {
  const router = useRouter()

  const handleRowClick = (item: any) => {
    router.push(`/alphanames/${item.id}`)
  }

  const handleAdd = () => {
    router.push("/alphanames/new")
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Alphanames"
        description="Manage alphanumeric sender IDs"
        action={{
          label: "Add Alphaname",
          onClick: handleAdd,
          icon: Plus,
        }}
      />

      <DataTable
        columns={columns}
        data={sampleData}
        onRowClick={handleRowClick}
        searchPlaceholder="Search alphanames..."
        filters={filters}
      />
    </div>
  )
}
