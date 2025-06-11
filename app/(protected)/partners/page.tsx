"use client"

import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"
import { useAPI } from "@/hooks/use-api"
import { partnersAPI } from "@/lib/api"
import type { Partner } from "@/types"

const columns = [
  { key: "system_id", label: "System ID" },
  { key: "username", label: "Username" },
  { key: "active", label: "Active", render: (v: boolean) => v ? "Yes" : "No" },
  { key: "ip_address", label: "IP Address" },
  { key: "description", label: "Description" },
  { key: "created", label: "Created", render: (v: string) => v ? new Date(v).toLocaleDateString() : "-" },
  { key: "modified", label: "Modified", render: (v: string) => v ? new Date(v).toLocaleString() : "-" },
  { key: "created_by", label: "Created By" },
  { key: "updated_by", label: "Updated By" },
]

const filters = {
  active: ["Yes", "No"],
  // Можно добавить фильтры по allowed если нужно:
  // shn_allowed: ["Yes", "No"],
  // an_allowed: ["Yes", "No"],
}

export default function PartnersPage() {
  const router = useRouter()
  const { data: partners, isLoading } = useAPI<Partner>(() => partnersAPI.getAll())

  const handleRowClick = (item: Partner) => {
    router.push(`/partners/${item.id}`)
  }

  const handleAdd = () => {
    router.push("/partners/new")
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Partners"
        description="Manage business partners and integrations"
        action={{
          label: "Add Partner",
          onClick: handleAdd,
          icon: Plus,
        }}
      />

      <DataTable
        columns={columns}
        data={(partners as Partner[]) || []}
        onRowClick={handleRowClick}
        searchPlaceholder="Search partners..."
        filters={filters}
        isLoading={isLoading}
      />
    </div>
  )
}
