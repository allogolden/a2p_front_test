"use client"

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface DataItem {
  name: string
  id: string
  value: number
  color: string
}

interface Props {
  data: DataItem[]
  onClick?: (data: DataItem) => void
}

export function MessagesByCategoryPie({ data, onClick }: Props) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart margin={{ right: 160 }}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="40%"
          cy="50%"
          outerRadius={100}
          onClick={(entry) => onClick?.(entry.payload as DataItem)}
          style={{ cursor: "pointer" }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [Number(value).toLocaleString(), "Messages"]} />
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="middle"
          formatter={(value: string) => {
            const item = data.find((m) => m.name === value)
            if (!item) return value
            const total = data.reduce((sum, m) => sum + m.value, 0)
            const percent = total > 0 ? ((item.value / total) * 100).toFixed(0) : "0"
            return `${value} (${percent}%)`
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
