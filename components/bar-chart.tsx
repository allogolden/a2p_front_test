"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface BarChartData {
  name: string
  value: number
}

interface CustomBarChartProps {
  data: BarChartData[]
  title: string
  color?: string
}

export function CustomBarChart({ data, title, color = "#8884d8" }: CustomBarChartProps) {
  return (
    <div className="w-full h-[400px]">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
