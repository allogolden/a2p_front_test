"use client"

import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from "recharts"

interface DataItem {
  name: string
  id: string
  matched: number
  auto: number
}

export function PatternStatsChart({ data }: { data: DataItem[] }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="matched" fill="#22c55e" name="Pattern Matched" />
        <Bar dataKey="auto" fill="#8884d8" name="Auto Categorized" />
      </BarChart>
    </ResponsiveContainer>
  )
}
