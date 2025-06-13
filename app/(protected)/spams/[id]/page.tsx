"use client"

import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ActionButton } from "@/components/common/action-button"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import type { Spam } from "@/lib/api/spams"
import { spamsAPI } from "@/lib/api/spams"

export default function SpamDetailPage() {
  const router = useRouter()
  const params = useParams()

  const [item, setItem] = useState<Spam | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id === "new") {
      setItem({ id: "", content: "", source: "", detected_at: "", status: "" })
      setLoading(false)
      return
    }
    spamsAPI
      .getById(params.id as string)
      .then((data) => setItem(data))
      .catch(() => setError("Failed to load spam"))
      .finally(() => setLoading(false))
  }, [params.id])

  const handleSave = async () => {
    if (!item) return
    setSaving(true)
    try {
      if (params.id === "new") {
        await spamsAPI.create(item)
      } else {
        await spamsAPI.update(item.id, item)
      }
      router.push("/spams")
    } catch (e) {
      setError("Failed to save")
    } finally {
      setSaving(false)
    }
  }

  const handleBack = () => router.push("/spams")

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
            <h1 className="text-3xl font-bold">Spam not found</h1>
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
            {params.id === "new" ? "Create Spam" : "Edit Spam"}
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
          <CardTitle>Spam Details</CardTitle>
          <CardDescription>ID: {item.id || "new"}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Input
              id="content"
              value={item.content}
              onChange={(e) => setItem({ ...item!, content: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="source">Source</Label>
            <Input
              id="source"
              value={item.source}
              onChange={(e) => setItem({ ...item!, source: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="detected_at">Detected At</Label>
            <Input
              id="detected_at"
              value={item.detected_at}
              onChange={(e) => setItem({ ...item!, detected_at: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Input
              id="status"
              value={item.status}
              onChange={(e) => setItem({ ...item!, status: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
