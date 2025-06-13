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
import type { MOMessages } from "@/lib/api/mo-messages"
import { moMessagesAPI } from "@/lib/api/mo-messages"

export default function MOMessagesDetailPage() {
  const router = useRouter()
  const params = useParams()

  const [item, setItem] = useState<MOMessages | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id === "new") {
      setItem({
        id: "",
        queue_message_id: "",
        smpp_message_id: "",
        source_addr: "",
        destination_addr: "",
        category: "",
        submit_status: "",
        submit_resp_status: "",
        delivery_status: "",
        mt_interceptor_log_id: "",
        process_status: "",
        sent_at: "",
        delivered_at: "",
      })
      setLoading(false)
      return
    }
    moMessagesAPI
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
        await moMessagesAPI.create(item)
      } else {
        await moMessagesAPI.update(item.id, item)
      }
      router.push("/mo-messages")
    } catch (e) {
      setError("Failed to save")
    } finally {
      setSaving(false)
    }
  }

  const handleBack = () => router.push("/mo-messages")

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
            {params.id === "new" ? "Create Message" : "Edit Message"}
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
          <CardTitle>MO Message Details</CardTitle>
          <CardDescription>ID: {item.id || "new"}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="queue_message_id">Queue Message ID</Label>
            <Input
              id="queue_message_id"
              value={item.queue_message_id}
              onChange={(e) =>
                setItem({ ...item, queue_message_id: e.target.value })
              }
            />
          </div>
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
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={item.category}
              onChange={(e) => setItem({ ...item, category: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="submit_status">Submit Status</Label>
            <Input
              id="submit_status"
              value={item.submit_status}
              onChange={(e) =>
                setItem({ ...item, submit_status: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="submit_resp_status">Submit Resp Status</Label>
            <Input
              id="submit_resp_status"
              value={item.submit_resp_status}
              onChange={(e) =>
                setItem({ ...item, submit_resp_status: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="delivery_status">Delivery Status</Label>
            <Input
              id="delivery_status"
              value={item.delivery_status}
              onChange={(e) =>
                setItem({ ...item, delivery_status: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mt_interceptor_log_id">MT Interceptor Log ID</Label>
            <Input
              id="mt_interceptor_log_id"
              value={item.mt_interceptor_log_id}
              onChange={(e) =>
                setItem({ ...item, mt_interceptor_log_id: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="process_status">Process Status</Label>
            <Input
              id="process_status"
              value={item.process_status}
              onChange={(e) =>
                setItem({ ...item, process_status: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sent_at">Sent At</Label>
            <Input
              id="sent_at"
              value={item.sent_at}
              onChange={(e) => setItem({ ...item, sent_at: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="delivered_at">Delivered At</Label>
            <Input
              id="delivered_at"
              value={item.delivered_at}
              onChange={(e) =>
                setItem({ ...item, delivered_at: e.target.value })
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

