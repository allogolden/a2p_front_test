"use client"

import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"
import { useAPI } from "@/hooks/use-api"
import { anPatternsAPI } from "@/lib/api"
import type { ANPattern } from "@/types"

const columns = [
  { key: "system_id", label: "System ID" },
  { key: "ctn", label: "CTN" },
  { key: "alpha_name", label: "Alpha Name" },
  { key: "category", label: "Category" },
  { key: "name", label: "Name" },
  { key: "pattern", label: "Pattern" },
  { key: "active", label: "Active" },
  { key: "ip_address", label: "IP Address" },
  { key: "description", label: "Description" },
  {
    key: "created",
    label: "Created",
    render: (value: string) => value ? value.replace(/,\d+$/, "") : ""
  },
  {
    key: "modified",
    label: "Modified",
    render: (value: string) => value ? value.replace(/,\d+$/, "") : ""
  },
  { key: "created_by", label: "Created By" },
  { key: "updated_by", label: "Updated By" }
]

const filters = {
  active: ["True", "False"],
  category: [
    "Payment", "Education", "Transaction", "Banking", "Marketing", "Service", "Reklama", "-"
  ],
  // Можно добавить фильтр по System ID:
  // system_id: ["20100", "208200", ...]
}

export default function ANPatternsPage() {
  const router = useRouter()
  const { data: patterns, isLoading } = useAPI<ANPattern>(() => anPatternsAPI.getAll())

  const handleRowClick = (item: ANPattern) => {
    router.push(`/an-patterns/${item.id}`)
  }

  const handleAdd = () => {
    router.push("/an-patterns/new")
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="AN Patterns"
        description="Manage your application-to-person patterns"
        action={{
          label: "Add Pattern",
          onClick: handleAdd,
          icon: Plus,
        }}
      />

      <DataTable
        columns={columns}
        data={(patterns as ANPattern[]) || []}
        onRowClick={handleRowClick}
        searchPlaceholder="Search patterns..."
        filters={filters}
        isLoading={isLoading}
      />
    </div>
  )
}
