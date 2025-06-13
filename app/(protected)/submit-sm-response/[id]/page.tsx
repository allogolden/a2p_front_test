"use client"

import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ActionButton } from "@/components/common/action-button"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import type { SubmitSmResponse } from "@/lib/api/submit-sm-response"
import { submitSmResponseAPI } from "@/lib/api/submit-sm-response"

export default function SubmitSmResponseDetailPage() {
  const router = useRouter()
  const params = useParams()

  const [item, setItem] = useState<SubmitSmResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id === "new") {
      setItem({
        id: "",
        queue_message_id: "",
        smpp_message_id: "",
        command_status: "",
        sequence_number: "",
        created_at: "",
      })
      setLoading(false)
      return
    }
    submitSmResponseAPI
      .getById(params.id as string)
      .then((data) => setItem(data))
      .catch(() => setError("Failed to load response"))
      .finally(() => setLoading(false))
  }, [params.id])

  const handleSave = async () => {
    if (!item) return
    setSaving(true)
    try {
      if (params.id === "new") {
        await submitSmResponseAPI.create(item)
      } else {
        await submitSmResponseAPI.update(item.id, item)
      }
      router.push("/submit-sm-response")
    } catch (e) {
      setError("Failed to save")
    } finally {
      setSaving(false)
    }
  }

  const handleBack = () => router.push("/submit-sm-response")

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
            <h1 className="text-3xl font-bold">Response not found</h1>
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
            {params.id === "new" ? "Create Submit SM Response" : "Edit Submit SM Response"}
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
          <CardTitle>Submit SM Response Details</CardTitle>
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
            <Label htmlFor="smpp_message_id">SMPP Message ID</Label>
            <Input
              id="smpp_message_id"
              value={item.smpp_message_id}
              onChange={(e) => setItem({ ...item!, smpp_message_id: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="command_status">Command Status</Label>
            <Input
              id="command_status"
              value={item.command_status}
              onChange={(e) => setItem({ ...item!, command_status: e.target.value })}
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
