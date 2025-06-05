"use client"

import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"
import { useAPI } from "@/hooks/use-api"
import { partnersAPI } from "@/lib/api"
import type { Partner } from "@/types"

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "NAME" },
  { key: "type", label: "TYPE" },
  { key: "status", label: "STATUS" },
  { key: "country", label: "COUNTRY" },
  {
    key: "created_at",
    label: "CREATED AT",
    render: (value: string) => new Date(value).toLocaleDateString(),
  },
]

const filters = {
  type: ["Mobile Operator", "Aggregator", "Enterprise"],
  status: ["active", "inactive"],
  country: ["Uzbekistan", "Kazakhstan", "Kyrgyzstan"],
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
