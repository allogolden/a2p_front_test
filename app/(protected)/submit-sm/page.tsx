"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"
import type { SubmitSm } from "@/lib/api/submit-sm"
import { submitSmAPI } from "@/lib/api/submit-sm"

const columns = [
  { key: "queue_message_id", label: "QUEUE MESSAGE ID" },
  { key: "source_address", label: "SOURCE ADDRESS" },
  { key: "destination_address", label: "DESTINATION ADDRESS" },
  { key: "short_message", label: "SHORT MESSAGE" },
  { key: "sequence_number", label: "SEQUENCE NUMBER" },
  { key: "created_at", label: "CREATED AT" },
]

export default function SubmitSMPage() {
  const router = useRouter()
  const [data, setData] = useState<SubmitSm[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    submitSmAPI
      .list()
      .then((d) => setData(d))
      .catch(() => setError("Failed to load messages"))
      .finally(() => setLoading(false))
  }, [])

  const handleRowClick = (item: any) => {
    router.push(`/submit-sm/${item.id}`)
  }

  const handleAdd = () => {
    router.push("/submit-sm/new")
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Submit SM"
        description="Submitted short messages log"
        action={{ label: "Add", onClick: handleAdd, icon: Plus }}
      />

      <DataTable
        columns={columns}
        data={data}
        isLoading={loading}
        onRowClick={handleRowClick}
        searchPlaceholder="Search submitted messages..."
      />
      {error && <div className="text-red-600">{error}</div>}
    </div>
  )
}
