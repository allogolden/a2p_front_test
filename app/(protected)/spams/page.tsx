"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"
import type { Spam } from "@/lib/api/spams"
import { spamsAPI } from "@/lib/api/spams"

const columns = [
  { key: "regex", label: "REGEX" },
  { key: "name", label: "NAME" },
  {
    key: "active",
    label: "ACTIVE",
    render: (v: boolean) => (v ? "Yes" : "No"),
  },
  { key: "description", label: "DESCRIPTION" },
  {
    key: "created",
    label: "CREATED",
    render: (v: string) => new Date(v).toLocaleString(),
  },
  {
    key: "modified",
    label: "MODIFIED",
    render: (v: string) => new Date(v).toLocaleString(),
  },
]

const filters = {
  active: ["Yes", "No"],
}

export default function SpamsPage() {
  const router = useRouter()
  const [data, setData] = useState<Spam[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    spamsAPI
      .list()
      .then((d) => setData(d))
      .catch(() => setError("Failed to load spams"))
      .finally(() => setLoading(false))
  }, [])

  const handleRowClick = (item: any) => {
    router.push(`/spams/${item.id}`)
  }

  const handleAdd = () => {
    router.push("/spams/new")
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Spams"
        description="Spam regex patterns"
        action={{ label: "Add Spam", onClick: handleAdd, icon: Plus }}
      />

      <DataTable
        columns={columns}
        data={data}
        isLoading={loading}
        onRowClick={handleRowClick}
        searchPlaceholder="Search spam patterns..."
        filters={filters}
      />
      {error && <div className="text-red-600">{error}</div>}
    </div>
  )
}
