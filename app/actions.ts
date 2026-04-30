"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { intakeTables, loadInboxRecords, saveInboxRecord, type IntakeTable } from "@/lib/intake/storage";

type ActionResult = {
  ok: boolean;
  message: string;
};

export type AdminDataset = {
  prayer_requests: Record<string, unknown>[];
  first_timers: Record<string, unknown>[];
  sermons: Record<string, unknown>[];
  clt_drafts: Record<string, unknown>[];
  media_tasks: Record<string, unknown>[];
  weekly_reports: Record<string, unknown>[];
  render_jobs: Record<string, unknown>[];
};

export type AdminDataResult =
  | {
      ok: true;
      message: string;
      data: AdminDataset;
    }
  | {
      ok: false;
      message: string;
      data: null;
    };

export type AccessResult = {
  ok: boolean;
  message: string;
};

function value(formData: FormData, key: string) {
  const entry = formData.get(key);
  return typeof entry === "string" ? entry.trim() : "";
}

function boolValue(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function isAdminPasscodeValid(passcode: string) {
  const configured = process.env.ADMIN_PASSCODE?.trim();
  return Boolean(configured && passcode && configured === passcode);
}

function decodeBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  return Buffer.from(padded, "base64").toString("utf8");
}

function getSupabaseUrlDiagnostic() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();

  if (!url) {
    return "NEXT_PUBLIC_SUPABASE_URL is missing.";
  }

  try {
    const host = new URL(url).host;
    const projectRef = host.endsWith(".supabase.co") ? host.split(".")[0] : "unknown";

    return `NEXT_PUBLIC_SUPABASE_URL host: ${host}, project ref: ${projectRef}.`;
  } catch {
    return "NEXT_PUBLIC_SUPABASE_URL is present, but it is not a valid URL.";
  }
}

function getJwtKeyDiagnostic(name: string, key: string | undefined) {
  const trimmedKey = key?.trim();

  if (!trimmedKey) {
    return `${name} is missing.`;
  }

  if (trimmedKey.startsWith("sb_secret_")) {
    return `${name} is a Supabase secret key.`;
  }

  const parts = trimmedKey.split(".");

  if (parts.length !== 3) {
    return `${name} is present, but it is not a JWT-style legacy key.`;
  }

  try {
    const payload = JSON.parse(decodeBase64Url(parts[1])) as { role?: string; ref?: string };
    const role = payload.role ?? "unknown";
    const ref = payload.ref ? `, project ref: ${payload.ref}` : "";

    return `${name} decoded role: ${role}${ref}.`;
  } catch {
    return `${name} is present, but its JWT payload could not be decoded.`;
  }
}

function getPublicSupabaseDiagnostic() {
  return `${getSupabaseUrlDiagnostic()} ${getJwtKeyDiagnostic(
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )}`;
}

function getSupabaseKeyDiagnostic() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!key) {
    return "SUPABASE_SERVICE_ROLE_KEY is missing.";
  }

  if (key.startsWith("sb_secret_")) {
    return "SUPABASE_SERVICE_ROLE_KEY is a Supabase secret key.";
  }

  return getJwtKeyDiagnostic("SUPABASE_SERVICE_ROLE_KEY", key);
}

function getSupabaseRestConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !serviceRoleKey) {
    return null;
  }

  try {
    return {
      restUrl: new URL(`/rest/v1/`, url).toString(),
      serviceRoleKey
    };
  } catch {
    return null;
  }
}

export async function verifyInternalAccess(_: AccessResult | null, formData: FormData): Promise<AccessResult> {
  const passcode = value(formData, "passcode");

  if (!isAdminPasscodeValid(passcode)) {
    return {
      ok: false,
      message: "Invalid passcode."
    };
  }

  return {
    ok: true,
    message: "Access granted."
  };
}

async function insertRecord(table: string, payload: Record<string, unknown>): Promise<ActionResult> {
  try {
    const inboxResult = await saveInboxRecord(table as IntakeTable, payload);

    if (!inboxResult.ok) {
      return {
        ok: false,
        message: inboxResult.message
      };
    }

    return {
      ok: true,
      message: `Captured in HBG Intake Inbox. Intake ID: ${inboxResult.record.intake_id}. Admin can view, copy, print, or export it from the intake dashboard.`
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "The HBG Intake Inbox could not save this record."
    };
  }
}

