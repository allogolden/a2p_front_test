"use client"

import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ActionButton } from "@/components/common/action-button"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import type { AuditLog } from "@/lib/api/audit-logs"
import { auditLogsAPI } from "@/lib/api/audit-logs"

export default function AuditLogDetailPage() {
  const router = useRouter()
  const params = useParams()

  const [item, setItem] = useState<AuditLog | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id === "new") {
      setItem({ id: "", user: "", timestamp: "", action: "", table: "", object: "", changes: "" })
      setLoading(false)
      return
    }
    auditLogsAPI
      .getById(params.id as string)
      .then((data) => setItem(data))
      .catch(() => setError("Failed to load log"))
      .finally(() => setLoading(false))
  }, [params.id])

  const handleSave = async () => {
    if (!item) return
    setSaving(true)
    try {
      if (params.id === "new") {
        await auditLogsAPI.create(item)
      } else {
        await auditLogsAPI.update(item.id, item)
      }
      router.push("/audit-logs")
    } catch (e) {
      setError("Failed to save")
    } finally {
      setSaving(false)
    }
  }

  const handleBack = () => router.push("/audit-logs")

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
            <h1 className="text-3xl font-bold">Log not found</h1>
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
            {params.id === "new" ? "Create Log" : "Edit Log"}
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
          <CardTitle>Log Details</CardTitle>
          <CardDescription>ID: {item.id || 'new'}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="user">User</Label>
            <Input
              id="user"
              value={item.user}
              onChange={(e) => setItem({ ...item, user: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timestamp">Timestamp</Label>
            <Input
              id="timestamp"
              value={item.timestamp}
              onChange={(e) => setItem({ ...item, timestamp: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="action">Action</Label>
            <Input
              id="action"
              value={item.action}
              onChange={(e) => setItem({ ...item, action: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="table">Table</Label>
            <Input
              id="table"
              value={item.table}
              onChange={(e) => setItem({ ...item, table: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="object">Object</Label>
            <Input
              id="object"
              value={item.object}
              onChange={(e) => setItem({ ...item, object: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="changes">Changes</Label>
            <Input
              id="changes"
              value={item.changes}
              onChange={(e) => setItem({ ...item, changes: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

