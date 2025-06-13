"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"
import type { Spam } from "@/lib/api/spams"
import { spamsAPI } from "@/lib/api/spams"

const columns = [
  { key: "id", label: "ID" },
  { key: "content", label: "CONTENT", render: (value: string) => value.substring(0, 50) + "..." },
  { key: "source", label: "SOURCE" },
  {
    key: "detected_at",
    label: "DETECTED AT",
    render: (value: string) => new Date(value).toLocaleString(),
  },
  { key: "status", label: "STATUS" },
]

const filters = {
  status: ["blocked", "quarantined", "reviewed"],
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
        description="Detected spam messages and content"
        action={{ label: "Add Spam", onClick: handleAdd, icon: Plus }}
      />

      <DataTable
        columns={columns}
        data={data}
        isLoading={loading}
        onRowClick={handleRowClick}
        searchPlaceholder="Search spam content..."
        filters={filters}
      />
      {error && <div className="text-red-600">{error}</div>}
    </div>
  )
}