async function insertSupabaseRecord(table: string, payload: Record<string, unknown>): Promise<ActionResult> {
  try {
    const supabaseRest = getSupabaseRestConfig();
    const recordId = crypto.randomUUID();

    if (!supabaseRest) {
      return {
        ok: false,
        message: `Supabase server intake is not configured correctly yet. ${getSupabaseKeyDiagnostic()} ${getPublicSupabaseDiagnostic()}`
      };
    }

    const response = await fetch(`${supabaseRest.restUrl}${table}?select=id`, {
      method: "POST",
      headers: {
        apikey: supabaseRest.serviceRoleKey,
        Authorization: `Bearer ${supabaseRest.serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=representation"
      },
      body: JSON.stringify({
        id: recordId,
        ...payload
      }),
      cache: "no-store"
    });

    const responseText = await response.text();

    if (!response.ok) {
      return {
        ok: false,
        message: `Supabase REST insert failed with ${response.status}: ${responseText || response.statusText}. ${getSupabaseKeyDiagnostic()} ${getPublicSupabaseDiagnostic()}`
      };
    }

    let savedRecords: { id?: string }[];
    try {
      savedRecords = JSON.parse(responseText) as { id?: string }[];
    } catch {
      return {
        ok: false,
        message: `Supabase returned a non-JSON insert response: ${responseText || "empty response"}. Expected ID: ${recordId}. ${getSupabaseKeyDiagnostic()} ${getPublicSupabaseDiagnostic()}`
      };
    }

    const savedRecord = savedRecords.find((record) => record.id === recordId);

    if (!savedRecord?.id) {
      return {
        ok: false,
        message: `Supabase REST accepted the request but did not return the saved ID. Expected ID: ${recordId}. Response: ${responseText || "empty response"}. ${getSupabaseKeyDiagnostic()} ${getPublicSupabaseDiagnostic()}`
      };
    }

    return {
      ok: true,
      message: `Saved in Supabase. Table: ${table}. Record ID: ${savedRecord.id}.`
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "The form could not be saved. Please try again."
    };
  }
}

export async function submitPrayerRequest(_: ActionResult | null, formData: FormData) {
  const name = value(formData, "name");
  const request = value(formData, "request");

  if (!name || !request) {
    return { ok: false, message: "Name and prayer request are required." };
  }

  return insertRecord("prayer_requests", {
    name,
    phone: value(formData, "phone"),
    email: value(formData, "email"),
    location: value(formData, "location"),
    category: value(formData, "category") || "General",
    request,
    confidential: boolValue(formData, "confidential"),
    can_contact: boolValue(formData, "can_contact")
  });
}

export async function submitFirstTimer(_: ActionResult | null, formData: FormData) {
  const name = value(formData, "name");

  if (!name) {
    return { ok: false, message: "Name is required." };
  }

  return insertRecord("first_timers", {
    name,
    phone: value(formData, "phone"),
    email: value(formData, "email"),
    area: value(formData, "area"),
    invited_by: value(formData, "invited_by"),
    prayer_need: value(formData, "prayer_need"),
    visit_type: value(formData, "visit_type") || "first_time"
  });
}

export async function submitSermon(_: ActionResult | null, formData: FormData) {
  const title = value(formData, "title");

  if (!title) {
    return { ok: false, message: "Sermon title is required." };
  }

  return insertRecord("sermons", {
    sermon_date: value(formData, "sermon_date") || null,
    title,
    scripture: value(formData, "scripture"),
    speaker: value(formData, "speaker") || "Pastor Amos Unogwu",
    main_message: value(formData, "main_message"),
    key_quotes: value(formData, "key_quotes"),
    call_to_action: value(formData, "call_to_action"),
    media_url: value(formData, "media_url")
  });
}

export async function submitCltDraft(_: ActionResult | null, formData: FormData) {
  const title = value(formData, "title");

  if (!title) {
    return { ok: false, message: "CLT title is required." };
  }

  return insertRecord("clt_drafts", {
    devotional_date: value(formData, "devotional_date") || null,
    title,
    scripture: value(formData, "scripture"),
    key_word: value(formData, "key_word"),
    word_focus: value(formData, "word_focus"),
    message: value(formData, "message"),
    prayer: value(formData, "prayer"),
    action_point: value(formData, "action_point"),
    quiz_questions: value(formData, "quiz_questions")
  });
}

export async function submitMediaTask(_: ActionResult | null, formData: FormData) {
  const title = value(formData, "title");

  if (!title) {
    return { ok: false, message: "Task title is required." };
  }

  return insertRecord("media_tasks", {
    title,
    content_type: value(formData, "content_type") || "Sermon Clip",
    platform: value(formData, "platform") || "WhatsApp",
    assigned_to: value(formData, "assigned_to"),
    due_date: value(formData, "due_date") || null,
    notes: value(formData, "notes")
  });
}

export async function queueRenderJob(_: ActionResult | null, formData: FormData) {
  const title = value(formData, "title");
  const inputPropsRaw = value(formData, "input_props");

  if (!title || !inputPropsRaw) {
    return { ok: false, message: "Title and render data are required." };
  }

  try {
    const inputProps = JSON.parse(inputPropsRaw) as Record<string, unknown>;

    return insertRecord("render_jobs", {
      template: value(formData, "template") || "SermonQuoteReel",
      title,
      requested_by: value(formData, "requested_by"),
      input_props: inputProps,
      notes: value(formData, "notes")
    });
  } catch {
    return { ok: false, message: "Render data must be valid JSON." };
  }
}

export async function submitWeeklyReport(_: ActionResult | null, formData: FormData) {
  const weekStart = value(formData, "week_start");

  if (!weekStart) {
    return { ok: false, message: "Week start date is required." };
  }

  return insertRecord("weekly_reports", {
    week_start: weekStart,
    attendance: Number(value(formData, "attendance") || 0),
    first_timers: Number(value(formData, "first_timers") || 0),
    souls_won: Number(value(formData, "souls_won") || 0),
    prayer_requests: Number(value(formData, "prayer_requests") || 0),
    followups_completed: Number(value(formData, "followups_completed") || 0),
    clt_posts: Number(value(formData, "clt_posts") || 0),
    sermon_clips: Number(value(formData, "sermon_clips") || 0),
    notes: value(formData, "notes")
  });
}

export async function loadAdminData(_: AdminDataResult | null, formData: FormData): Promise<AdminDataResult> {
  const passcode = value(formData, "passcode");

  if (!isAdminPasscodeValid(passcode)) {
    return {
      ok: false,
      message: "Invalid admin passcode or ADMIN_PASSCODE is not configured in Vercel.",
      data: null
    };
  }

  try {
    const inboxResults = await Promise.all(
      intakeTables.map(async (table) => {
        const result = await loadInboxRecords(table);

        if (!result.ok) {
          throw new Error(result.message);
        }

        return [table, result.records] as const;
      })
    );

    const totalRows = inboxResults.reduce((total, [, rows]) => total + rows.length, 0);

    return {
      ok: true,
      message: `HBG Intake Inbox loaded. ${totalRows} records found across all sections.`,
      data: Object.fromEntries(inboxResults) as unknown as AdminDataset
    };
  } catch (inboxError) {
    const supabase = createServerSupabase();

    if (!supabase) {
      return {
        ok: false,
        message:
          inboxError instanceof Error
            ? `${inboxError.message} Supabase fallback is also not configured. ${getSupabaseKeyDiagnostic()}`
            : `HBG Intake Inbox could not load. Supabase fallback is also not configured. ${getSupabaseKeyDiagnostic()}`,
        data: null
      };
    }

    try {
      const tables = intakeTables;

      const results = await Promise.all(
        tables.map(async (table) => {
          const { data, error } = await supabase
            .from(table)
            .select("*")
            .order("created_at", { ascending: false })
            .limit(25);

          if (error) {
            throw new Error(`${table}: ${error.message}`);
          }

          return [table, data ?? []] as const;
        })
      );

      const totalRows = results.reduce((total, [, rows]) => total + rows.length, 0);

      return {
        ok: true,
        message: `Supabase fallback loaded. ${totalRows} records found across all sections. HBG Inbox note: ${
          inboxError instanceof Error ? inboxError.message : "Inbox unavailable."
        } ${getSupabaseKeyDiagnostic()}`,
        data: Object.fromEntries(results) as AdminDataset
      };
    } catch (error) {
      return {
        ok: false,
        message: error instanceof Error ? error.message : "Could not load admin data.",
        data: null
      };
    }
  }
}
