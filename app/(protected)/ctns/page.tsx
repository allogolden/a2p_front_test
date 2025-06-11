"use client"

import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"

// Данные из старой таблицы
const sampleData = [
  {
    system_id: "20100",
    category: "Default_category",
    ctn: "998901203900",
    ip_address: "-",
    active: "True",
    description: "Imported number",
    created: "08.04.2025 16:41:48,673",
    modified: "08.04.2025 16:41:48,673",
    created_by: "-",
    updated_by: "-",
  },
  {
    system_id: "20100",
    category: "Default_category",
    ctn: "998917913400",
    ip_address: "-",
    active: "True",
    description: "Imported number",
    created: "08.04.2025 16:41:52,131",
    modified: "08.04.2025 16:41:52,131",
    created_by: "-",
    updated_by: "-",
  },
  {
    system_id: "20100",
    category: "Service",
    ctn: "998917932700",
    ip_address: "-",
    active: "True",
    description: "Imported number",
    created: "11.04.2025 11:13:30,041",
    modified: "11.04.2025 11:13:30,041",
    created_by: "-",
    updated_by: "-",
  },
  {
    system_id: "20100",
    category: "Service",
    ctn: "998909027001",
    ip_address: "-",
    active: "True",
    description: "Imported number",
    created: "11.04.2025 11:24:22,012",
    modified: "11.04.2025 11:24:22,012",
    created_by: "-",
    updated_by: "-",
  },
  {
    system_id: "20100",
    category: "Service",
    ctn: "998917927900",
    ip_address: "-",
    active: "True",
    description: "Imported number",
    created: "11.04.2025 11:24:39,086",
    modified: "11.04.2025 11:24:39,086",
    created_by: "-",
    updated_by: "-",
  },
  {
    system_id: "224200",
    category: "Default_category",
    ctn: "998900214800",
    ip_address: "-",
    active: "True",
    description: "Imported number",
    created: "08.04.2025 16:42:02,768",
    modified: "08.04.2025 16:42:02,768",
    created_by: "-",
    updated_by: "-",
  },
  {
    system_id: "20100",
    category: "Service",
    ctn: "998900017705",
    ip_address: "-",
    active: "True",
    description: "Imported number",
    created: "11.04.2025 11:28:05,220",
    modified: "11.04.2025 11:28:05,220",
    created_by: "-",
    updated_by: "-",
  },
]

// Колонки по старой таблице
const columns = [
  { key: "system_id", label: "System ID" },
  { key: "category", label: "Category" },
  { key: "ctn", label: "CTN" },
  { key: "ip_address", label: "IP Address" },
  { key: "active", label: "Active" },
  { key: "description", label: "Description" },
  {
    key: "created",
    label: "Created",
    render: (value: string) => value ? value.replace(/,\d+$/, "") : "",
  },
  {
    key: "modified",
    label: "Modified",
    render: (value: string) => value ? value.replace(/,\d+$/, "") : "",
  },
  { key: "created_by", label: "Created By" },
  { key: "updated_by", label: "Updated By" },
]

// Фильтры по нужным полям (пример)
const filters = {
  category: ["Default_category", "Service"],
  active: ["True", "False"],
  system_id: ["20100", "224200"],
}

export default function CTNsPage() {
  const router = useRouter()

  const handleRowClick = (item: any) => {
    router.push(`/ctns/${item.ctn}`)
  }

  const handleAdd = () => {
    router.push("/ctns/new")
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="CTNs"
        description="Calling/Called Telephone Numbers management"
        action={{
          label: "Add CTN",
          onClick: handleAdd,
          icon: Plus,
        }}
      />

      <DataTable
        columns={columns}
        data={sampleData}
        onRowClick={handleRowClick}
        searchPlaceholder="Search CTNs..."
        filters={filters}
      />
    </div>
  )
}
