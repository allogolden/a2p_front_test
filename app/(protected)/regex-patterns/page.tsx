"use client"

import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"

const sampleData = [
  {
    variable: "%d",
    pattern: "[0-9][0-9.,]*%?",
    active: true,
    description: "single number sequence",
    ip_address: "172.30.142.190",
    created: "2025-05-22T10:37:15+05:00",
    modified: "2025-05-22T10:37:15+05:00",
    created_by: "-",
    updated_by: "-",
  },
  {
    variable: "%d+",
    pattern: "((?:\\d{1,4}[./-]?\\d{0,4}[./-]?\\d{0,4}|\\d+[0-9.,-]*%?)(?:\\s+(?:\\d{1,4}[./-]?\\d{0,4}[./-]?\\d{0,4}|\\d+[0-9.,-]*%?))*)",
    active: true,
    description: "unlimited number sequence",
    ip_address: "172.30.142.113",
    created: "2025-05-22T10:38:46+05:00",
    modified: "2025-05-29T10:24:28+05:00",
    created_by: "-",
    updated_by: "admin",
  },
  // ... другие строки
]

const columns = [
  { key: "variable", label: "VARIABLE" },
  { key: "pattern", label: "PATTERN" },
  { key: "active", label: "ACTIVE", render: (v: boolean) => v ? "Yes" : "No" },
  { key: "description", label: "DESCRIPTION" },
  { key: "ip_address", label: "IP ADDRESS" },
  { key: "created", label: "CREATED", render: (v: string) => new Date(v).toLocaleString() },
  { key: "modified", label: "MODIFIED", render: (v: string) => new Date(v).toLocaleString() },
  { key: "created_by", label: "CREATED BY" },
  { key: "updated_by", label: "UPDATED BY" },
]

const filters = {
  active: ["Yes", "No"],
}

export default function RegexPatternsPage() {
  const router = useRouter()

  const handleRowClick = (item: any) => {
    router.push(`/regex-patterns/${item.variable}`)
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
