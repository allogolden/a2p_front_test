import type { User, ANPattern, Partner, Message } from "@/types"

export const mockUsers: User[] = [
  {
    id: "1",
    username: "admin",
    email: "admin@a2p.com",
    role: "admin",
    status: "active",
    avatar: "/placeholder.svg?height=32&width=32",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    username: "operator",
    email: "operator@a2p.com",
    role: "operator",
    status: "active",
    created_at: "2024-01-02T00:00:00Z",
    updated_at: "2024-01-14T15:20:00Z",
  },
  {
    id: "3",
    username: "viewer",
    email: "viewer@a2p.com",
    role: "viewer",
    status: "inactive",
    created_at: "2024-01-03T00:00:00Z",
    updated_at: "2024-01-13T09:45:00Z",
  },
]

export const mockANPatterns: ANPattern[] = [
  {
    id: "1",
    system_id: "20100",
    alpha_name: "OLYMPIA.UZ",
    category: "Payment",
    status: "active",
    description: "Payment gateway pattern for Olympia platform",
    created_at: "2024-01-15T00:00:00Z",
    updated_at: "2024-01-20T10:30:00Z",
  },
  {
    id: "2",
    system_id: "20101",
    alpha_name: "FAAcademy",
    category: "Education",
    status: "active",
    description: "Educational platform notifications",
    created_at: "2024-01-16T00:00:00Z",
    updated_at: "2024-01-21T14:15:00Z",
  },
  {
    id: "3",
    system_id: "20102",
    alpha_name: "BILLZ",
    category: "Transaction",
    status: "inactive",
    description: "Billing system notifications",
    created_at: "2024-01-17T00:00:00Z",
    updated_at: "2024-01-22T16:45:00Z",
  },
]

export const mockPartners: Partner[] = [
  {
    id: "1",
    system_id: "sys_001",
    username: "partner_1",
    active: true,
    ip_address: "127.0.0.1",
    description: "Mock partner",
    created: "2024-01-01",
    modified: "2024-01-02",
    created_by: "admin",
    updated_by: "admin",
  },
  {
    id: "2",
    system_id: "sys_002",
    username: "partner_2",
    active: false,
    ip_address: "127.0.0.2",
    description: "Another partner",
    created: "2024-01-03",
    modified: "2024-01-04",
    created_by: "admin",
    updated_by: "editor",
  },
]

export const mockMessages: Message[] = [
  {
    id: "1",
    message_id: "MSG001",
    destination: "+998901234567",
    text: "Your OTP code is 123456",
    status: "delivered",
    timestamp: "2024-01-15T10:30:00Z",
    partner_id: "1",
  },
  {
    id: "2",
    message_id: "MSG002",
    destination: "+998901234568",
    text: "Payment received successfully",
    status: "pending",
    timestamp: "2024-01-15T10:31:00Z",
    partner_id: "2",
  },
  {
    id: "3",
    message_id: "MSG003",
    destination: "+998901234569",
    text: "Welcome to our service",
    status: "failed",
    timestamp: "2024-01-15T10:32:00Z",
    partner_id: "3",
  },
]
