import { createClient } from "@supabase/supabase-js";
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set.");
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false }
});

const { data: job, error } = await supabase
  .from("render_jobs")
  .select("*")
  .eq("status", "queued")
  .order("created_at", { ascending: true })
  .limit(1)
  .maybeSingle();

if (error) {
  throw new Error(error.message);
}

if (!job) {
  console.log("No queued render jobs.");
  process.exit(0);
}

await supabase.from("render_jobs").update({ status: "rendering" }).eq("id", job.id);

const safeTitle = String(job.title ?? "hbg-render")
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)/g, "")
  .slice(0, 60);
const briefPath = path.join(root, "renders", `${job.id}.json`);
const outputPath = path.join(root, "renders", `${safeTitle || job.id}.mp4`);

fs.mkdirSync(path.dirname(briefPath), { recursive: true });
fs.writeFileSync(briefPath, JSON.stringify(job.input_props, null, 2));

console.log(`Rendering queued job ${job.id}: ${job.title}`);

const child = spawn(
  process.execPath,
  [path.join(root, "scripts", "render-sermon-quote.mjs"), briefPath, outputPath],
  {
    cwd: root,
    stdio: "inherit",
    env: process.env
  }
);

const code = await new Promise((resolve) => {
  child.on("close", resolve);
});

if (code !== 0) {
  await supabase
    .from("render_jobs")
    .update({ status: "failed", notes: `Render failed with exit code ${code}` })
    .eq("id", job.id);
  process.exit(Number(code));
}

await supabase
  .from("render_jobs")
  .update({ status: "complete", output_path: outputPath })
  .eq("id", job.id);

console.log(`Render complete: ${outputPath}`);
