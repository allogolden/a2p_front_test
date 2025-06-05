"use client"

import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"
import { useAPI } from "@/hooks/use-api"
import { anPatternsAPI } from "@/lib/api"
import type { ANPattern } from "@/types"

const columns = [
  { key: "system_id", label: "SYSTEM ID" },
  { key: "alpha_name", label: "ALPHA NAME" },
  { key: "category", label: "CATEGORY" },
  { key: "status", label: "STATUS" },
  {
    key: "created_at",
    label: "CREATED AT",
    render: (value: string) => new Date(value).toLocaleDateString(),
  },
]

const filters = {
  category: ["Payment", "Education", "Transaction", "Banking", "Marketing"],
  status: ["active", "inactive"],
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
