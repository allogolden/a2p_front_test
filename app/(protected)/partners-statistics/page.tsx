"use client"

import { useRouter } from "next/navigation"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"

const sampleData = [
  { id: "1", partner: "TelecomUZ", messages_sent: "123,456", success_rate: "98.7%", revenue: "$12,345" },
  { id: "2", partner: "BeeLine", messages_sent: "98,765", success_rate: "97.2%", revenue: "$9,876" },
  { id: "3", partner: "Ucell", messages_sent: "76,543", success_rate: "96.8%", revenue: "$7,654" },
]

const columns = [
  { key: "id", label: "ID" },
  { key: "partner", label: "PARTNER" },
  { key: "messages_sent", label: "MESSAGES SENT" },
  { key: "success_rate", label: "SUCCESS RATE" },
  { key: "revenue", label: "REVENUE" },
]

const filters = {
  partner: ["TelecomUZ", "BeeLine", "Ucell"],
}

export default function PartnersStatisticsPage() {
  const router = useRouter()

  const handleRowClick = (item: any) => {
    router.push(`/partners-statistics/${item.id}`)
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Partners Statistics" description="Partner performance and revenue statistics" />

      <DataTable
        columns={columns}
        data={sampleData}
        onRowClick={handleRowClick}
        searchPlaceholder="Search partner statistics..."
        filters={filters}
      />
    </div>
  )
}
