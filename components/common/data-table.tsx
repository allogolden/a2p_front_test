"use client"

import * as React from "react"
import { Plus } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SearchInput } from "./search-input"
import { ActionButton } from "./action-button"
import { StatusBadge } from "./status-badge"
import { LoadingSpinner } from "./loading-spinner"
import { FiltersDropdown } from "./filters-dropdown"

interface Column {
  key: string
  label: string
  render?: (value: any, item: any) => React.ReactNode
}

interface DataTableProps {
  columns: Column[]
  data: any[]
  onRowClick?: (item: any) => void
  onAdd?: () => void
  addLabel?: string
  searchPlaceholder?: string
  filters?: {
    [key: string]: string[]
  }
  isLoading?: boolean
}

export function DataTable({
  columns,
  data,
  onRowClick,
  onAdd,
  addLabel = "Add Item",
  searchPlaceholder = "Search...",
  filters = {},
  isLoading = false,
}: DataTableProps) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [activeFilters, setActiveFilters] = React.useState<{ [key: string]: string[] }>({})

  const filteredData = React.useMemo(() => {
    return data.filter((item) => {
      // Search filter
      const matchesSearch = Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase()),
      )

      // Active filters
      const matchesFilters = Object.entries(activeFilters).every(([category, values]) => {
        if (values.length === 0) return true
        const itemValue = item[category.toLowerCase()]
        return values.includes(itemValue)
      })

      return matchesSearch && matchesFilters
    })
  }, [data, searchTerm, activeFilters])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder={searchPlaceholder} />
          <FiltersDropdown filters={filters} activeFilters={activeFilters} onFiltersChange={setActiveFilters} />
        </div>
        <div className="rounded-lg border bg-card p-8">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder={searchPlaceholder} />
        <FiltersDropdown filters={filters} activeFilters={activeFilters} onFiltersChange={setActiveFilters} />
        {onAdd && (
          <ActionButton onClick={onAdd} icon={Plus}>
            {addLabel}
          </ActionButton>
        )}
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-muted">
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              {columns.map((column) => (
                <TableHead key={column.key} className="font-medium text-muted-foreground">
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item, index) => (
              <TableRow
                key={item.id || index}
                className="cursor-pointer hover:bg-muted transition-colors"
                onClick={() => onRowClick?.(item)}
              >
                <TableCell>
                  <Checkbox onClick={e => e.stopPropagation()} />
                </TableCell>
                {columns.map((column) => (
                  <TableCell key={column.key} className="font-medium">
                    {column.render ? (
                      column.render(item[column.key], item)
                    ) : column.key.toLowerCase().includes("status") ? (
                      <StatusBadge status={item[column.key]} />
                    ) : (
                      item[column.key]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
