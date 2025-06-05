"use client"

import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

interface FiltersDropdownProps {
  filters: {
    [key: string]: string[]
  }
  activeFilters: {
    [key: string]: string[]
  }
  onFiltersChange: (filters: { [key: string]: string[] }) => void
}

export function FiltersDropdown({ filters, activeFilters, onFiltersChange }: FiltersDropdownProps) {
  const handleFilterChange = (category: string, value: string, checked: boolean) => {
    const newFilters = { ...activeFilters }
    if (!newFilters[category]) {
      newFilters[category] = []
    }

    if (checked) {
      newFilters[category] = [...newFilters[category], value]
    } else {
      newFilters[category] = newFilters[category].filter((item) => item !== value)
    }

    if (newFilters[category].length === 0) {
      delete newFilters[category]
    }

    onFiltersChange(newFilters)
  }

  const clearAllFilters = () => {
    onFiltersChange({})
  }

  const activeFilterCount = Object.values(activeFilters).flat().length

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="relative">
            <Filter className="mr-2 h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64" align="end">
          <div className="flex items-center justify-between p-2">
            <DropdownMenuLabel className="p-0">Filters</DropdownMenuLabel>
            {activeFilterCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear all
              </Button>
            )}
          </div>
          <DropdownMenuSeparator />
          {Object.entries(filters).map(([category, values]) => (
            <div key={category} className="p-2">
              <Label className="text-sm font-medium capitalize">{category}</Label>
              <div className="mt-2 space-y-2">
                {values.map((value) => (
                  <div key={value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${category}-${value}`}
                      checked={activeFilters[category]?.includes(value) || false}
                      onCheckedChange={(checked) => handleFilterChange(category, value, checked as boolean)}
                    />
                    <Label htmlFor={`${category}-${value}`} className="text-sm">
                      {value}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Active Filters */}
      {Object.entries(activeFilters).map(([category, values]) =>
        values.map((value) => (
          <Badge key={`${category}-${value}`} variant="secondary" className="gap-1">
            {value}
            <X className="h-3 w-3 cursor-pointer" onClick={() => handleFilterChange(category, value, false)} />
          </Badge>
        )),
      )}
    </div>
  )
}
