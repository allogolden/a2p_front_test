"use client"

import { useRouter } from "next/navigation"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"

const sampleData = [
  {
    source_addr: "Ihmanafaqa",
    system_id: "egov",
    destination_addr: "998909125286",
    ip_address: "-",
    short_message: "Shaxsiy hisob raqam 2024-000001. Inson ijtimoiy xizmatlar markazi Qaroriga asosan 2024 yil fevral oyidan Sizning oylik 50% nafaqa miqdoringizga Inson ijtimoiy xizmatlar markazi tomonidan chegirma belgilandi. Ma'lumot uchun Inson ijtimoiy xizmatlar markaziga murojaat etishingiz yoki 1140 Ishonch telefoniga murojaat qilishingiz mumkin.",
    category: "eGov",
    mt_interceptor_id: "b3e71e9a-f667-4ba7-b8d8-68ef33c2be9f",
    category_id: "8ebb0a27-4e5a-4e65-8f42-fc37947e2dc3",
    created: "09.06.2025 12:37:02,513",
    modified: "09.06.2025 12:37:02,513",
  },
  {
    source_addr: "Ihmanafaqa",
    system_id: "egov",
    destination_addr: "998910059727",
    ip_address: "-",
    short_message: "Shaxsiy hisob raqam 2024-000001. Sizga Yoshga doir to'lovi Mumtoz mahallasida Xalq banki kassasi tomonidan amalga oshiriladi. Savol va ma'lumotlar bo'yicha mahalla fuqarolar yig'iniga Ijtimoiy himoya milliy agentligining 1140 Ishonch telefoniga murojaat qilishingiz mumkin.",
    category: "eGov",
    mt_interceptor_id: "09b90b9b-63fb-4620-a14b-cc50649ace0d",
    category_id: "8ebb0a27-4e5a-4e65-8f42-fc37947e2dc3",
    created: "09.06.2025 10:55:45,795",
    modified: "09.06.2025 10:55:45,795",
  },
  // ...добавь остальные строки по аналогии
]

const columns = [
  { key: "source_addr", label: "Source_addr" },
  { key: "system_id", label: "System ID" },
  { key: "destination_addr", label: "Destination_addr" },
  { key: "ip_address", label: "IP Address" },
  { key: "short_message", label: "Short message" },
  { key: "category", label: "Category" },
  { key: "mt_interceptor_id", label: "MT Interceptor ID" },
  { key: "category_id", label: "Category ID" },
  { key: "created", label: "Created" },
  { key: "modified", label: "Modified" },
]

const filters = {
  category: ["eGov", "-"],
  // Добавь дополнительные фильтры, если нужно
}

export default function MTInterceptorLogsPage() {
  const router = useRouter()

  const handleRowClick = (item: any) => {
    router.push(`/mt-interceptor-logs/${item.mt_interceptor_id}`)
  }

  return (
    <div className="space-y-6">
      <PageHeader title="MT Interceptor Logs" description="Mobile Terminated message interception logs" />
      <DataTable
        columns={columns}
        data={sampleData}
        onRowClick={handleRowClick}
        searchPlaceholder="Search MT interceptor logs..."
        filters={filters}
      />
    </div>
  )
}
