"use client"

import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"

// Данные под старую таблицу
const sampleData = [
  {
    name: "Transaction",
    ip_address: "172.30.39.129",
    cdr: "True",
    sms_type_number: "33",
    created: "10.04.2025 17:07:17,329",
    modified: "05.05.2025 10:15:52,254",
    created_by: "-",
    updated_by: "admin",
  },
  {
    name: "Service",
    ip_address: "172.30.142.176",
    cdr: "True",
    sms_type_number: "2",
    created: "08.04.2025 16:36:43,062",
    modified: "08.04.2025 16:36:43,062",
    created_by: "-",
    updated_by: "-",
  },
  {
    name: "eGov",
    ip_address: "172.30.140.21",
    cdr: "True",
    sms_type_number: "6",
    created: "14.05.2025 09:32:14,201",
    modified: "14.05.2025 09:32:14,201",
    created_by: "-",
    updated_by: "-",
  },
  {
    name: "Default_category",
    ip_address: "172.30.142.176",
    cdr: "True",
    sms_type_number: "4",
    created: "08.04.2025 16:37:38,413",
    modified: "08.04.2025 16:37:38,413",
    created_by: "-",
    updated_by: "-",
  },
  {
    name: "Transactions",
    ip_address: "172.30.39.129",
    cdr: "True",
    sms_type_number: "3",
    created: "08.04.2025 16:37:23,546",
    modified: "05.05.2025 10:16:00,602",
    created_by: "-",
    updated_by: "admin",
  },
  {
    name: "Reklama",
    ip_address: "172.30.142.176",
    cdr: "True",
    sms_type_number: "1",
    created: "08.04.2025 16:36:10,710",
    modified: "08.04.2025 16:36:10,710",
    created_by: "-",
    updated_by: "-",
  },
]

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

  const handleRowClick = (item: any) => {
    router.push(`/category-mt/${item.name}`)
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
