"use client";

import { useActionState, useMemo, useState } from "react";
import { loadAdminData, type AdminDataResult, type AdminDataset } from "@/app/actions";

const sections: Array<{
  key: keyof AdminDataset;
  label: string;
  fields: string[];
}> = [
  {
    key: "prayer_requests",
    label: "Prayer Requests",
    fields: ["intake_id", "created_at", "name", "phone", "category", "request", "confidential", "status"]
  },
  {
    key: "first_timers",
    label: "First-Timers",
    fields: ["intake_id", "created_at", "name", "phone", "area", "visit_type", "prayer_need", "status"]
  },
  {
    key: "sermons",
    label: "Sermons",
    fields: ["intake_id", "created_at", "sermon_date", "title", "scripture", "speaker", "status"]
  },
  {
    key: "clt_drafts",
    label: "CLT Drafts",
    fields: ["intake_id", "created_at", "devotional_date", "title", "scripture", "key_word", "status"]
  },
  {
    key: "media_tasks",
    label: "Media Tasks",
    fields: ["intake_id", "created_at", "title", "content_type", "platform", "assigned_to", "due_date", "status"]
  },
  {
    key: "weekly_reports",
    label: "Weekly Reports",
    fields: ["intake_id", "created_at", "week_start", "attendance", "first_timers", "souls_won", "prayer_requests", "sermon_clips"]
  },
  {
    key: "render_jobs",
    label: "Render Jobs",
    fields: ["intake_id", "created_at", "template", "title", "requested_by", "status", "output_path"]
  }
];

function displayValue(value: unknown) {
  if (value === null || value === undefined || value === "") return "-";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "string" && value.includes("T") && value.endsWith("Z")) {
    return new Date(value).toLocaleString();
  }
  return String(value);
}

export default function AdminDataViewer() {
  const [state, formAction, isPending] = useActionState<AdminDataResult | null, FormData>(loadAdminData, null);
  const [active, setActive] = useState<keyof AdminDataset>("prayer_requests");
  const activeSection = useMemo(() => sections.find((section) => section.key === active) ?? sections[0], [active]);
  const rows = state?.ok ? state.data[active] : [];

  function getVisibleRowsText() {
    const header = activeSection.fields.map((field) => field.replaceAll("_", " ")).join("\t");
    const body = rows
      .map((row) => activeSection.fields.map((field) => displayValue(row[field])).join("\t"))
      .join("\n");

    return [header, body].filter(Boolean).join("\n");
  }

  function copyVisibleRows() {
    void navigator.clipboard.writeText(getVisibleRowsText());
  }

  function downloadCsv() {
    const csv = [
      activeSection.fields.map((field) => `"${field.replaceAll("_", " ")}"`).join(","),
      ...rows.map((row) =>
        activeSection.fields
          .map((field) => `"${displayValue(row[field]).replaceAll('"', '""')}"`)
          .join(",")
      )
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `hbg-${active}-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <section className="command-panel" style={{ marginTop: 0 }}>
        <h2>Admin Access</h2>
        <p>Enter the admin passcode to load ministry intake data without opening Supabase.</p>
        <form action={formAction} className="form-grid">
          <div className="field">
            <label>Admin Passcode</label>
            <input name="passcode" type="password" placeholder="Enter passcode" required />
          </div>
          <div className="form-actions">
            <button className="btn btn-primary" type="submit" disabled={isPending}>
              {isPending ? "Loading..." : "Load Data"}
            </button>
            {state ? (
              <p className={state.ok ? "form-message success" : "form-message error"}>
                {state.message}
              </p>
            ) : null}
          </div>
        </form>
      </section>

      {state?.ok ? (
        <section className="command-panel">
          <div className="admin-tabs" role="tablist" aria-label="Admin data sections">
            {sections.map((section) => (
              <button
                className={active === section.key ? "admin-tab active" : "admin-tab"}
                key={section.key}
                type="button"
                onClick={() => setActive(section.key)}
              >
                {section.label}
                <span>{state.data[section.key].length}</span>
              </button>
            ))}
          </div>
          <div className="admin-actions">
            <button className="btn btn-secondary" type="button" onClick={copyVisibleRows} disabled={!rows.length}>
              Copy
            </button>
            <button className="btn btn-secondary" type="button" onClick={downloadCsv} disabled={!rows.length}>
              Export CSV
            </button>
            <button className="btn btn-secondary" type="button" onClick={() => window.print()} disabled={!rows.length}>
              Print
            </button>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  {activeSection.fields.map((field) => (
                    <th key={field}>{field.replaceAll("_", " ")}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.length ? (
                  rows.map((row, index) => (
                    <tr key={String(row.id ?? index)}>
                      {activeSection.fields.map((field) => (
                        <td key={field}>{displayValue(row[field])}</td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={activeSection.fields.length}>No records yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}
    </>
  );
}
