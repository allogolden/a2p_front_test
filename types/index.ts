export interface User {
  id: string
  username: string
  email: string
  role: "admin" | "operator" | "viewer"
  status: "active" | "inactive"
  avatar?: string
  created_at: string
  updated_at: string
}

export interface ANPattern {
  id: string
  system_id: string
  alpha_name: string
  category: string
  status: "active" | "inactive"
  description: string
  created_at: string
  updated_at: string
}

export interface Partner {
  id: string
  name: string
  type: string
  status: "active" | "inactive"
  country: string
  contact_email: string
  contact_phone: string
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  message_id: string
  source?: string
  destination: string
  text: string
  status: "delivered" | "failed" | "pending" | "rejected"
  timestamp: string
  partner_id?: string
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}
