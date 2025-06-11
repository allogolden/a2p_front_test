"use client"

import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"

// Только два столбца: display_name и domain
const columns = [
  { key: "display_name", label: "DISPLAY NAME" },
  { key: "domain", label: "DOMAIN" },
]

// Пример данных с двумя полями
const sampleData = [
  { id: "1", display_name: "example.com", domain: "example.com" },
  { id: "2", display_name: "api.example.com", domain: "api.example.com" },
  { id: "3", display_name: "Admin Panel", domain: "admin.a2p.example.com" },
]

export default function SitesPage() {
  const router = useRouter()

  const handleRowClick = (item : any) => {
    router.push(`/sites/sites/${item.id}`) // переход на детальную страницу
  }

  const handleAdd = () => {
    router.push("/sites/sites/new") // переход на создание нового сайта
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sites"
        description="Website and domain management"
        action={{
          label: "Add Site",
          onClick: handleAdd,
          icon: Plus,
        }}
      />

      <DataTable
        columns={columns}
        data={sampleData}
        onRowClick={handleRowClick}
        searchPlaceholder="Search sites..."
        // фильтров нет, т.к. всего два столбца и фильтровать нечего
      />
    </div>
  )
}
