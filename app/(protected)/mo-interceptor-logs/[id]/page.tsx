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
import type { MOInterceptorLog } from "@/lib/api/mo-interceptor-logs"
import { moInterceptorLogsAPI } from "@/lib/api/mo-interceptor-logs"

export default function MOInterceptorLogDetailPage() {
  const router = useRouter()
  const params = useParams()

  const [item, setItem] = useState<MOInterceptorLog | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id === "new") {
      setItem({
        id: "",
        system_id: "",
        source_addr: "",
        destination_addr: "",
        short_message: "",
        ip_address: "",
        created: "",
        modified: "",
      })
      setLoading(false)
      return
    }
    moInterceptorLogsAPI
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
        await moInterceptorLogsAPI.create(item)
      } else {
        await moInterceptorLogsAPI.update(item.id, item)
      }
      router.push("/mo-interceptor-logs")
    } catch (e) {
      setError("Failed to save")
    } finally {
      setSaving(false)
    }
  }

  const handleBack = () => router.push("/mo-interceptor-logs")

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
          <CardTitle>MO Interceptor Log Details</CardTitle>
          <CardDescription>ID: {item.id || "new"}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="system_id">System ID</Label>
            <Input
              id="system_id"
              value={item.system_id}
              onChange={(e) => setItem({ ...item, system_id: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="source_addr">Source Addr</Label>
            <Input
              id="source_addr"
              value={item.source_addr}
              onChange={(e) => setItem({ ...item, source_addr: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="destination_addr">Destination Addr</Label>
            <Input
              id="destination_addr"
              value={item.destination_addr}
              onChange={(e) =>
                setItem({ ...item, destination_addr: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="short_message">Short Message</Label>
            <Input
              id="short_message"
              value={item.short_message}
              onChange={(e) =>
                setItem({ ...item, short_message: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ip_address">IP Address</Label>
            <Input
              id="ip_address"
              value={item.ip_address}
              onChange={(e) => setItem({ ...item, ip_address: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="created">Created</Label>
            <Input
              id="created"
              value={item.created}
              onChange={(e) => setItem({ ...item, created: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="modified">Modified</Label>
            <Input
              id="modified"
              value={item.modified}
              onChange={(e) => setItem({ ...item, modified: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

