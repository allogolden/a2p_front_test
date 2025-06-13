"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/common/data-table";
import { PageHeader } from "@/components/common/page-header";
import type { SHNPattern } from "@/lib/api/shn-patterns";
import { shnPatternsAPI } from "@/lib/api/shn-patterns";

const columns = [
  { key: "system_id", label: "SYSTEM ID" },
  { key: "short_number", label: "SHORT NUMBER" },
  { key: "category", label: "CATEGORY" },
  { key: "name", label: "NAME" },
  { key: "pattern", label: "PATTERN" },
  { key: "active", label: "ACTIVE", render: (v: boolean) => (v ? "Yes" : "No") },
  { key: "ip_address", label: "IP ADDRESS" },
  { key: "description", label: "DESCRIPTION" },
  { key: "created", label: "CREATED", render: (v: string) => new Date(v).toLocaleString() },
  { key: "modified", label: "MODIFIED", render: (v: string) => new Date(v).toLocaleString() },
  { key: "created_by", label: "CREATED BY" },
  { key: "updated_by", label: "UPDATED BY" },
];

const filters = {
  category: ["Service", "Transaction", "Marketing", "eGov"],
  active: ["Yes", "No"],
  short_number: ["3700", "1234", "5678", "9999"],
};

export default function SHNPatternsPage() {
  const router = useRouter();
  const [data, setData] = useState<SHNPattern[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    shnPatternsAPI
      .list()
      .then((list) => setData(list))
      .catch(() => setError("Failed to load patterns"))
      .finally(() => setLoading(false));
  }, []);

  const handleRowClick = (item: SHNPattern) => {
    router.push(`/shn-patterns/${item.id}`);
  };

  const handleAdd = () => {
    router.push("/shn-patterns/new");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="SHN Patterns"
        description="Short Header Number patterns"
        action={{ label: "Add SHN Pattern", onClick: handleAdd, icon: Plus }}
      />

      <DataTable
        columns={columns}
        data={data}
        isLoading={loading}
        onRowClick={handleRowClick}
        searchPlaceholder="Search SHN patterns..."
        filters={filters}
      />
      {error && <div className="text-red-600">{error}</div>}
    </div>
  );
}

