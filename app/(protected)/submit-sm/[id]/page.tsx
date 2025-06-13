"use client"

import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ActionButton } from "@/components/common/action-button"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import type { SubmitSm } from "@/lib/api/submit-sm"
import { submitSmAPI } from "@/lib/api/submit-sm"

export default function SubmitSmDetailPage() {
  const router = useRouter()
  const params = useParams()

  const [item, setItem] = useState<SubmitSm | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id === "new") {
      setItem({
        id: "",
        queue_message_id: "",
        source_address: "",
        destination_address: "",
        short_message: "",
        sequence_number: "",
        created_at: "",
      })
      setLoading(false)
      return
    }
    submitSmAPI
      .getById(params.id as string)
      .then((data) => setItem(data))
      .catch(() => setError("Failed to load message"))
      .finally(() => setLoading(false))
  }, [params.id])

  const handleSave = async () => {
    if (!item) return
    setSaving(true)
    try {
      if (params.id === "new") {
        await submitSmAPI.create(item)
      } else {
        await submitSmAPI.update(item.id, item)
      }
      router.push("/submit-sm")
    } catch (e) {
      setError("Failed to save")
    } finally {
      setSaving(false)
    }
  }

  const handleBack = () => router.push("/submit-sm")

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
            <h1 className="text-3xl font-bold">Message not found</h1>
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
            {params.id === "new" ? "Create Submit SM" : "Edit Submit SM"}
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
          <CardTitle>Submit SM Details</CardTitle>
          <CardDescription>ID: {item.id || "new"}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="queue_message_id">Queue Message ID</Label>
            <Input
              id="queue_message_id"
              value={item.queue_message_id}
              onChange={(e) => setItem({ ...item!, queue_message_id: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="source_address">Source Address</Label>
            <Input
              id="source_address"
              value={item.source_address}
              onChange={(e) => setItem({ ...item!, source_address: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="destination_address">Destination Address</Label>
            <Input
              id="destination_address"
              value={item.destination_address}
              onChange={(e) =>
                setItem({ ...item!, destination_address: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="short_message">Short Message</Label>
            <Input
              id="short_message"
              value={item.short_message}
              onChange={(e) => setItem({ ...item!, short_message: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sequence_number">Sequence Number</Label>
            <Input
              id="sequence_number"
              value={item.sequence_number}
              onChange={(e) => setItem({ ...item!, sequence_number: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="created_at">Created At</Label>
            <Input
              id="created_at"
              value={item.created_at}
              onChange={(e) => setItem({ ...item!, created_at: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
