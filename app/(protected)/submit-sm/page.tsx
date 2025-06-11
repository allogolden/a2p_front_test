"use client"

import { useRouter } from "next/navigation"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"

// Используй только те столбцы, что есть в таблице ниже
const columns = [
  { key: "queue_message_id", label: "QUEUE MESSAGE ID" },
  { key: "source_address", label: "SOURCE ADDRESS" },
  { key: "destination_address", label: "DESTINATION ADDRESS" },
  { key: "short_message", label: "SHORT MESSAGE" },
  { key: "sequence_number", label: "SEQUENCE NUMBER" },
  { key: "created_at", label: "CREATED AT" },
]

// Пример данных, имена ключей соответствуют столбцам
const sampleData = [
  {
    id: "1",
    queue_message_id: "2D6FE4F8,698A4BE4,ECC36CD7",
    source_address: "Ihmanafaqa",
    destination_address: "998909125286",
    short_message: "Shaxsiy hisob raqam 2024-000001. Inson ijtimoiy xizmatlar markazi Qaroriga asosan...",
    sequence_number: "-",
    created_at: "June 9, 2025, 12:37 p.m.",
  },
  {
    id: "2",
    queue_message_id: "742B08B7,2764CEC7,8F2CBAE1",
    source_address: "Ihmanafaqa",
    destination_address: "998910059727",
    short_message: "Shaxsiy hisob raqam 2024-000001. Inson ijtimoiy xizmatlar markazi Qaroriga asosan...",
    sequence_number: "-",
    created_at: "June 9, 2025, 12:36 p.m.",
  },
  // ...добавь остальные строки по необходимости
]

export default function SubmitSMPage() {
  const router = useRouter()

  const handleRowClick = (item : any) => {
    router.push(`/submit-sm/${item.id}`)
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Submit SM" description="Submitted short messages log" />

      <DataTable
        columns={columns}
        data={sampleData}
        onRowClick={handleRowClick}
        searchPlaceholder="Search submitted messages..."
      />
    </div>
  )
}
