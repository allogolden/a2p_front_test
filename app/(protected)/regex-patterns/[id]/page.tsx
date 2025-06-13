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
import type { RegexPattern } from "@/lib/api/regex-patterns";
import { regexPatternsAPI } from "@/lib/api/regex-patterns";

export default function RegexPatternDetailPage() {
  const router = useRouter();
  const params = useParams();

  const [item, setItem] = useState<RegexPattern | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id === "new") {
      setItem({
        id: "",
        variable: "",
        pattern: "",
        active: false,
        description: "",
        ip_address: "",
        created: "",
        modified: "",
        created_by: "",
        updated_by: "",
      });
      setLoading(false);
      return;
    }
    regexPatternsAPI
      .getById(params.id as string)
      .then((data) => setItem(data))
      .catch(() => setError("Failed to load pattern"))
      .finally(() => setLoading(false));
  }, [params.id]);

  const handleSave = async () => {
    if (!item) return;
    setSaving(true);
    try {
      if (params.id === "new") {
        await regexPatternsAPI.create(item);
      } else {
        await regexPatternsAPI.update(item.id, item);
      }
      router.push("/regex-patterns");
    } catch (e) {
      setError("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => router.push("/regex-patterns");

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
            <h1 className="text-3xl font-bold">Pattern not found</h1>
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
            {params.id === "new" ? "Create Pattern" : "Edit Pattern"}
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
          <CardTitle>Regex Pattern Details</CardTitle>
          <CardDescription>ID: {item.id || "new"}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="variable">Variable</Label>
            <Input
              id="variable"
              value={item.variable}
              onChange={(e) => setItem({ ...item!, variable: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pattern">Pattern</Label>
            <Input
              id="pattern"
              value={item.pattern}
              onChange={(e) => setItem({ ...item!, pattern: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="active">Active</Label>
            <Input
              id="active"
              value={String(item.active)}
              onChange={(e) => setItem({ ...item!, active: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={item.description}
              onChange={(e) =>
                setItem({ ...item!, description: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ip_address">IP Address</Label>
            <Input
              id="ip_address"
              value={item.ip_address}
              onChange={(e) =>
                setItem({ ...item!, ip_address: e.target.value })
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
