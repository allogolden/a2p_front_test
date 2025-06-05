"use client"

import { useRouter } from "next/navigation"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"
import { useAPI } from "@/hooks/use-api"
import { messagesAPI } from "@/lib/api"
import type { Message } from "@/types"

const columns = [
  { key: "id", label: "ID" },
  { key: "message_id", label: "MESSAGE ID" },
  { key: "destination", label: "DESTINATION" },
  { key: "text", label: "TEXT", render: (value: string) => value.substring(0, 50) + (value.length > 50 ? "..." : "") },
  { key: "status", label: "STATUS" },
  {
    key: "timestamp",
    label: "TIMESTAMP",
    render: (value: string) => new Date(value).toLocaleString(),
  },
]

const filters = {
  status: ["delivered", "pending", "failed", "rejected"],
}

export default function MTMessagesPage() {
  const router = useRouter()
  const { data: messages, isLoading } = useAPI<Message>(() => messagesAPI.getAll())

  const handleRowClick = (item: Message) => {
    router.push(`/mt-messages/${item.id}`)
  }

  return (
    <div className="space-y-6">
      <PageHeader title="MT Messages" description="Mobile Terminated messages log" />

      <DataTable
        columns={columns}
        data={(messages as Message[]) || []}
        onRowClick={handleRowClick}
        searchPlaceholder="Search messages..."
        filters={filters}
        isLoading={isLoading}
      />
    </div>
  )
}
