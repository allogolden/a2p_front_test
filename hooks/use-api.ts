"use client"

import { useState, useEffect } from "react"
import type { PaginatedResponse, ApiResponse } from "@/types"

export function useAPI<T>(apiCall: () => Promise<PaginatedResponse<T> | ApiResponse<T>>, dependencies: any[] = []) {
  const [data, setData] = useState<T[] | T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await apiCall()

      if ("data" in response && Array.isArray(response.data)) {
        setData(response.data)
      } else if ("data" in response) {
        setData(response.data)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, dependencies)

  return { data, isLoading, error, refetch: () => fetchData() }
}
