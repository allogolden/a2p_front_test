"use client"

import { useRouter } from "next/navigation"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"

// Колонки — только из данных
const columns = [
  { key: "queue_message_id", label: "QUEUE MESSAGE ID" },
  { key: "smpp_message_id", label: "SMPP MESSAGE ID" },
  { key: "command_status", label: "COMMAND STATUS" },
  { key: "sequence_number", label: "SEQUENCE NUMBER" },
  { key: "created_at", label: "CREATED AT" },
]

// Данные — ключи соответствуют колонкам из данных
const sampleData = [
  {
    id: "1",
    queue_message_id: "ECC36CD7",
    smpp_message_id: "D6AE74D1",
    command_status: "CommandStatus.ESME_ROK",
    sequence_number: "223",
    created_at: "June 9, 2025, 12:37 p.m.",
  },
  {
    id: "2",
    queue_message_id: "698A4BE4",
    smpp_message_id: "D6A72BD3",
    command_status: "CommandStatus.ESME_ROK",
    sequence_number: "222",
    created_at: "June 9, 2025, 12:37 p.m.",
  },
  {
    id: "3",
    queue_message_id: "2D6FE4F8",
    smpp_message_id: "D6AE5661",
    command_status: "CommandStatus.ESME_ROK",
    sequence_number: "221",
    created_at: "June 9, 2025, 12:37 p.m.",
  },
  {
    id: "4",
    queue_message_id: "8F2CBAE1",
    smpp_message_id: "D6AD4351",
    command_status: "CommandStatus.ESME_ROK",
    sequence_number: "220",
    created_at: "June 9, 2025, 12:36 p.m.",
  },
  {
    id: "5",
    queue_message_id: "2764CEC7",
    smpp_message_id: "D6A5F9F3",
    command_status: "CommandStatus.ESME_ROK",
    sequence_number: "219",
    created_at: "June 9, 2025, 12:36 p.m.",
  },
  {
    id: "6",
    queue_message_id: "742B08B7",
    smpp_message_id: "D6A5E6F3",
    command_status: "CommandStatus.ESME_ROK",
    sequence_number: "218",
    created_at: "June 9, 2025, 12:36 p.m.",
  },
  {
    id: "7",
    queue_message_id: "207369E1",
    smpp_message_id: "D6919771",
    command_status: "CommandStatus.ESME_ROK",
    sequence_number: "204",
    created_at: "June 9, 2025, 12:29 p.m.",
  },
  // ... добавь остальные строки при необходимости
]

export default function SubmitSMResponsePage() {
  const router = useRouter()

  const handleRowClick = (item : any) => {
    router.push(`/submit-sm-response/${item.id}`)
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Submit SM Response" description="Submit short message response codes" />

      <DataTable
        columns={columns}
        data={sampleData}
        onRowClick={handleRowClick}
        searchPlaceholder="Search responses..."
      />
    </div>
  )
}
