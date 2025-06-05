"use client"

import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"

const sampleData = [
  { id: "1", name: "Main Site", domain: "a2p.example.com", status: "active", ssl: "valid" },
  { id: "2", name: "API Site", domain: "api.a2p.example.com", status: "active", ssl: "valid" },
  { id: "3", name: "Admin Panel", domain: "admin.a2p.example.com", status: "maintenance", ssl: "expired" },
]

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "NAME" },
  { key: "domain", label: "DOMAIN" },
  { key: "status", label: "STATUS" },
  { key: "ssl", label: "SSL" },
]

const filters = {
  status: ["active", "inactive", "maintenance"],
  ssl: ["valid", "expired", "none"],
}

export default function SitesPage() {
  const router = useRouter()

  const handleRowClick = (item: any) => {
    router.push(`/sites/sites/${item.id}`)
  }

  const handleAdd = () => {
    router.push("/sites/sites/new")
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sites"
        description="Website and domain management"
        action={{
          label: "Add Site",
          onClick: handleAdd,
          icon: Plus,
        }}
      />

      <DataTable
        columns={columns}
        data={sampleData}
        onRowClick={handleRowClick}
        searchPlaceholder="Search sites..."
        filters={filters}
      />
    </div>
  )
}
