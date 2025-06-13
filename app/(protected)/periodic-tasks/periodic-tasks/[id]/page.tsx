"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionButton } from "@/components/common/action-button";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import type { PeriodicTask } from "@/lib/api/periodic-tesks";
import { periodicTasksAPI } from "@/lib/api/periodic-tesks";

export default function PeriodicTaskDetailPage() {
  const router = useRouter();
  const params = useParams();

  const [item, setItem] = useState<PeriodicTask | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id === "new") {
      setItem({
        id: "",
        name: "",
        enabled: false,
        scheduler: "",
        interval_schedule: "",
        start_datetime: "",
        last_run: "",
        one_off: false,
      });
      setLoading(false);
      return;
    }
    periodicTasksAPI
      .getById(params.id as string)
      .then((data) => setItem(data))
      .catch(() => setError("Failed to load task"))
      .finally(() => setLoading(false));
  }, [params.id]);

  const handleSave = async () => {
    if (!item) return;
    setSaving(true);
    try {
      if (params.id === "new") {
        await periodicTasksAPI.create(item);
      } else {
        await periodicTasksAPI.update(item.id, item);
      }
      router.push("/periodic-tasks/periodic-tasks");
    } catch (e) {
      setError("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => router.push("/periodic-tasks/periodic-tasks");

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
    );
  }

  if (!item) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <ActionButton onClick={handleBack} variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </ActionButton>
          <div>
            <h1 className="text-3xl font-bold">Task not found</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <ActionButton onClick={handleBack} variant="ghost" size="icon">
          <ArrowLeft className="h-4 w-4" />
        </ActionButton>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">
            {params.id === "new" ? "Create Task" : "Edit Task"}
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
          <CardTitle>Periodic Task Details</CardTitle>
          <CardDescription>ID: {item.id || "new"}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={item.name}
              onChange={(e) => setItem({ ...item!, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="enabled">Enabled</Label>
            <Input
              id="enabled"
              value={String(item.enabled)}
              onChange={(e) => setItem({ ...item!, enabled: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="scheduler">Scheduler</Label>
            <Input
              id="scheduler"
              value={item.scheduler}
              onChange={(e) => setItem({ ...item!, scheduler: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="interval_schedule">Interval Schedule</Label>
            <Input
              id="interval_schedule"
              value={item.interval_schedule}
              onChange={(e) =>
                setItem({ ...item!, interval_schedule: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="start_datetime">Start Datetime</Label>
            <Input
              id="start_datetime"
              value={item.start_datetime}
              onChange={(e) =>
                setItem({ ...item!, start_datetime: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last_run">Last Run</Label>
            <Input
              id="last_run"
              value={item.last_run}
              onChange={(e) => setItem({ ...item!, last_run: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="one_off">One Off</Label>
            <Input
              id="one_off"
              value={String(item.one_off)}
              onChange={(e) => setItem({ ...item!, one_off: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
