"use client"

import { useRouter } from "next/navigation"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"

// Пример данных по старой структуре
const sampleData = [
  {
    system_id: "Ihmanafaqa",
    source_addr: "998909125286",
    destination_addr: "Ihmanafaqa",
    short_message: "id:D6AE74D1 sub:001 dlvrd:001 submit date:250609123704 done date:250609123707 stat:DELIVRD err:0 Text:report",
    ip_address: "-",
    created: "09.06.2025 12:37:07,766",
    modified: "09.06.2025 12:37:07,766",
  },
  {
    system_id: "Ihmanafaqa",
    source_addr: "998909125286",
    destination_addr: "Ihmanafaqa",
    short_message: "id:D6A72BD3 sub:001 dlvrd:001 submit date:250609123703 done date:250609123706 stat:DELIVRD err:0 Text:report",
    ip_address: "-",
    created: "09.06.2025 12:37:06,939",
    modified: "09.06.2025 12:37:06,939",
  },
  {
    system_id: "Ihmanafaqa",
    source_addr: "998909125286",
    destination_addr: "Ihmanafaqa",
    short_message: "id:D6AE5661 sub:001 dlvrd:001 submit date:250609123702 done date:250609123705 stat:DELIVRD err:0 Text:report",
    ip_address: "-",
    created: "09.06.2025 12:37:06,056",
    modified: "09.06.2025 12:37:06,056",
  },
  {
    system_id: "Ihmanafaqa",
    source_addr: "998910059727",
    destination_addr: "Ihmanafaqa",
    short_message: "id:D6A5F9F3 sub:001 dlvrd:001 submit date:250609123643 done date:250609123646 stat:DELIVRD err:0 Text:report",
    ip_address: "-",
    created: "09.06.2025 12:36:46,410",
    modified: "09.06.2025 12:36:46,410",
  },
  {
    system_id: "Ihmanafaqa",
    source_addr: "998910059727",
    destination_addr: "Ihmanafaqa",
    short_message: "id:D6AD4351 sub:001 dlvrd:001 submit date:250609123644 done date:250609123645 stat:DELIVRD err:0 Text:report",
    ip_address: "-",
    created: "09.06.2025 12:36:46,044",
    modified: "09.06.2025 12:36:46,044",
  },
  {
    system_id: "Ihmanafaqa",
    source_addr: "998910059727",
    destination_addr: "Ihmanafaqa",
    short_message: "id:D6A5E6F3 sub:001 dlvrd:001 submit date:250609123642 done date:250609123645 stat:DELIVRD err:0 Text:report",
    ip_address: "-",
    created: "09.06.2025 12:36:46,014",
    modified: "09.06.2025 12:36:46,014",
  },
]

// Колонки под старую таблицу
const columns = [
  { key: "system_id", label: "System ID" },
  { key: "source_addr", label: "Source_addr" },
  { key: "destination_addr", label: "Destination_addr" },
  { key: "short_message", label: "Short message" },
  { key: "ip_address", label: "IP Address" },
  { key: "created", label: "Created" },
  { key: "modified", label: "Modified" },
]

// Фильтры можно добавить по необходимости (пример)
const filters = {
  system_id: ["Ihmanafaqa"],
  // source_addr: ["998909125286", "998910059727"], // если нужно
}

export default function MOInterceptorLogsPage() {
  const router = useRouter()

  const handleRowClick = (item: any) => {
    router.push(`/mo-interceptor-logs/${item.system_id}_${item.created}`)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="MO Interceptor Logs"
        description="Mobile Originated message interception logs"
      />

      <DataTable
        columns={columns}
        data={sampleData}
        onRowClick={handleRowClick}
        searchPlaceholder="Search interceptor logs..."
        filters={filters}
      />
    </div>
  )
}
