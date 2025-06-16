"use client"

import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from "recharts"

interface DataItem {
  name: string
  id: string
  sar: number
  udh: number
  payload: number
  simple: number
}

export function MessageTypeChart({ data }: { data: DataItem[] }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sar" stackId="a" fill="#8884d8" name="SAR" />
        <Bar dataKey="udh" stackId="a" fill="#82ca9d" name="UDH" />
        <Bar dataKey="payload" stackId="a" fill="#ffc658" name="Payload" />
        <Bar dataKey="simple" stackId="a" fill="#ff7300" name="Simple" />
      </BarChart>
    </ResponsiveContainer>
  )
}
