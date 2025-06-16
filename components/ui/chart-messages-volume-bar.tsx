"use client"

import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer } from "recharts"

interface DataItem {
  name: string
  id: string
  value: number
}

interface Props {
  data: DataItem[]
  onClick?: (data: DataItem) => void
}

export function MessagesVolumeBar({ data, onClick }: Props) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => [Number(value).toLocaleString(), "Messages"]} />
        <Bar dataKey="value" fill="#8884d8" onClick={(entry) => onClick?.(entry.payload as DataItem)} style={{ cursor: "pointer" }} />
      </BarChart>
    </ResponsiveContainer>
  )
}
