"use client"

import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"

const columns = [
  { key: "system_id", label: "SYSTEM ID" },
  { key: "ctn", label: "CTN" },
  { key: "short_number", label: "SHORT NUMBER" },
  { key: "active", label: "ACTIVE", render: (v: boolean) => v ? "Yes" : "No" },
  { key: "bind_mode", label: "BIND MODE" },
  { key: "alias", label: "ALIAS" },
  { key: "ip_address", label: "IP ADDRESS" },
  { key: "description", label: "DESCRIPTION" },
  { key: "created", label: "CREATED", render: (v: string) => new Date(v).toLocaleString() },
  { key: "modified", label: "MODIFIED", render: (v: string) => new Date(v).toLocaleString() },
  { key: "created_by", label: "CREATED BY" },
  { key: "updated_by", label: "UPDATED BY" },
]

const sampleData = [
  {
    id: "1",
    system_id: "20100",
    ctn: "998909652030, 998911341631, 998911365300",
    short_number: "5300",
    active: true,
    bind_mode: "Allow both A2P/P2A",
    alias: "-",
    ip_address: "-",
    description: "Imported SHN name",
    created: "2025-04-11T11:23:57+05:00",
    modified: "2025-04-11T11:23:57+05:00",
    created_by: "-",
    updated_by: "-",
  },
  {
    id: "2",
    system_id: "20100",
    ctn: "998909652030, 998911341631, 998917921500",
    short_number: "1500",
    active: true,
    bind_mode: "Allow both A2P/P2A",
    alias: "-",
    ip_address: "-",
    description: "Imported SHN name",
    created: "2025-04-11T11:12:27+05:00",
    modified: "2025-04-11T11:12:27+05:00",
    created_by: "-",
    updated_by: "-",
  },
  // ... остальные записи
]


const filters = {
  active: ["Yes", "No"],
  bind_mode: ["Allow both A2P/P2A"],
  short_number: ["5300", "1500", "1071"], // ...твоё
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
