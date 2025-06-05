"use client"

import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"

const sampleData = [
  { id: "1", name: "Banking", priority: "High", rate_limit: "1000", status: "active" },
  { id: "2", name: "Marketing", priority: "Low", rate_limit: "100", status: "active" },
  { id: "3", name: "Emergency", priority: "Critical", rate_limit: "5000", status: "active" },
]

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "NAME" },
  { key: "priority", label: "PRIORITY" },
  { key: "rate_limit", label: "RATE LIMIT" },
  { key: "status", label: "STATUS" },
]

const filters = {
  priority: ["Critical", "High", "Medium", "Low"],
  status: ["active", "inactive"],
}

export default function CategoryMTPage() {
  const router = useRouter()

  const handleRowClick = (item: any) => {
    router.push(`/category-mt/${item.id}`)
  }

  const handleAdd = () => {
    router.push("/category-mt/new")
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Category MT"
        description="Mobile Terminated message categories"
        action={{
          label: "Add Category",
          onClick: handleAdd,
          icon: Plus,
        }}
      />

      <DataTable
        columns={columns}
        data={sampleData}
        onRowClick={handleRowClick}
        searchPlaceholder="Search categories..."
        filters={filters}
      />
    </div>
  )
}
