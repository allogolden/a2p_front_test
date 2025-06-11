"use client"

import { useRouter } from "next/navigation"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"

// Данные по новой структуре
const sampleData = [
  {
    name: "Default_category",
    ctn: "998917792400",
    message_types: "Total: 0 (SAR: 0, UDH: 0, Payload: 0, Simple: 0)",
    pattern_stats: "Pattern Matched: 0, Auto Categorized: 0",
    source_types: "Alphaname: 0, Short Number: 0",
    last_updated: "2025-06-10 13:13:12",
  },
  {
    name: "eGov",
    ctn: "998900048741",
    message_types: "Total: 110 (SAR: 0, UDH: 74, Payload: 0, Simple: 36)",
    pattern_stats: "Pattern Matched: 110, Auto Categorized: 0",
    source_types: "Alphaname: 110, Short Number: 0",
    last_updated: "2025-06-10 13:13:12",
  },
  {
    name: "Reklama",
    ctn: "998910059727",
    message_types: "Total: 166 (SAR: 0, UDH: 112, Payload: 0, Simple: 54)",
    pattern_stats: "Pattern Matched: 166, Auto Categorized: 0",
    source_types: "Alphaname: 150, Short Number: 16",
    last_updated: "2025-06-10 13:13:12",
  },
  {
    name: "Reklama (Digital)",
    ctn: "998910059727",
    message_types: "Total: 60642 (SAR: 0, UDH: 4, Payload: 0, Simple: 60638)",
    pattern_stats: "Pattern Matched: 60642, Auto Categorized: 0",
    source_types: "Alphaname: 0, Short Number: 4340",
    last_updated: "2025-04-18 10:47:19",
  },
  {
    name: "Service",
    ctn: "998907881122",
    message_types: "Total: 0 (SAR: 0, UDH: 0, Payload: 0, Simple: 0)",
    pattern_stats: "Pattern Matched: 0, Auto Categorized: 0",
    source_types: "Alphaname: 0, Short Number: 0",
    last_updated: "2025-06-10 13:13:12",
  },
  {
    name: "Transaction",
    ctn: "998909652030",
    message_types: "Total: 41 (SAR: 0, UDH: 3, Payload: 0, Simple: 38)",
    pattern_stats: "Pattern Matched: 41, Auto Categorized: 0",
    source_types: "Alphaname: 26, Short Number: 12",
    last_updated: "2025-06-10 13:13:12",
  },
  {
    name: "Transactions",
    ctn: "998910059725",
    message_types: "Total: 0 (SAR: 0, UDH: 0, Payload: 0, Simple: 0)",
    pattern_stats: "Pattern Matched: 0, Auto Categorized: 0",
    source_types: "Alphaname: 0, Short Number: 0",
    last_updated: "2025-06-10 13:13:12",
  },
]

// Колонки для таблицы
const columns = [
  { key: "name", label: "Name" },
  { key: "ctn", label: "CTN" },
  { key: "message_types", label: "Message Types" },
  { key: "pattern_stats", label: "Pattern Stats" },
  { key: "source_types", label: "Source Types" },
  { key: "last_updated", label: "Last Updated" },
]

// Пример фильтров по имени
const filters = {
  name: [
    "Default_category",
    "eGov",
    "Reklama",
    "Reklama (Digital)",
    "Service",
    "Transaction",
    "Transactions",
  ]
}

export default function CategoryStatisticsPage() {
  const router = useRouter()

  const handleRowClick = (item: any) => {
    router.push(`/category-statistics/${item.name}`)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Category Statistics"
        description="Message category performance statistics"
      />

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
