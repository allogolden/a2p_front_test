import type { ApiResponse, PaginatedResponse, User, ANPattern, Partner, Message } from "@/types"
import { mockUsers, mockANPatterns, mockPartners, mockMessages } from "./mock-data"

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Generic CRUD operations
class MockAPI<T extends { id: string }> {
  constructor(private data: T[]) {}

  async getAll(page = 1, limit = 10, filters?: Record<string, any>): Promise<PaginatedResponse<T>> {
    await delay(300)

    let filteredData = [...this.data]

    if (filters) {
      filteredData = filteredData.filter((item) => {
        return Object.entries(filters).every(([key, value]) => {
          if (!value || value === "") return true
          const itemValue = (item as any)[key]
          return itemValue?.toString().toLowerCase().includes(value.toString().toLowerCase())
        })
      })
    }

    const total = filteredData.length
    const totalPages = Math.ceil(total / limit)
    const start = (page - 1) * limit
    const end = start + limit

    return {
      data: filteredData.slice(start, end),
      total,
      page,
      limit,
      totalPages,
    }
  }

  async getById(id: string): Promise<ApiResponse<T>> {
    await delay(200)
    const item = this.data.find((item) => item.id === id)

    if (!item) {
      return {
        data: null as any,
        success: false,
        message: "Item not found",
      }
    }

    return {
      data: item,
      success: true,
    }
  }

  async create(item: Omit<T, "id" | "created_at" | "updated_at">): Promise<ApiResponse<T>> {
    await delay(500)
    const newItem = {
      ...item,
      id: Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as T

    this.data.push(newItem)

    return {
      data: newItem,
      success: true,
      message: "Item created successfully",
    }
  }

  async update(id: string, updates: Partial<T>): Promise<ApiResponse<T>> {
    await delay(500)
    const index = this.data.findIndex((item) => item.id === id)

    if (index === -1) {
      return {
        data: null as any,
        success: false,
        message: "Item not found",
      }
    }

    this.data[index] = {
      ...this.data[index],
      ...updates,
      updated_at: new Date().toISOString(),
    }

    return {
      data: this.data[index],
      success: true,
      message: "Item updated successfully",
    }
  }

  async delete(id: string): Promise<ApiResponse<boolean>> {
    await delay(500)
    const index = this.data.findIndex((item) => item.id === id)

    if (index === -1) {
      return {
        data: false,
        success: false,
        message: "Item not found",
      }
    }

    this.data.splice(index, 1)

    return {
      data: true,
      success: true,
      message: "Item deleted successfully",
    }
  }
}

// API instances
export const usersAPI = new MockAPI<User>(mockUsers)
export const anPatternsAPI = new MockAPI<ANPattern>(mockANPatterns)
export const partnersAPI = new MockAPI<Partner>(mockPartners)
export const messagesAPI = new MockAPI<Message>(mockMessages)

// Auth API
export const authAPI = {
  async login(username: string, password: string): Promise<ApiResponse<User>> {
    await delay(1000)

    // Simple mock authentication
    if (username === "admin" && password === "admin") {
      return {
        data: mockUsers[0],
        success: true,
        message: "Login successful",
      }
    }

    return {
      data: null as any,
      success: false,
      message: "Invalid credentials",
    }
  },

  async logout(): Promise<ApiResponse<boolean>> {
    await delay(500)
    return {
      data: true,
      success: true,
      message: "Logout successful",
    }
  },

  async getCurrentUser(): Promise<ApiResponse<User>> {
    await delay(200)
    // Check if user is logged in (in real app, check token)
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"

    if (isLoggedIn) {
      return {
        data: mockUsers[0],
        success: true,
      }
    }

    return {
      data: null as any,
      success: false,
      message: "Not authenticated",
    }
  },
}
