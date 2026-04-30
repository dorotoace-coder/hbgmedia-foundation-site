import { get, list, put } from "@vercel/blob";

export type IntakeTable =
  | "prayer_requests"
  | "first_timers"
  | "sermons"
  | "clt_drafts"
  | "media_tasks"
  | "weekly_reports"
  | "render_jobs";

export type IntakeRecord = Record<string, unknown> & {
  id: string;
  intake_id: string;
  created_at: string;
  table: IntakeTable;
  inbox_path: string;
  source: "hbg_inbox";
  status: string;
};

export const intakeTables = [
  "prayer_requests",
  "first_timers",
  "sermons",
  "clt_drafts",
  "media_tasks",
  "weekly_reports",
  "render_jobs"
] as const satisfies readonly IntakeTable[];

const intakePrefixes: Record<IntakeTable, string> = {
  prayer_requests: "HBG-PRAYER",
  first_timers: "HBG-FIRST",
  sermons: "HBG-SERMON",
  clt_drafts: "HBG-CLT",
  media_tasks: "HBG-MEDIA",
  weekly_reports: "HBG-REPORT",
  render_jobs: "HBG-VIDEO"
};

export function isInboxConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

export function createIntakeId(table: IntakeTable) {
  const year = new Date().getFullYear();
  const token = crypto.randomUUID().split("-")[0].toUpperCase();
  return `${intakePrefixes[table]}-${year}-${token}`;
}

export async function saveInboxRecord(table: IntakeTable, payload: Record<string, unknown>) {
  if (!isInboxConfigured()) {
    return {
      ok: false as const,
      message:
        "HBG Intake Inbox storage is not connected yet. Add a Vercel Blob store to this project so the site can save shared inbox records."
    };
  }

  const now = new Date().toISOString();
  const intakeId = createIntakeId(table);
  const recordId = crypto.randomUUID();
  const dateFolder = now.slice(0, 10);
  const inboxPath = `hbg-intake/${table}/${dateFolder}/${intakeId}.json`;
  const record: IntakeRecord = {
    id: recordId,
    intake_id: intakeId,
    created_at: now,
    table,
    inbox_path: inboxPath,
    source: "hbg_inbox",
    status: "new",
    ...payload
  };

  await put(inboxPath, JSON.stringify(record, null, 2), {
    access: "private",
    allowOverwrite: false,
    contentType: "application/json",
    cacheControlMaxAge: 60
  });

  return {
    ok: true as const,
    record
  };
}

async function readInboxRecord(pathname: string) {
  const blob = await get(pathname, {
    access: "private",
    useCache: false
  });

  if (!blob || blob.statusCode !== 200) {
    return null;
  }

  return (await new Response(blob.stream).json()) as IntakeRecord;
}

export async function loadInboxRecords(table: IntakeTable, limit = 25) {
  if (!isInboxConfigured()) {
    return {
      ok: false as const,
      message:
        "HBG Intake Inbox storage is not connected yet. Add Vercel Blob to view shared inbox records.",
      records: []
    };
  }

  const { blobs } = await list({
    prefix: `hbg-intake/${table}/`,
    limit
  });

  const records = (
    await Promise.all(blobs.map((blob) => readInboxRecord(blob.pathname).catch(() => null)))
  )
    .filter((record): record is IntakeRecord => Boolean(record))
    .sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)))
    .slice(0, limit);

  return {
    ok: true as const,
    message: `${records.length} HBG Inbox records loaded for ${table}.`,
    records
  };
}
