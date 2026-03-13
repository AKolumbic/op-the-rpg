-- ============================================================================
-- Migration 001: Profiles, Campaigns, and Role-Based Permissions
-- Tables first, then triggers, then security-definer helpers, then RLS policies
-- ============================================================================

-- Helper: updated_at trigger function
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ═══ TABLES ═════════════════════════════════════════════════════════════════

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.campaigns (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  invite_code text unique not null default encode(gen_random_bytes(6), 'hex'),
  created_by uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.campaign_members (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.campaigns(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null check (role in ('gm', 'player')) default 'player',
  joined_at timestamptz not null default now(),
  unique (campaign_id, user_id)
);

create table public.campaign_characters (
  campaign_id uuid not null references public.campaigns(id) on delete cascade,
  character_id uuid not null references public.characters(id) on delete cascade,
  primary key (campaign_id, character_id)
);

-- ═══ TRIGGERS ═══════════════════════════════════════════════════════════════

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at();

create trigger campaigns_updated_at
  before update on public.campaigns
  for each row execute function public.update_updated_at();

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Auto-add campaign creator as GM
create or replace function public.auto_add_campaign_creator()
returns trigger as $$
begin
  insert into public.campaign_members (campaign_id, user_id, role)
  values (new.id, new.created_by, 'gm');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_campaign_created
  after insert on public.campaigns
  for each row execute function public.auto_add_campaign_creator();

-- ═══ BACKFILL ═══════════════════════════════════════════════════════════════

insert into public.profiles (id, display_name)
select id, split_part(email, '@', 1)
from auth.users
where id not in (select id from public.profiles)
on conflict do nothing;

-- ═══ SECURITY DEFINER HELPERS ══════════════════════════════════════════════
-- These functions bypass RLS to prevent infinite recursion in policies that
-- need to check membership/admin status on tables protected by RLS.

create or replace function public.get_user_campaign_ids(uid uuid)
returns setof uuid as $$
  select campaign_id from public.campaign_members where user_id = uid;
$$ language sql security definer stable;

create or replace function public.is_campaign_gm(cid uuid, uid uuid)
returns boolean as $$
  select exists(
    select 1 from public.campaign_members
    where campaign_id = cid and user_id = uid and role = 'gm'
  );
$$ language sql security definer stable;

create or replace function public.is_campaign_member_fn(cid uuid, uid uuid)
returns boolean as $$
  select exists(
    select 1 from public.campaign_members
    where campaign_id = cid and user_id = uid
  );
$$ language sql security definer stable;

create or replace function public.is_admin_fn(uid uuid)
returns boolean as $$
  select coalesce(
    (select is_admin from public.profiles where id = uid),
    false
  );
$$ language sql security definer stable;

-- ═══ RLS POLICIES ═══════════════════════════════════════════════════════════

alter table public.profiles enable row level security;
alter table public.campaigns enable row level security;
alter table public.campaign_members enable row level security;
alter table public.campaign_characters enable row level security;

-- Profiles policies
create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Campaign co-members can read profiles"
  on public.profiles for select
  using (
    profiles.id in (
      select cm2.user_id from public.campaign_members cm2
      where cm2.campaign_id in (select public.get_user_campaign_ids(auth.uid()))
    )
  );

create policy "Admins can read all profiles"
  on public.profiles for select
  using (public.is_admin_fn(auth.uid()));

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Admins can update any profile"
  on public.profiles for update
  using (public.is_admin_fn(auth.uid()));

-- Campaigns policies
create policy "Members can read their campaigns"
  on public.campaigns for select
  using (campaigns.id in (select public.get_user_campaign_ids(auth.uid())));

create policy "Admins can read all campaigns"
  on public.campaigns for select
  using (public.is_admin_fn(auth.uid()));

create policy "Authenticated users can create campaigns"
  on public.campaigns for insert
  with check (auth.uid() = created_by);

create policy "Creator can update campaign"
  on public.campaigns for update
  using (auth.uid() = created_by);

create policy "Admins can update any campaign"
  on public.campaigns for update
  using (public.is_admin_fn(auth.uid()));

create policy "Creator can delete campaign"
  on public.campaigns for delete
  using (auth.uid() = created_by);

create policy "Admins can delete any campaign"
  on public.campaigns for delete
  using (public.is_admin_fn(auth.uid()));

-- Campaign Members policies (use security definer functions to avoid self-referencing recursion)
create policy "Members can read co-members"
  on public.campaign_members for select
  using (public.is_campaign_member_fn(campaign_members.campaign_id, auth.uid()));

create policy "GMs can add members"
  on public.campaign_members for insert
  with check (public.is_campaign_gm(campaign_members.campaign_id, auth.uid()));

create policy "GMs can update member roles"
  on public.campaign_members for update
  using (public.is_campaign_gm(campaign_members.campaign_id, auth.uid()));

create policy "GMs can remove members"
  on public.campaign_members for delete
  using (public.is_campaign_gm(campaign_members.campaign_id, auth.uid()));

create policy "Members can leave campaigns"
  on public.campaign_members for delete
  using (auth.uid() = user_id);

-- Campaign Characters policies (use security definer functions)
create policy "Members can view campaign characters"
  on public.campaign_characters for select
  using (public.is_campaign_member_fn(campaign_characters.campaign_id, auth.uid()));

create policy "GMs can add characters to campaign"
  on public.campaign_characters for insert
  with check (public.is_campaign_gm(campaign_characters.campaign_id, auth.uid()));

create policy "Players can add own characters to campaign"
  on public.campaign_characters for insert
  with check (
    exists (
      select 1 from public.characters c
      where c.id = campaign_characters.character_id and c.user_id = auth.uid()
    )
    and public.is_campaign_member_fn(campaign_characters.campaign_id, auth.uid())
  );

create policy "GMs can remove characters from campaign"
  on public.campaign_characters for delete
  using (public.is_campaign_gm(campaign_characters.campaign_id, auth.uid()));

create policy "Players can remove own characters from campaign"
  on public.campaign_characters for delete
  using (
    exists (
      select 1 from public.characters c
      where c.id = campaign_characters.character_id and c.user_id = auth.uid()
    )
  );

-- ═══ Characters RLS policies ═══════════════════════════════════════════════
-- (characters table + RLS assumed to already exist)

create policy "Users can read own characters"
  on public.characters for select
  using (auth.uid() = user_id);

create policy "Users can create own characters"
  on public.characters for insert
  with check (auth.uid() = user_id);

create policy "Users can update own characters"
  on public.characters for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own characters"
  on public.characters for delete
  using (auth.uid() = user_id);

create policy "Campaign members can read campaign characters"
  on public.characters for select
  using (
    exists (
      select 1 from public.campaign_characters cc
      where cc.character_id = characters.id
        and cc.campaign_id in (select public.get_user_campaign_ids(auth.uid()))
    )
  );

create policy "Admins can read all characters"
  on public.characters for select
  using (public.is_admin_fn(auth.uid()));

-- ═══ RPC: Join by invite code ═══════════════════════════════════════════════

create or replace function public.join_campaign_by_invite(code text)
returns uuid as $$
declare
  v_campaign_id uuid;
begin
  select id into v_campaign_id from public.campaigns where invite_code = code;
  if v_campaign_id is null then
    raise exception 'Invalid invite code';
  end if;

  insert into public.campaign_members (campaign_id, user_id, role)
  values (v_campaign_id, auth.uid(), 'player')
  on conflict (campaign_id, user_id) do nothing;

  return v_campaign_id;
end;
$$ language plpgsql security definer;
