"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/common/data-table";
import { PageHeader } from "@/components/common/page-header";
import type { PeriodicTask } from "@/lib/api/periodic-tesks";
import { periodicTasksAPI } from "@/lib/api/periodic-tesks";

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "NAME" },
  {
    key: "enabled",
    label: "ENABLED",
    render: (v: boolean) => (v ? "Yes" : "No"),
  },
  { key: "scheduler", label: "SCHEDULER" },
  { key: "interval_schedule", label: "INTERVAL SCHEDULE" },
  {
    key: "start_datetime",
    label: "START DATETIME",
    render: (v: string) => (v ? new Date(v).toLocaleString() : "-"),
  },
  {
    key: "last_run",
    label: "LAST RUN DATETIME",
    render: (v: string) => (v ? new Date(v).toLocaleString() : "-"),
  },
  {
    key: "one_off",
    label: "ONE-OFF TASK",
    render: (v: boolean) => (v ? "Yes" : "No"),
  },
];

const filters = {
  enabled: ["Yes", "No"],
  scheduler: ["Cron", "Interval", "Clocked"], // если хочешь фильтровать по типу расписания
};

export default function PeriodicTasksPage() {
  const router = useRouter();
  const [data, setData] = useState<PeriodicTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    periodicTasksAPI
      .list()
      .then((list) => setData(list))
      .catch(() => setError("Failed to load tasks"))
      .finally(() => setLoading(false));
  }, []);

  const handleRowClick = (item: any) => {
    router.push(`/periodic-tasks/periodic-tasks/${item.id}`);
  };

  const handleAdd = () => {
    router.push("/periodic-tasks/periodic-tasks/new");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Periodic Tasks"
        description="Scheduled and recurring tasks"
        action={{
          label: "Add Task",
          onClick: handleAdd,
          icon: Plus,
        }}
      />

      <DataTable
        columns={columns}
        data={data}
        isLoading={loading}
        onRowClick={handleRowClick}
        searchPlaceholder="Search tasks..."
        filters={filters}
      />
      {error && <div className="text-red-600">{error}</div>}
    </div>
  );
}
