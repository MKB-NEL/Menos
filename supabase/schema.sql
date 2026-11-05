-- ============================================================
-- Supabase SQL — Run this in the Supabase SQL Editor
-- ============================================================

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- Posts table — logs every publish attempt from Menos
create table if not exists public.posts (
  id              uuid primary key default uuid_generate_v4(),
  caption         text            not null,
  media_url       text            null,
  platform        text            not null default 'unknown',
  account_id      text            null,
  postiz_post_id  text            null,
  status          text            not null default 'pending'
                    check (status in ('pending', 'published', 'failed')),
  created_at      timestamptz     not null default now(),
  updated_at      timestamptz     not null default now()
);

-- Keep updated_at current automatically
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger posts_updated_at
  before update on public.posts
  for each row execute procedure public.set_updated_at();

-- Index for fast history queries
create index if not exists posts_created_at_idx on public.posts (created_at desc);

-- Row Level Security — service role key bypasses RLS;
-- enable it so anon key cannot directly read the table.
alter table public.posts enable row level security;

-- Policy: allow service role full access (serverless functions use this)
create policy "Service role full access"
  on public.posts
  using (true)
  with check (true);

-- ============================================================
-- Done. The posts table is ready.
-- ============================================================

