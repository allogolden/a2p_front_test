"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"
import type { SubmitSmResponse } from "@/lib/api/submit-sm-response"
import { submitSmResponseAPI } from "@/lib/api/submit-sm-response"

const columns = [
  { key: "queue_message_id", label: "QUEUE MESSAGE ID" },
  { key: "smpp_message_id", label: "SMPP MESSAGE ID" },
  { key: "command_status", label: "COMMAND STATUS" },
  { key: "sequence_number", label: "SEQUENCE NUMBER" },
  { key: "created_at", label: "CREATED AT" },
]

export default function SubmitSMResponsePage() {
  const router = useRouter()
  const [data, setData] = useState<SubmitSmResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    submitSmResponseAPI
      .list()
      .then((d) => setData(d))
      .catch(() => setError("Failed to load responses"))
      .finally(() => setLoading(false))
  }, [])

  const handleRowClick = (item: any) => {
    router.push(`/submit-sm-response/${item.id}`)
  }

  const handleAdd = () => {
    router.push("/submit-sm-response/new")
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Submit SM Response"
        description="Submit short message response codes"
        action={{ label: "Add", onClick: handleAdd, icon: Plus }}
      />

      <DataTable
        columns={columns}
        data={data}
        isLoading={loading}
        onRowClick={handleRowClick}
        searchPlaceholder="Search responses..."
      />
      {error && <div className="text-red-600">{error}</div>}
    </div>
  )
}
