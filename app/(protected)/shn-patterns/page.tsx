"use client"

import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"

const sampleData = [
  {
    system_id: "20100",
    short_number: "3700",
    category: "Service",
    name: "3700",
    pattern: "%w SQB Construction Ogoh boling Ushbu parolni hech kimga bermang Firibgarlar foydalanishiga yol %w{1,3} .",
    active: true,
    ip_address: "172.30.142.177",
    description: "Imported pattern",
    created: "2025-04-11T11:22:14+05:00",
    modified: "2025-05-26T15:53:42+05:00",
    created_by: "-",
    updated_by: "admin",
  },
  // остальные записи...
]

const columns = [
  { key: "system_id", label: "SYSTEM ID" },
  { key: "short_number", label: "SHORT NUMBER" },
  { key: "category", label: "CATEGORY" },
  { key: "name", label: "NAME" },
  { key: "pattern", label: "PATTERN" },
  { key: "active", label: "ACTIVE", render: (v: boolean) => v ? "Yes" : "No" },
  { key: "ip_address", label: "IP ADDRESS" },
  { key: "description", label: "DESCRIPTION" },
  { key: "created", label: "CREATED", render: (v: string) => new Date(v).toLocaleString() },
  { key: "modified", label: "MODIFIED", render: (v: string) => new Date(v).toLocaleString() },
  { key: "created_by", label: "CREATED BY" },
  { key: "updated_by", label: "UPDATED BY" },
]

const filters = {
  category: ["Service", "Transaction", "Marketing", "eGov"],
  active: ["Yes", "No"],
  short_number: ["3700", "1234", "5678", "9999"], // твои реальные номера
}

export default function SHNPatternsPage() {
  const router = useRouter()

  const handleRowClick = (item: any) => {
    router.push(`/shn-patterns/${item.short_number}`)
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
