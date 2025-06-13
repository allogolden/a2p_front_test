"use client"

import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"
import { useEffect, useState } from "react"
import { fetchProtected } from "@/lib/utils"
import { alphanamesAPI } from "@/lib/api/alphanames"
import type { Alphaname } from "@/lib/api/alphanames"


// const alphaData = [
//   {
//     alpha_name: "Coursetop",
//     ctn: "998903494546",
//     system_id: "206200",
//     active: "True",
//     bind_mode: "Allow A2P only",
//     alias: "-",
//     ip_address: "-",
//     description: "Imported alpha name",
//     created: "08.04.2025 16:41:44",
//     modified: "08.04.2025 16:41:44",
//     created_by: "-",
//     updated_by: "-",
//   },
//   {
//     alpha_name: "MyUzcard",
//     ctn: "998917934800, 998909652030, 998917934800",
//     system_id: "20100",
//     active: "True",
//     bind_mode: "Allow A2P only",
//     alias: "-",
//     ip_address: "-",
//     description: "Imported alpha name",
//     created: "08.04.2025 16:41:52",
//     modified: "08.04.2025 16:41:52",
//     created_by: "-",
//     updated_by: "-",
//   },
//   {
//     alpha_name: "GoMusic",
//     ctn: "998909316888",
//     system_id: "208200",
//     active: "True",
//     bind_mode: "Allow A2P only",
//     alias: "-",
//     ip_address: "-",
//     description: "Imported alpha name",
//     created: "08.04.2025 16:42:11",
//     modified: "08.04.2025 16:42:11",
//     created_by: "-",
//     updated_by: "-",
//   },
//   {
//     alpha_name: "Roodell",
//     ctn: "998917913700",
//     system_id: "20100",
//     active: "True",
//     bind_mode: "Allow A2P only",
//     alias: "-",
//     ip_address: "-",
//     description: "Imported alpha name",
//     created: "08.04.2025 16:41:50",
//     modified: "08.04.2025 16:41:50",
//     created_by: "-",
//     updated_by: "-",
//   },
//   {
//     alpha_name: "Pm.Gov.UZ",
//     ctn: "998917792400, 998917792400",
//     system_id: "20100",
//     active: "True",
//     bind_mode: "Allow A2P only",
//     alias: "-",
//     ip_address: "-",
//     description: "Imported alpha name",
//     created: "08.04.2025 16:41:49",
//     modified: "08.04.2025 16:41:49",
//     created_by: "-",
//     updated_by: "-",
//   },
// ]



const columns = [
  { key: "alpha_name", label: "Alpha Name" },
  { key: "ctn", label: "CTN" },
  { key: "system_id", label: "System ID" },
  { key: "active", label: "Active" },
  { key: "bind_mode", label: "Bind mode" },
  { key: "alias", label: "Alias" },
  { key: "ip_address", label: "IP Address" },
  { key: "description", label: "Description" },
  {
    key: "created",
    label: "Created",
    render: (value: string) => new Date(value).toLocaleString(),
  },
  {
    key: "modified",
    label: "Modified",
    render: (value: string) => new Date(value).toLocaleString(),
  },
  { key: "created_by", label: "Created By" },
  { key: "updated_by", label: "Updated by" },
]

const filters = {
  active: ["True", "False"],
}

export default function AlphaNamesPage() {
  const router = useRouter()
  const [alphaData, setAlphaData] = useState<Alphaname[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    alphanamesAPI
      .list()
      .then((res) => setAlphaData(res.data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const handleRowClick = (item: Alphaname) => {
    router.push(`/alphanames/${item.id}`)
  }

  const handleAdd = () => {
    router.push("/alphanames/new")
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Alphanames"
        description="Manage alphanumeric sender IDs"
        action={{
          label: "Add Alphaname",
          onClick: handleAdd,
          icon: Plus,
        }}
      />

      <DataTable
        columns={columns}
        data={alphaData}
        onRowClick={handleRowClick}
        searchPlaceholder="Search alphanames..."
        filters={filters}
      />
    </div>
  )
}
