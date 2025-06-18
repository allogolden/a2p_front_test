"use client"

import { useRouter } from "next/navigation"
import { DataTable } from "@/components/common/data-table"
import { PageHeader } from "@/components/common/page-header"
import { useEffect, useState } from "react"
import { fetchProtected } from "@/lib/utils"
import { alphanamesAPI } from "@/lib/api/alphanames"
import type { Alphaname } from "@/lib/api/alphanames"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { EnhancedDatePicker } from "@/components/enhanced-date-picker"
import { ModernStatisticsCard } from "@/components/modern-statistics-card"
import { BeautifulCharts } from "@/components/beautiful-charts"
import { Hash, MessageSquare, Database, TrendingUp, Plus, Search, RefreshCw } from "lucide-react"
import { alphanameSmsReportsAPI, type AlphanameSmsReport } from "@/lib/api/alphaname-sms-reports"


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
  const [error, setError] = useState<string | null>(null)
  const [reports, setReports] = useState<AlphanameSmsReport[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [fromDate, setFromDate] = useState<Date>()
  const [toDate, setToDate] = useState<Date>()
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    loadReports()
  }, [fromDate, toDate])

  const loadReports = async () => {
    setLoading(true)
    try {
      const data = await alphanameSmsReportsAPI.list(
        fromDate?.toISOString().split("T")[0],
        toDate?.toISOString().split("T")[0],
      )
      setReports(data)
    } catch (error) {
      console.error("Failed to load reports:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await loadReports()
    setRefreshing(false)
  }

  const handleDateChange = (from?: Date, to?: Date) => {
    setFromDate(from)
    setToDate(to)
  }

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
  const totalMessages = reports.reduce((sum, report) => sum + report.total, 0)
  const activeAlphanames = reports.length
  const totalDelivered = reports.reduce((sum, report) => sum + (report.statuses.delivered || 0), 0)
  const totalFailed = reports.reduce((sum, report) => sum + (report.statuses.failed || 0), 0)
  const deliveryRate = totalMessages > 0 ? ((totalDelivered / totalMessages) * 100).toFixed(1) : "0"

  // Prepare chart data
  const pieChartData = reports.map((report) => ({
    name: report.alphaname,
    value: report.total,
  }))

  const barChartData = reports.map((report) => ({
    name: report.alphaname,
    value: report.total,
  }))

  const lineChartData = reports.map((report) => ({
    name: report.alphaname,
    value: report.total,
    delivered: report.statuses.delivered || 0,
    failed: report.statuses.failed || 0,
  }))

  const filteredReports = reports.filter(
    (report) =>
      report.alphaname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.partner.toLowerCase().includes(searchTerm.toLowerCase()),
  )


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
      <div className="p-6 space-y-8 max-w-[1600px] mx-auto bg-gradient-to-br from-orange-50 via-white to-amber-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-3">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
            Alphaname Reports
          </h1>
          <p className="text-xl text-gray-600 font-medium">Alphaname performance analytics and message statistics</p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white hover:shadow-lg transition-all duration-300"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Alphaname
          </Button>
          <Button
            onClick={handleRefresh}
            disabled={refreshing}
            className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Date Range */}
      <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
        <CardHeader>
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Date Range Selection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EnhancedDatePicker from={fromDate} to={toDate} onDateChange={handleDateChange} />
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ModernStatisticsCard
          title="Total Messages"
          value={totalMessages}
          subtitle={`${reports.length} alphanames active`}
          icon={MessageSquare}
          trend="up"
          trendValue="+18.7%"
          color="blue"
          loading={loading}
        />
        <ModernStatisticsCard
          title="Active Alphanames"
          value={activeAlphanames}
          subtitle="All alphanames operational"
          icon={Hash}
          trend="neutral"
          trendValue="Stable"
          color="green"
          loading={loading}
        />
        <ModernStatisticsCard
          title="Total Delivered"
          value={totalDelivered}
          subtitle={`${totalFailed} failed`}
          icon={Database}
          trend="up"
          trendValue="+11.4%"
          color="purple"
          loading={loading}
        />
        <ModernStatisticsCard
          title="Delivery Rate"
          value={`${deliveryRate}%`}
          subtitle={`${totalDelivered}/${totalMessages} success`}
          icon={TrendingUp}
          trend="up"
          trendValue="+3.2%"
          color="orange"
          loading={loading}
        />
      </div>

      {/* Beautiful Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <BeautifulCharts data={pieChartData} title="Message Distribution by Alphaname" type="pie" height={450} />
        <BeautifulCharts data={barChartData} title="Alphaname Volume Analysis" type="bar" height={450} />
      </div>

      {/* Line Chart */}
      <BeautifulCharts data={lineChartData} title="Alphaname Performance Trends" type="line" height={450} />

      {/* Data Table */}
      <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Alphaname Management
            </CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search alphanames..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/60 border-gray-200 focus:bg-white transition-all duration-300"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-gray-200 overflow-hidden bg-white/50">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
                  <TableRow className="border-gray-200">
                    <TableHead className="font-bold text-gray-700">Alphaname</TableHead>
                    <TableHead className="font-bold text-gray-700">Partner</TableHead>
                    <TableHead className="font-bold text-gray-700">Total</TableHead>
                    <TableHead className="font-bold text-gray-700">Delivered</TableHead>
                    <TableHead className="font-bold text-gray-700">Failed</TableHead>
                    <TableHead className="font-bold text-gray-700">Success Rate</TableHead>
                    <TableHead className="font-bold text-gray-700">Categories</TableHead>
                    <TableHead className="font-bold text-gray-700">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                      <TableRow key={index} className="hover:bg-orange-50/30">
                        {Array.from({ length: 8 }).map((_, cellIndex) => (
                          <TableCell key={cellIndex}>
                            <div className="h-4 bg-gradient-to-r from-orange-200 to-amber-200 rounded animate-pulse"></div>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : filteredReports.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-12 text-gray-500">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center">
                            <Hash className="w-8 h-8 text-orange-400" />
                          </div>
                          <p className="text-lg font-medium">
                            {searchTerm ? "No alphanames found matching your search" : "No data available"}
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredReports.map((report) => {
                      const successRate =
                        report.total > 0 ? ((report.statuses.delivered / report.total) * 100).toFixed(1) : "0"

                      return (
                        <TableRow
                          key={report.id}
                          className="border-gray-200 hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-amber-50/50 transition-all duration-300"
                        >
                          <TableCell className="font-bold text-gray-900 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                            {report.alphaname}
                          </TableCell>
                          <TableCell className="font-medium text-gray-700">{report.partner}</TableCell>
                          <TableCell className="font-medium text-gray-700">{report.total.toLocaleString()}</TableCell>
                          <TableCell className="text-green-600 font-bold">
                            {report.statuses.delivered?.toLocaleString() || 0}
                          </TableCell>
                          <TableCell className="text-red-500 font-bold">
                            {report.statuses.failed?.toLocaleString() || 0}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`font-bold px-3 py-1 rounded-full text-sm ${
                                Number(successRate) > 95
                                  ? "bg-green-100 text-green-700"
                                  : Number(successRate) > 90
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-700"
                              }`}
                            >
                              {successRate}%
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {Object.entries(report.categories).map(([category, count]) => (
                                <span
                                  key={category}
                                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800"
                                >
                                  {category}: {count}
                                </span>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-600 font-medium">
                            {new Date(report.date).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      )
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

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
