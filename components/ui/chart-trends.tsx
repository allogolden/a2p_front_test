"use client"

import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from "recharts"

type TrendPoint = { date: string; messages: number; patterns: number; sources: number }

export function TrendsChart({ data }: { data: TrendPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="messages" stroke="#8884d8" name="Messages" dot />
        <Line type="monotone" dataKey="patterns" stroke="#22c55e" name="Pattern Matched" dot />
        <Line type="monotone" dataKey="sources" stroke="#ff7300" name="Sources" dot />
      </LineChart>
    </ResponsiveContainer>
  )
}
