"use client"

import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"

const sampleData = [
  { id: "1", number: "1234", description: "Banking services", operator: "Ucell", status: "active" },
  { id: "2", number: "5678", description: "Emergency alerts", operator: "Beeline", status: "active" },
  { id: "3", number: "9999", description: "Marketing campaigns", operator: "UzMobile", status: "inactive" },
]

const columns = [
  { key: "id", label: "ID" },
  { key: "number", label: "NUMBER" },
  { key: "description", label: "DESCRIPTION" },
  { key: "operator", label: "OPERATOR" },
  { key: "status", label: "STATUS" },
]

const filters = {
  operator: ["Ucell", "Beeline", "UzMobile"],
  status: ["active", "inactive"],
}

export default function ShortNumbersPage() {
  const router = useRouter()

  const handleRowClick = (item: any) => {
    router.push(`/short-numbers/${item.id}`)
  }

  const handleAdd = () => {
    router.push("/short-numbers/new")
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Short Numbers"
        description="Manage short code numbers"
        action={{
          label: "Add Short Number",
          onClick: handleAdd,
          icon: Plus,
        }}
      />

      <DataTable
        columns={columns}
        data={sampleData}
        onRowClick={handleRowClick}
        searchPlaceholder="Search short numbers..."
        filters={filters}
      />
    </div>
  )
}
