-- Pixelwise Legal schema
create extension if not exists "pgcrypto";

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  company_id uuid references public.companies(id) on delete set null,
  first_name text,
  last_name text,
  role text not null default 'client' check (role in ('client','admin','attorney')),
  slack_preference boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.engagement_terms_versions (
  id uuid primary key default gen_random_uuid(),
  version_label text not null unique,
  file_path text,
  body_markdown text not null,
  is_active boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.engagement_acceptances (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  company_id uuid references public.companies(id) on delete set null,
  terms_version_id uuid not null references public.engagement_terms_versions(id),
  accepted_at timestamptz not null default now(),
  ip_address text,
  on_behalf_of_entity_name text not null
);

create table if not exists public.matters (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  created_by uuid not null references auth.users(id) on delete cascade,
  matter_type text not null check (matter_type in ('contract_review','contract_drafting','advisory_question')),
  title text not null,
  description text not null,
  counterparty text,
  urgency text not null default 'normal' check (urgency in ('normal','priority','urgent')),
  slack_requested boolean not null default false,
  status text not null default 'Intake Submitted' check (status in ('Intake Submitted','Conflict Check','Attorney Assigned','In Review','Waiting on Client','Delivered','Complete')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.matter_files (
  id uuid primary key default gen_random_uuid(),
  matter_id uuid not null references public.matters(id) on delete cascade,
  uploaded_by uuid references auth.users(id) on delete set null,
  file_name text not null,
  storage_path text not null,
  mime_type text,
  size_bytes bigint,
  file_kind text not null default 'client_upload' check (file_kind in ('client_upload','deliverable')),
  created_at timestamptz not null default now()
);

create table if not exists public.matter_comments (
  id uuid primary key default gen_random_uuid(),
  matter_id uuid not null references public.matters(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete cascade,
  body text not null,
  internal_only boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  matter_id uuid references public.matters(id) on delete set null,
  stripe_checkout_session_id text,
  stripe_payment_intent_id text,
  amount_cents integer not null default 0,
  currency text not null default 'usd',
  status text not null default 'pending' check (status in ('pending','paid','failed')),
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.slack_connections (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  provider text not null default 'slack',
  status text not null default 'not_connected' check (status in ('not_connected','mock_connected','connected')),
  workspace_name text,
  workspace_id text,
  channel_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_notes (
  id uuid primary key default gen_random_uuid(),
  matter_id uuid not null references public.matters(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete cascade,
  note text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.attorney_assignments (
  id uuid primary key default gen_random_uuid(),
  matter_id uuid not null references public.matters(id) on delete cascade,
  attorney_user_id uuid not null references auth.users(id) on delete cascade,
  assigned_at timestamptz not null default now()
);

alter table public.companies enable row level security;
alter table public.profiles enable row level security;
alter table public.engagement_terms_versions enable row level security;
alter table public.engagement_acceptances enable row level security;
alter table public.matters enable row level security;
alter table public.matter_files enable row level security;
alter table public.matter_comments enable row level security;
alter table public.payments enable row level security;
alter table public.slack_connections enable row level security;
alter table public.admin_notes enable row level security;
alter table public.attorney_assignments enable row level security;

create policy "profiles self read" on public.profiles for select using (auth.uid() = user_id);
create policy "profiles self update" on public.profiles for update using (auth.uid() = user_id);
create policy "profiles self insert" on public.profiles for insert with check (auth.uid() = user_id);

create policy "companies by profile" on public.companies for select using (
  exists(select 1 from public.profiles p where p.user_id = auth.uid() and p.company_id = companies.id)
);

create policy "terms readable" on public.engagement_terms_versions for select using (true);

create policy "acceptance self insert" on public.engagement_acceptances for insert with check (auth.uid() = user_id);
create policy "acceptance self read" on public.engagement_acceptances for select using (auth.uid() = user_id);

create policy "matters company read" on public.matters for select using (
  exists(select 1 from public.profiles p where p.user_id = auth.uid() and p.company_id = matters.company_id)
);
create policy "matters company insert" on public.matters for insert with check (
  auth.uid() = created_by and exists(select 1 from public.profiles p where p.user_id = auth.uid() and p.company_id = matters.company_id)
);

create policy "matter files company read" on public.matter_files for select using (
  exists(select 1 from public.matters m join public.profiles p on p.company_id = m.company_id where m.id = matter_files.matter_id and p.user_id = auth.uid())
);
create policy "matter comments company read" on public.matter_comments for select using (
  exists(select 1 from public.matters m join public.profiles p on p.company_id = m.company_id where m.id = matter_comments.matter_id and p.user_id = auth.uid())
);
create policy "payments company read" on public.payments for select using (
  exists(select 1 from public.matters m join public.profiles p on p.company_id = m.company_id where m.id = payments.matter_id and p.user_id = auth.uid())
);

-- admin policies (requires profile role = admin)
create policy "admin full matters" on public.matters for all using (
  exists(select 1 from public.profiles p where p.user_id = auth.uid() and p.role = 'admin')
) with check (
  exists(select 1 from public.profiles p where p.user_id = auth.uid() and p.role = 'admin')
);
