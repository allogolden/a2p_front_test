"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"
import { StatisticsPanel } from "@/components/common/statistics-panel"

interface CategoryMT {
  id: string
  name: string
  ip_address: string
  cdr: string
  sms_type_number: string
  created: string
  modified: string
  created_by: string
  updated_by: string
}

interface CategoryStatistic {
  id: string
  name: string
  ctn: string
  message_types: string
  pattern_stats: string
  source_types: string
  last_updated: string
}

const categoryMTAPI = {
  list: async (): Promise<CategoryMT[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return [
      {
        id: "1",
        name: "Default_category",
        ip_address: "192.168.1.100",
        cdr: "enabled",
        sms_type_number: "1",
        created: "2024-01-01 10:00:00",
        modified: "2024-01-15 14:30:00",
        created_by: "admin",
        updated_by: "admin",
      },
      {
        id: "2",
        name: "eGov",
        ip_address: "192.168.1.101",
        cdr: "enabled",
        sms_type_number: "2",
        created: "2024-01-02 11:00:00",
        modified: "2024-01-14 16:20:00",
        created_by: "admin",
        updated_by: "operator",
      },
      {
        id: "3",
        name: "Reklama",
        ip_address: "192.168.1.102",
        cdr: "disabled",
        sms_type_number: "3",
        created: "2024-01-03 09:30:00",
        modified: "2024-01-13 12:45:00",
        created_by: "operator",
        updated_by: "admin",
      },
      {
        id: "4",
        name: "Service",
        ip_address: "192.168.1.103",
        cdr: "enabled",
        sms_type_number: "4",
        created: "2024-01-04 12:00:00",
        modified: "2024-01-12 10:15:00",
        created_by: "admin",
        updated_by: "admin",
      },
      {
        id: "5",
        name: "Transaction",
        ip_address: "192.168.1.104",
        cdr: "enabled",
        sms_type_number: "5",
        created: "2024-01-05 14:30:00",
        modified: "2024-01-11 16:45:00",
        created_by: "operator",
        updated_by: "operator",
      },
    ]
  },
}

const categoryStatisticsAPI = {
  list: async (): Promise<CategoryStatistic[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return [
      {
        id: "1",
        name: "Default_category",
        ctn: "1234",
        message_types: "SMS: 1500, MMS: 200, Total: 1700",
        pattern_stats: "Active: 15, Inactive: 3",
        source_types: "Alphaname: 1200, Short Number: 500",
        last_updated: "2024-01-15 10:30:00",
      },
      {
        id: "2",
        name: "eGov",
        ctn: "5678",
        message_types: "SMS: 2300, MMS: 150, Total: 2450",
        pattern_stats: "Active: 22, Inactive: 1",
        source_types: "Alphaname: 2000, Short Number: 450",
        last_updated: "2024-01-15 11:45:00",
      },
      {
        id: "3",
        name: "Reklama",
        ctn: "9999",
        message_types: "SMS: 800, MMS: 300, Total: 1100",
        pattern_stats: "Active: 8, Inactive: 5",
        source_types: "Alphaname: 600, Short Number: 500",
        last_updated: "2024-01-15 09:20:00",
      },
      {
        id: "4",
        name: "Service",
        ctn: "4567",
        message_types: "SMS: 1800, MMS: 100, Total: 1900",
        pattern_stats: "Active: 18, Inactive: 2",
        source_types: "Alphaname: 1500, Short Number: 400",
        last_updated: "2024-01-15 12:15:00",
      },
      {
        id: "5",
        name: "Transaction",
        ctn: "7890",
        message_types: "SMS: 3200, MMS: 50, Total: 3250",
        pattern_stats: "Active: 25, Inactive: 0",
        source_types: "Alphaname: 2800, Short Number: 450",
        last_updated: "2024-01-15 08:30:00",
      },
    ]
  },
}

const columns = [
  { key: "name", label: "Category Name" },
  { key: "ip_address", label: "IP Address" },
  { key: "cdr", label: "CDR" },
  { key: "sms_type_number", label: "SMS Type Number" },
  {
    key: "created",
    label: "Created",
    render: (value: string) => new Date(value).toLocaleDateString(),
  },
  {
    key: "modified",
    label: "Modified",
    render: (value: string) => new Date(value).toLocaleDateString(),
  },
  { key: "created_by", label: "Created By" },
  { key: "updated_by", label: "Updated By" },
]

const filters = {
  name: ["Default_category", "eGov", "Reklama", "Service", "Transaction"],
  cdr: ["enabled", "disabled"],
  created_by: ["admin", "operator"],
}

export default function CategoryMTPage() {
  const router = useRouter()
  const [data, setData] = useState<CategoryMT[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState<CategoryStatistic[]>([])
  const [statsLoading, setStatsLoading] = useState(true)
  const [statsError, setStatsError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    categoryMTAPI
      .list()
      .then((list) => setData(list))
      .catch(() => setError("Failed to load categories"))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    setStatsLoading(true)
    categoryStatisticsAPI
      .list()
      .then((list) => setStats(list))
      .catch(() => setStatsError("Failed to load statistics"))
      .finally(() => setStatsLoading(false))
  }, [])

  const handleRowClick = (item: CategoryMT) => {
    router.push(`/category-mt/${item.id}`)
  }

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/category-mt/${categoryId}`)
  }

  const handleAdd = () => {
    router.push("/category-mt/new")
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Category MT"
        description="Mobile Terminated message categories and analytics"
        action={{
          label: "Add Category",
          onClick: handleAdd,
          icon: Plus,
        }}
      />

      <StatisticsPanel data={stats} isLoading={statsLoading} onCategoryClick={handleCategoryClick} />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Category Management</h2>
        <DataTable
          columns={columns}
          data={data}
          isLoading={loading}
          onRowClick={handleRowClick}
          onAdd={handleAdd}
          addLabel="Add Category"
          searchPlaceholder="Search categories..."
          filters={filters}
        />
        {error && <div className="text-red-600 dark:text-red-400">{error}</div>}
      </div>
    </div>
  )
}

