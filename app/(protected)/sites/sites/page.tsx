"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"
import type { Site } from "@/lib/api/sites"
import { sitesAPI } from "@/lib/api/sites"

// Только два столбца: display_name и domain
const columns = [
  { key: "display_name", label: "DISPLAY NAME" },
  { key: "domain", label: "DOMAIN" },
]

// Список сайтов загружается по API

export default function SitesPage() {
  const router = useRouter()
  const [sites, setSites] = useState<Site[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    sitesAPI
      .list()
      .then((data) => setSites(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

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
        data={sites}
        onRowClick={handleRowClick}
        searchPlaceholder="Search sites..."
        isLoading={loading}
      />
      {error && <div className="text-red-600">{error}</div>}
    </div>
  )
}
