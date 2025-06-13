"use client"

import { useRouter } from "next/navigation"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"
import { useAPI } from "@/hooks/use-api"
import type { PartnerStatistics } from "@/lib/api/partners-statistics"
import { partnersStatisticsAPI } from "@/lib/api/partners-statistics"


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
  const { data: stats, isLoading } = useAPI<PartnerStatistics>(() => partnersStatisticsAPI.list())

  const handleRowClick = (item: PartnerStatistics) => {
    router.push(`/partners-statistics/${item.id}`)
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Partners Statistics" description="Partner performance and revenue statistics" />

      <DataTable
        columns={columns}
        data={(stats as PartnerStatistics[]) || []}
        onRowClick={handleRowClick}
        searchPlaceholder="Search partner statistics..."
        filters={filters}
        isLoading={isLoading}
      />
    </div>
  )
}
