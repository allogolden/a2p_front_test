"use client"

import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"

// Пример данных (замени на свой источник или API)
const sampleData = [
  {
    username: "AAbdusamadov",
    is_active: "True",
    is_staff: "True",
    date_joined: "April 24, 2025, 10:35 a.m.",
  },
  {
    username: "admin",
    is_active: "True",
    is_staff: "True",
    date_joined: "April 8, 2025, 4:34 p.m.",
  },
  {
    username: "akhadimetov",
    is_active: "True",
    is_staff: "True",
    date_joined: "May 26, 2025, 10:04 a.m.",
  },
  {
    username: "alkhabibulin",
    is_active: "True",
    is_staff: "True",
    date_joined: "April 17, 2025, 5:31 p.m.",
  },
  {
    username: "dsidikov",
    is_active: "True",
    is_staff: "True",
    date_joined: "April 17, 2025, 5:30 p.m.",
  },
  {
    username: "iturdiev",
    is_active: "True",
    is_staff: "True",
    date_joined: "May 29, 2025, 5:51 p.m.",
  },
  {
    username: "mmirhabibov",
    is_active: "True",
    is_staff: "True",
    date_joined: "May 29, 2025, 3:47 p.m.",
  },
  {
    username: "MMirhabibov",
    is_active: "True",
    is_staff: "True",
    date_joined: "May 29, 2025, 3:47 p.m.",
  },
  {
    username: "rsmustafaev",
    is_active: "True",
    is_staff: "True",
    date_joined: "May 26, 2025, 10:03 a.m.",
  },
  {
    username: "RSMustafaev",
    is_active: "True",
    is_staff: "True",
    date_joined: "May 26, 2025, 2:22 p.m.",
  },
  {
    username: "spanzhiev",
    is_active: "True",
    is_staff: "True",
    date_joined: "April 17, 2025, 5:26 p.m.",
  },
]

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

  const handleRowClick = (item: any) => {
    router.push(`/custom-users/${item.username}`)
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
        data={sampleData}
        onRowClick={handleRowClick}
        searchPlaceholder="Search users..."
        filters={filters}
      />
    </div>
  )
}
