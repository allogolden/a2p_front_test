"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format, parse, isValid } from "date-fns"

interface RefinedDatePickerProps {
  from?: Date
  to?: Date
  onDateChange: (from?: Date, to?: Date) => void
}

export function RefinedDatePicker({ from, to, onDateChange }: RefinedDatePickerProps) {
  const [fromOpen, setFromOpen] = useState(false)
  const [toOpen, setToOpen] = useState(false)
  const [fromInput, setFromInput] = useState(from ? format(from, "yyyy-MM-dd") : "")
  const [toInput, setToInput] = useState(to ? format(to, "yyyy-MM-dd") : "")

  const handleFromInputChange = (value: string) => {
    setFromInput(value)
    if (value) {
      const parsedDate = parse(value, "yyyy-MM-dd", new Date())
      if (isValid(parsedDate)) {
        onDateChange(parsedDate, to)
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
        onDateChange(from, parsedDate)
      }
    } else {
      onDateChange(from, undefined)
    }
  }

  const handleFromCalendarSelect = (date: Date | undefined) => {
    onDateChange(date, to)
    setFromInput(date ? format(date, "yyyy-MM-dd") : "")
    setFromOpen(false)
  }

  const handleToCalendarSelect = (date: Date | undefined) => {
    onDateChange(from, date)
    setToInput(date ? format(date, "yyyy-MM-dd") : "")
    setToOpen(false)
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <div className="flex flex-col gap-2 w-full sm:w-auto">
        <label className="text-sm font-medium text-gray-700">From</label>
        <div className="flex gap-2">
          <Input
            type="date"
            value={fromInput}
            onChange={(e) => handleFromInputChange(e.target.value)}
            className="w-40 bg-white/60 border-gray-200/50 hover:bg-white/80"
            placeholder="YYYY-MM-DD"
          />
          <Popover open={fromOpen} onOpenChange={setFromOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="bg-white/60 border-gray-200/50 hover:bg-white/80">
                <CalendarIcon className="h-4 w-4 text-gray-500" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white/95 backdrop-blur-sm" align="start">
              <Calendar mode="single" selected={from} onSelect={handleFromCalendarSelect} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="text-gray-400 hidden sm:block mt-6">to</div>

      <div className="flex flex-col gap-2 w-full sm:w-auto">
        <label className="text-sm font-medium text-gray-700">To</label>
        <div className="flex gap-2">
          <Input
            type="date"
            value={toInput}
            onChange={(e) => handleToInputChange(e.target.value)}
            className="w-40 bg-white/60 border-gray-200/50 hover:bg-white/80"
            placeholder="YYYY-MM-DD"
          />
          <Popover open={toOpen} onOpenChange={setToOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="bg-white/60 border-gray-200/50 hover:bg-white/80">
                <CalendarIcon className="h-4 w-4 text-gray-500" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white/95 backdrop-blur-sm" align="start">
              <Calendar mode="single" selected={to} onSelect={handleToCalendarSelect} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
}
