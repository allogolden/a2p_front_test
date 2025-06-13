"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/common/data-table";
import { PageHeader } from "@/components/common/page-header";
import type { ShortNumber } from "@/lib/api/short-numbers";
import { shortNumbersAPI } from "@/lib/api/short-numbers";

const columns = [
  { key: "system_id", label: "SYSTEM ID" },
  { key: "ctn", label: "CTN" },
  { key: "short_number", label: "SHORT NUMBER" },
  { key: "active", label: "ACTIVE", render: (v: boolean) => (v ? "Yes" : "No") },
  { key: "bind_mode", label: "BIND MODE" },
  { key: "alias", label: "ALIAS" },
  { key: "ip_address", label: "IP ADDRESS" },
  { key: "description", label: "DESCRIPTION" },
  { key: "created", label: "CREATED", render: (v: string) => new Date(v).toLocaleString() },
  { key: "modified", label: "MODIFIED", render: (v: string) => new Date(v).toLocaleString() },
  { key: "created_by", label: "CREATED BY" },
  { key: "updated_by", label: "UPDATED BY" },
];

const filters = {
  active: ["Yes", "No"],
  bind_mode: ["Allow both A2P/P2A"],
  short_number: ["5300", "1500", "1071"],
};

export default function ShortNumbersPage() {
  const router = useRouter();
  const [data, setData] = useState<ShortNumber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    shortNumbersAPI
      .list()
      .then((list) => setData(list))
      .catch(() => setError("Failed to load short numbers"))
      .finally(() => setLoading(false));
  }, []);

  const handleRowClick = (item: ShortNumber) => {
    router.push(`/short-numbers/${item.id}`);
  };

  const handleAdd = () => {
    router.push("/short-numbers/new");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Short Numbers"
        description="Manage short code numbers"
        action={{ label: "Add Short Number", onClick: handleAdd, icon: Plus }}
      />

      <DataTable
        columns={columns}
        data={data}
        isLoading={loading}
        onRowClick={handleRowClick}
        searchPlaceholder="Search short numbers..."
        filters={filters}
      />
      {error && <div className="text-red-600">{error}</div>}
    </div>
  );
}

