"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"
import type { CategoryMT } from "@/lib/api/category-mt"
import { categoryMTAPI } from "@/lib/api/category-mt"

// Данные теперь загружаются через API

// Колонки по старой таблице
const columns = [
  { key: "name", label: "Category Name" },
  { key: "ip_address", label: "IP Address" },
  { key: "cdr", label: "Cdr" },
  { key: "sms_type_number", label: "SMS type number" },
  { 
    key: "created", 
    label: "Created",
    render: (value: string) => value ? value.replace(/,\d+$/, "") : ""
  },
  { 
    key: "modified", 
    label: "Modified",
    render: (value: string) => value ? value.replace(/,\d+$/, "") : ""
  },
  { key: "created_by", label: "Created By" },
  { key: "updated_by", label: "Updated By" },
]

// Фильтры (по имени категории)
const filters = {
  name: [
    "Default_category",
    "eGov",
    "Reklama",
    "Service",
    "Transaction",
    "Transactions",
  ]
}

export default function CategoryMTPage() {
  const router = useRouter()
  const [data, setData] = useState<CategoryMT[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    categoryMTAPI
      .list()
      .then((list) => setData(list))
      .catch(() => setError("Failed to load categories"))
      .finally(() => setLoading(false))
  }, [])

  const handleRowClick = (item: CategoryMT) => {
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
        data={data}
        isLoading={loading}
        onRowClick={handleRowClick}
        searchPlaceholder="Search categories..."
        filters={filters}
      />
      {error && <div className="text-red-600">{error}</div>}
    </div>
  )
}
