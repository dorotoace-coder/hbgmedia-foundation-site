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
    fields: ["created_at", "name", "phone", "category", "request", "confidential", "status"]
  },
  {
    key: "first_timers",
    label: "First-Timers",
    fields: ["created_at", "name", "phone", "area", "visit_type", "prayer_need", "status"]
  },
  {
    key: "sermons",
    label: "Sermons",
    fields: ["created_at", "sermon_date", "title", "scripture", "speaker", "status"]
  },
  {
    key: "clt_drafts",
    label: "CLT Drafts",
    fields: ["created_at", "devotional_date", "title", "scripture", "key_word", "status"]
  },
  {
    key: "media_tasks",
    label: "Media Tasks",
    fields: ["created_at", "title", "content_type", "platform", "assigned_to", "due_date", "status"]
  },
  {
    key: "weekly_reports",
    label: "Weekly Reports",
    fields: ["created_at", "week_start", "attendance", "first_timers", "souls_won", "prayer_requests", "sermon_clips"]
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
