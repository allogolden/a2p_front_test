"use client"

import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"

const sampleData = [
  {
    id: "1",
    name: "Phone Number",
    pattern: "^\\+998\\d{9}$",
    description: "Uzbekistan phone number",
    status: "active",
  },
  {
    id: "2",
    name: "Email",
    pattern: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
    description: "Email validation",
    status: "active",
  },
  {
    id: "3",
    name: "Credit Card",
    pattern: "^\\d{4}\\s\\d{4}\\s\\d{4}\\s\\d{4}$",
    description: "Credit card format",
    status: "inactive",
  },
]

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "NAME" },
  { key: "pattern", label: "PATTERN" },
  { key: "description", label: "DESCRIPTION" },
  { key: "status", label: "STATUS" },
]

const filters = {
  status: ["active", "inactive"],
}

export default function RegexPatternsPage() {
  const router = useRouter()

  const handleRowClick = (item: any) => {
    router.push(`/regex-patterns/${item.id}`)
  }

  const handleAdd = () => {
    router.push("/regex-patterns/new")
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Regex Patterns"
        description="Regular expression patterns for validation"
        action={{
          label: "Add Pattern",
          onClick: handleAdd,
          icon: Plus,
        }}
      />

      <DataTable
        columns={columns}
        data={sampleData}
        onRowClick={handleRowClick}
        searchPlaceholder="Search regex patterns..."
        filters={filters}
      />
    </div>
  )
}
