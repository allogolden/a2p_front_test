"use client"

import { useRouter } from "next/navigation"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"

const sampleData = [
  { id: "1", category: "Banking", total_messages: "45,678", success_rate: "98.5%", status: "active" },
  { id: "2", category: "Marketing", total_messages: "23,456", success_rate: "95.2%", status: "active" },
  { id: "3", category: "Emergency", total_messages: "1,234", success_rate: "99.8%", status: "active" },
]

const columns = [
  { key: "id", label: "ID" },
  { key: "category", label: "CATEGORY" },
  { key: "total_messages", label: "TOTAL MESSAGES" },
  { key: "success_rate", label: "SUCCESS RATE" },
  { key: "status", label: "STATUS" },
]

const filters = {
  category: ["Banking", "Marketing", "Emergency", "Education"],
  status: ["active", "inactive"],
}

export default function CategoryStatisticsPage() {
  const router = useRouter()

  const handleRowClick = (item: any) => {
    router.push(`/category-statistics/${item.id}`)
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Category Statistics" description="Message category performance statistics" />

      <DataTable
        columns={columns}
        data={sampleData}
        onRowClick={handleRowClick}
        searchPlaceholder="Search statistics..."
        filters={filters}
      />
    </div>
  )
}
