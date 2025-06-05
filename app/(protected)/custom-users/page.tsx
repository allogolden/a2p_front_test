"use client"

import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"
import { useAPI } from "@/hooks/use-api"
import { usersAPI } from "@/lib/api"
import type { User } from "@/types"

const columns = [
  { key: "id", label: "ID" },
  { key: "username", label: "USERNAME" },
  { key: "email", label: "EMAIL" },
  { key: "role", label: "ROLE" },
  { key: "status", label: "STATUS" },
  {
    key: "created_at",
    label: "CREATED AT",
    render: (value: string) => new Date(value).toLocaleDateString(),
  },
]

const filters = {
  role: ["admin", "operator", "viewer"],
  status: ["active", "inactive"],
}

export default function CustomUsersPage() {
  const router = useRouter()
  const { data: users, isLoading } = useAPI<User>(() => usersAPI.getAll())

  const handleRowClick = (item: User) => {
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
        data={(users as User[]) || []}
        onRowClick={handleRowClick}
        searchPlaceholder="Search users..."
        filters={filters}
        isLoading={isLoading}
      />
    </div>
  )
}
