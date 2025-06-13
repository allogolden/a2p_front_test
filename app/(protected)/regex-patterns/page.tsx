"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/common/data-table";
import { PageHeader } from "@/components/common/page-header";
import type { RegexPattern } from "@/lib/api/regex-patterns";
import { regexPatternsAPI } from "@/lib/api/regex-patterns";

const columns = [
  { key: "variable", label: "VARIABLE" },
  { key: "pattern", label: "PATTERN" },
  {
    key: "active",
    label: "ACTIVE",
    render: (v: boolean) => (v ? "Yes" : "No"),
  },
  { key: "description", label: "DESCRIPTION" },
  { key: "ip_address", label: "IP ADDRESS" },
  {
    key: "created",
    label: "CREATED",
    render: (v: string) => new Date(v).toLocaleString(),
  },
  {
    key: "modified",
    label: "MODIFIED",
    render: (v: string) => new Date(v).toLocaleString(),
  },
  { key: "created_by", label: "CREATED BY" },
  { key: "updated_by", label: "UPDATED BY" },
];

const filters = {
  active: ["Yes", "No"],
};

export default function RegexPatternsPage() {
  const router = useRouter();
  const [data, setData] = useState<RegexPattern[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    regexPatternsAPI
      .list()
      .then((list) => setData(list))
      .catch(() => setError("Failed to load patterns"))
      .finally(() => setLoading(false));
  }, []);

  const handleRowClick = (item: any) => {
    router.push(`/regex-patterns/${item.id}`);
  };

  const handleAdd = () => {
    router.push("/regex-patterns/new");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Regex Patterns"
        description="Regular expression patterns for validation"
        action={{
          label: "Add Pattern",
          onClick: handleAdd,
          icon: Plus,
        }}
      />

      <DataTable
        columns={columns}
        data={data}
        isLoading={loading}
        onRowClick={handleRowClick}
        searchPlaceholder="Search regex patterns..."
        filters={filters}
      />
      {error && <div className="text-red-600">{error}</div>}
    </div>
  );
}
