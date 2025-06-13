"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"
import type { CustomUser } from "@/lib/api/custom-users"
import { customUsersAPI } from "@/lib/api/custom-users"


// Колонки под старую таблицу
const columns = [
  { key: "username", label: "Username" },
  { key: "is_active", label: "Is active" },
  { key: "is_staff", label: "Is staff" },
  { key: "date_joined", label: "Date joined" },
]

// Можно добавить фильтры по активности и правам доступа
const filters = {
  is_active: ["True", "False"],
  is_staff: ["True", "False"],
}

export default function CustomUsersPage() {
  const router = useRouter()
  const [data, setData] = useState<CustomUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    customUsersAPI
      .list()
      .then((list) => setData(list))
      .catch(() => setError("Failed to load users"))
      .finally(() => setLoading(false))
  }, [])

  const handleRowClick = (item: CustomUser) => {
    router.push(`/custom-users/${item.id}`)
  }

  const handleAdd = () => {
    router.push("/custom-users/new")
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Custom Users"
        description="Manage system users and permissions"
        action={{
          label: "Add User",
          onClick: handleAdd,
          icon: Plus,
        }}
      />

        <DataTable
          columns={columns}
          data={data}
          isLoading={loading}
          onRowClick={handleRowClick}
          searchPlaceholder="Search users..."
          filters={filters}
        />
        {error && <div className="text-red-600">{error}</div>}
    </div>
  )
}
