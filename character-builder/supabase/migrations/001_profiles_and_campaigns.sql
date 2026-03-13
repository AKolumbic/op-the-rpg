-- ============================================================================
-- Migration 001: Profiles, Campaigns, and Role-Based Permissions
-- Tables first, then triggers, then RLS policies
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
    exists (
      select 1 from public.campaign_members cm1
      join public.campaign_members cm2 on cm1.campaign_id = cm2.campaign_id
      where cm1.user_id = auth.uid() and cm2.user_id = profiles.id
    )
  );

create policy "Admins can read all profiles"
  on public.profiles for select
  using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true)
  );

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Admins can update any profile"
  on public.profiles for update
  using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true)
  );

-- Campaigns policies
create policy "Members can read their campaigns"
  on public.campaigns for select
  using (
    exists (
      select 1 from public.campaign_members cm
      where cm.campaign_id = campaigns.id and cm.user_id = auth.uid()
    )
  );

create policy "Admins can read all campaigns"
  on public.campaigns for select
  using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true)
  );

create policy "Authenticated users can create campaigns"
  on public.campaigns for insert
  with check (auth.uid() = created_by);

create policy "Creator can update campaign"
  on public.campaigns for update
  using (auth.uid() = created_by);

create policy "Admins can update any campaign"
  on public.campaigns for update
  using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true)
  );

create policy "Creator can delete campaign"
  on public.campaigns for delete
  using (auth.uid() = created_by);

create policy "Admins can delete any campaign"
  on public.campaigns for delete
  using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true)
  );

-- Campaign Members policies
create policy "Members can read co-members"
  on public.campaign_members for select
  using (
    exists (
      select 1 from public.campaign_members cm
      where cm.campaign_id = campaign_members.campaign_id and cm.user_id = auth.uid()
    )
  );

create policy "GMs can add members"
  on public.campaign_members for insert
  with check (
    exists (
      select 1 from public.campaign_members cm
      where cm.campaign_id = campaign_members.campaign_id
        and cm.user_id = auth.uid()
        and cm.role = 'gm'
    )
  );

create policy "GMs can update member roles"
  on public.campaign_members for update
  using (
    exists (
      select 1 from public.campaign_members cm
      where cm.campaign_id = campaign_members.campaign_id
        and cm.user_id = auth.uid()
        and cm.role = 'gm'
    )
  );

create policy "GMs can remove members"
  on public.campaign_members for delete
  using (
    exists (
      select 1 from public.campaign_members cm
      where cm.campaign_id = campaign_members.campaign_id
        and cm.user_id = auth.uid()
        and cm.role = 'gm'
    )
  );

create policy "Members can leave campaigns"
  on public.campaign_members for delete
  using (auth.uid() = user_id);

-- Campaign Characters policies
create policy "Members can view campaign characters"
  on public.campaign_characters for select
  using (
    exists (
      select 1 from public.campaign_members cm
      where cm.campaign_id = campaign_characters.campaign_id and cm.user_id = auth.uid()
    )
  );

create policy "GMs can add characters to campaign"
  on public.campaign_characters for insert
  with check (
    exists (
      select 1 from public.campaign_members cm
      where cm.campaign_id = campaign_characters.campaign_id
        and cm.user_id = auth.uid()
        and cm.role = 'gm'
    )
  );

create policy "Players can add own characters to campaign"
  on public.campaign_characters for insert
  with check (
    exists (
      select 1 from public.characters c
      where c.id = campaign_characters.character_id and c.user_id = auth.uid()
    )
    and exists (
      select 1 from public.campaign_members cm
      where cm.campaign_id = campaign_characters.campaign_id and cm.user_id = auth.uid()
    )
  );

create policy "GMs can remove characters from campaign"
  on public.campaign_characters for delete
  using (
    exists (
      select 1 from public.campaign_members cm
      where cm.campaign_id = campaign_characters.campaign_id
        and cm.user_id = auth.uid()
        and cm.role = 'gm'
    )
  );

create policy "Players can remove own characters from campaign"
  on public.campaign_characters for delete
  using (
    exists (
      select 1 from public.characters c
      where c.id = campaign_characters.character_id and c.user_id = auth.uid()
    )
  );

-- Extended characters access for campaign members
create policy "Campaign members can read campaign characters"
  on public.characters for select
  using (
    exists (
      select 1 from public.campaign_characters cc
      join public.campaign_members cm on cm.campaign_id = cc.campaign_id
      where cc.character_id = characters.id and cm.user_id = auth.uid()
    )
  );

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
