"use client"

import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from "recharts"

interface DataItem {
  name: string
  id: string
  alphaname: number
  shortNumber: number
}

export function SourceTypesChart({ data }: { data: DataItem[] }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="alphaname" stackId="a" fill="#8884d8" name="Alphaname" />
        <Bar dataKey="shortNumber" stackId="a" fill="#82ca9d" name="Short Number" />
      </BarChart>
    </ResponsiveContainer>
  )
}
