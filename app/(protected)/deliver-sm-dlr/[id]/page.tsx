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
import type { DeliverSmDLR } from "@/lib/api/deliver-sm-dlr"
import { deliverSmDLRAPI } from "@/lib/api/deliver-sm-dlr"

export default function DeliverSmDLRDetailPage() {
  const router = useRouter()
  const params = useParams()

  const [item, setItem] = useState<DeliverSmDLR | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id === "new") {
      setItem({
        id: "",
        smpp_message_id: "",
        delivery_status: "",
        message_content_snippet: "",
        created_at: "",
      })
      setLoading(false)
      return
    }
    deliverSmDLRAPI
      .getById(params.id as string)
      .then((data) => setItem(data))
      .catch(() => setError("Failed to load DLR"))
      .finally(() => setLoading(false))
  }, [params.id])

  const handleSave = async () => {
    if (!item) return
    setSaving(true)
    try {
      if (params.id === "new") {
        await deliverSmDLRAPI.create(item)
      } else {
        await deliverSmDLRAPI.update(item.id, item)
      }
      router.push("/deliver-sm-dlr")
    } catch (e) {
      setError("Failed to save")
    } finally {
      setSaving(false)
    }
  }

  const handleBack = () => router.push("/deliver-sm-dlr")

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
            <h1 className="text-3xl font-bold">DLR not found</h1>
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
            {params.id === "new" ? "Create DLR" : "Edit DLR"}
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
          <CardTitle>DLR Details</CardTitle>
          <CardDescription>ID: {item.id || "new"}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="smpp_message_id">SMPP Message ID</Label>
            <Input
              id="smpp_message_id"
              value={item.smpp_message_id}
              onChange={(e) =>
                setItem({ ...item, smpp_message_id: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="delivery_status">Delivery status</Label>
            <Input
              id="delivery_status"
              value={item.delivery_status}
              onChange={(e) =>
                setItem({ ...item, delivery_status: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message_content_snippet">Message Content Snippet</Label>
            <Input
              id="message_content_snippet"
              value={item.message_content_snippet}
              onChange={(e) =>
                setItem({ ...item, message_content_snippet: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="created_at">Created at</Label>
            <Input
              id="created_at"
              value={item.created_at}
              onChange={(e) =>
                setItem({ ...item, created_at: e.target.value })
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

