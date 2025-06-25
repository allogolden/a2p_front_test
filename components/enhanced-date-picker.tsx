"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, RotateCcw } from "lucide-react"
import { format, parse, isValid, subDays, startOfDay, endOfDay } from "date-fns"

interface EnhancedDatePickerProps {
  from?: Date
  to?: Date
  onDateChange: (from?: Date, to?: Date) => void
  className?: string
}

const presets = [
  { label: "Today", getValue: () => ({ from: startOfDay(new Date()), to: endOfDay(new Date()) }) },
  {
    label: "Yesterday",
    getValue: () => ({ from: startOfDay(subDays(new Date(), 1)), to: endOfDay(subDays(new Date(), 1)) }),
  },
  { label: "Last 7 days", getValue: () => ({ from: startOfDay(subDays(new Date(), 6)), to: endOfDay(new Date()) }) },
  { label: "Last 30 days", getValue: () => ({ from: startOfDay(subDays(new Date(), 29)), to: endOfDay(new Date()) }) },
  {
    label: "This month",
    getValue: () => ({ from: startOfDay(subDays(new Date(), new Date().getDate() - 1)), to: endOfDay(new Date()) }),
  },
]

export function EnhancedDatePicker({ from, to, onDateChange, className }: EnhancedDatePickerProps) {
  const [fromOpen, setFromOpen] = useState(false)
  const [toOpen, setToOpen] = useState(false)
  const [fromInput, setFromInput] = useState(from ? format(from, "yyyy-MM-dd") : "")
  const [toInput, setToInput] = useState(to ? format(to, "yyyy-MM-dd") : "")

  useEffect(() => {
    setFromInput(from ? format(from, "yyyy-MM-dd") : "")
    setToInput(to ? format(to, "yyyy-MM-dd") : "")
  }, [from, to])

  const handleFromInputChange = (value: string) => {
    setFromInput(value)
    if (value) {
      const parsedDate = parse(value, "yyyy-MM-dd", new Date())
      if (isValid(parsedDate)) {
        onDateChange(startOfDay(parsedDate), to)
      }
    } else {
      onDateChange(undefined, to)
    }
  }

  const handleToInputChange = (value: string) => {
    setToInput(value)
    if (value) {
      const parsedDate = parse(value, "yyyy-MM-dd", new Date())
      if (isValid(parsedDate)) {
        onDateChange(from, endOfDay(parsedDate))
      }
    } else {
      onDateChange(from, undefined)
    }
  }

  const handleFromCalendarSelect = (date: Date | undefined) => {
    if (date) {
      onDateChange(startOfDay(date), to)
      setFromInput(format(date, "yyyy-MM-dd"))
    }
    setFromOpen(false)
  }

  const handleToCalendarSelect = (date: Date | undefined) => {
    if (date) {
      onDateChange(from, endOfDay(date))
      setToInput(format(date, "yyyy-MM-dd"))
    }
    setToOpen(false)
  }

  const handlePresetClick = (preset: (typeof presets)[0]) => {
    const { from: presetFrom, to: presetTo } = preset.getValue()
    onDateChange(presetFrom, presetTo)
  }

  const handleReset = () => {
    onDateChange(undefined, undefined)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Presets */}
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <Button
            key={preset.label}
            variant="outline"
            size="sm"
            onClick={() => handlePresetClick(preset)}
            className="text-xs"
          >
            {preset.label}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="text-xs"
        >
          <RotateCcw className="w-3 h-3 mr-1" />
          Reset
        </Button>
      </div>

      {/* Date Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* From Date */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">From Date</Label>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                type="date"
                value={fromInput}
                onChange={(e) => handleFromInputChange(e.target.value)}
              />
            </div>
            <Popover open={fromOpen} onOpenChange={setFromOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon">
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={from} onSelect={handleFromCalendarSelect} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* To Date */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">To Date</Label>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                type="date"
                value={toInput}
                onChange={(e) => handleToInputChange(e.target.value)}
              />
            </div>
            <Popover open={toOpen} onOpenChange={setToOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon">
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={to} onSelect={handleToCalendarSelect} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* Selected Range Display */}
      {from && to && (
        <div className="p-3 bg-muted border rounded-lg">
          <div className="flex items-center gap-2 text-sm">
            <CalendarIcon className="w-4 h-4" />
            <span className="font-medium">Selected Range:</span>
            <span>
              {format(from, "MMM dd, yyyy")} - {format(to, "MMM dd, yyyy")}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
