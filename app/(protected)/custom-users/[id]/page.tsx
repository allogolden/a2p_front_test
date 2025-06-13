"use client"

import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ActionButton } from "@/components/common/action-button"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import type { CustomUser } from "@/lib/api/custom-users"
import { customUsersAPI } from "@/lib/api/custom-users"

export default function CustomUserDetailPage() {
  const router = useRouter()
  const params = useParams()

  const [item, setItem] = useState<CustomUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id === "new") {
      setItem({
        id: "",
        username: "",
        is_active: false,
        is_staff: false,
        date_joined: "",
      })
      setLoading(false)
      return
    }
    customUsersAPI
      .getById(params.id as string)
      .then((data) => setItem(data))
      .catch(() => setError("Failed to load user"))
      .finally(() => setLoading(false))
  }, [params.id])

  const handleSave = async () => {
    if (!item) return
    setSaving(true)
    try {
      if (params.id === "new") {
        await customUsersAPI.create(item)
      } else {
        await customUsersAPI.update(item.id, item)
      }
      router.push("/custom-users")
    } catch (e) {
      setError("Failed to save")
    } finally {
      setSaving(false)
    }
  }

  const handleBack = () => router.push("/custom-users")

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <ActionButton onClick={handleBack} variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </ActionButton>
          <div>
            <h1 className="text-3xl font-bold">Loading...</h1>
          </div>
        </div>
        <Card>
          <CardContent className="p-8">
            <LoadingSpinner size="lg" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <ActionButton onClick={handleBack} variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </ActionButton>
          <div>
            <h1 className="text-3xl font-bold">User not found</h1>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <ActionButton onClick={handleBack} variant="ghost" size="icon">
          <ArrowLeft className="h-4 w-4" />
        </ActionButton>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">
            {params.id === "new" ? "Create User" : "Edit User"}
          </h1>
        </div>
        <div className="flex gap-2">
          <ActionButton onClick={handleSave} icon={Save} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </ActionButton>
        </div>
      </div>

      {error && <div className="text-red-600">{error}</div>}

      <Card>
        <CardHeader>
          <CardTitle>User Details</CardTitle>
          <CardDescription>ID: {item.id || "new"}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={item.username}
              onChange={(e) => setItem({ ...item, username: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="is_active">Is Active</Label>
            <Input
              id="is_active"
              value={item.is_active?.toString()}
              onChange={(e) => setItem({ ...item, is_active: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="is_staff">Is Staff</Label>
            <Input
              id="is_staff"
              value={item.is_staff?.toString()}
              onChange={(e) => setItem({ ...item, is_staff: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date_joined">Date Joined</Label>
            <Input
              id="date_joined"
              value={item.date_joined}
              onChange={(e) => setItem({ ...item, date_joined: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
