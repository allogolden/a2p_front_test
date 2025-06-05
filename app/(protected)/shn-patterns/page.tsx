"use client"

import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"

const sampleData = [
  { id: "1", pattern: "1234", description: "Banking services", operator: "Ucell", status: "active" },
  { id: "2", pattern: "5678", description: "Emergency alerts", operator: "Beeline", status: "active" },
  { id: "3", pattern: "9999", description: "Marketing campaigns", operator: "UzMobile", status: "inactive" },
]

const columns = [
  { key: "id", label: "ID" },
  { key: "pattern", label: "PATTERN" },
  { key: "description", label: "DESCRIPTION" },
  { key: "operator", label: "OPERATOR" },
  { key: "status", label: "STATUS" },
]

const filters = {
  operator: ["Ucell", "Beeline", "UzMobile"],
  status: ["active", "inactive"],
}

export default function SHNPatternsPage() {
  const router = useRouter()

  const handleRowClick = (item: any) => {
    router.push(`/shn-patterns/${item.id}`)
  }

  const handleAdd = () => {
    router.push("/shn-patterns/new")
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="SHN Patterns"
        description="Short Header Number patterns"
        action={{
          label: "Add SHN Pattern",
          onClick: handleAdd,
          icon: Plus,
        }}
      />

      <DataTable
        columns={columns}
        data={sampleData}
        onRowClick={handleRowClick}
        searchPlaceholder="Search SHN patterns..."
        filters={filters}
      />
    </div>
  )
}
