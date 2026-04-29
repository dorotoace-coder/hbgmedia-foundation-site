-- HBG Media Command Center - Phase 2 Supabase schema
-- Run this in Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.prayer_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text,
  email text,
  location text,
  category text not null default 'General',
  request text not null,
  confidential boolean not null default false,
  can_contact boolean not null default true,
  status text not null default 'new'
);

create table if not exists public.first_timers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text,
  email text,
  area text,
  invited_by text,
  prayer_need text,
  visit_type text not null default 'first_time',
  follow_up_owner text,
  status text not null default 'new'
);

create table if not exists public.sermons (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  sermon_date date,
  title text not null,
  scripture text,
  speaker text not null default 'Pastor Amos Unogwu',
  main_message text,
  key_quotes text,
  call_to_action text,
  media_url text,
  status text not null default 'intake'
);

create table if not exists public.clt_drafts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  devotional_date date,
  title text not null,
  scripture text,
  key_word text,
  word_focus text,
  message text,
  prayer text,
  action_point text,
  quiz_questions text,
  status text not null default 'draft'
);

create table if not exists public.media_tasks (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  content_type text not null,
  platform text not null,
  assigned_to text,
  due_date date,
  status text not null default 'todo',
  notes text
);

create table if not exists public.weekly_reports (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  week_start date not null,
  attendance integer default 0,
  first_timers integer default 0,
  souls_won integer default 0,
  prayer_requests integer default 0,
  followups_completed integer default 0,
  clt_posts integer default 0,
  sermon_clips integer default 0,
  notes text
);

create table if not exists public.render_jobs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  template text not null default 'SermonQuoteReel',
  title text not null,
  requested_by text,
  input_props jsonb not null,
  output_path text,
  status text not null default 'queued',
  notes text
);

alter table public.prayer_requests enable row level security;
alter table public.first_timers enable row level security;
alter table public.sermons enable row level security;
alter table public.clt_drafts enable row level security;
alter table public.media_tasks enable row level security;
alter table public.weekly_reports enable row level security;
alter table public.render_jobs enable row level security;

-- Public inserts are allowed for website intake forms.
create policy "Public can submit prayer requests"
on public.prayer_requests for insert
to anon
with check (true);

create policy "Public can submit first timer forms"
on public.first_timers for insert
to anon
with check (true);

-- Dashboard reads/writes should go through server actions using SUPABASE_SERVICE_ROLE_KEY.
-- When auth is added, replace service-role dashboard access with authenticated user policies.
