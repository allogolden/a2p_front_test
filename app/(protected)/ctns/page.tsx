"use client"

import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"

const sampleData = [
  { id: "1", number: "+998901234567", operator: "Ucell", status: "active", type: "Mobile" },
  { id: "2", number: "+998901234568", operator: "Beeline", status: "active", type: "Mobile" },
  { id: "3", number: "+998901234569", operator: "UzMobile", status: "inactive", type: "Mobile" },
]

const columns = [
  { key: "id", label: "ID" },
  { key: "number", label: "NUMBER" },
  { key: "operator", label: "OPERATOR" },
  { key: "status", label: "STATUS" },
  { key: "type", label: "TYPE" },
]

const filters = {
  operator: ["Ucell", "Beeline", "UzMobile"],
  status: ["active", "inactive"],
  type: ["Mobile", "Fixed"],
}

export default function CTNsPage() {
  const router = useRouter()

  const handleRowClick = (item: any) => {
    router.push(`/ctns/${item.id}`)
  }

  const handleAdd = () => {
    router.push("/ctns/new")
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="CTNs"
        description="Calling/Called Telephone Numbers management"
        action={{
          label: "Add CTN",
          onClick: handleAdd,
          icon: Plus,
        }}
      />

      <DataTable
        columns={columns}
        data={sampleData}
        onRowClick={handleRowClick}
        searchPlaceholder="Search CTNs..."
        filters={filters}
      />
    </div>
  )
}
