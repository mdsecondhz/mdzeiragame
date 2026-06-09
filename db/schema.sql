create extension if not exists "uuid-ossp";

create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null unique,
  password_hash text not null,
  role text not null default 'player' check (role in ('player', 'admin')),
  coins integer not null default 0,
  level integer not null default 1,
  email_verified boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists items (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  type text not null check (type in ('weapon', 'armor', 'consumable')),
  rarity text not null default 'common',
  price_coins integer not null default 0,
  stats jsonb not null default '{}'::jsonb
);

create table if not exists inventory (
  user_id uuid references users(id) on delete cascade,
  item_id uuid references items(id) on delete cascade,
  quantity integer not null default 1,
  primary key (user_id, item_id)
);

create table if not exists purchases (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete set null,
  provider text not null check (provider in ('stripe', 'paypal')),
  provider_payment_id text not null unique,
  product_name text not null,
  coins integer not null default 0,
  amount_cents integer not null,
  status text not null,
  created_at timestamptz not null default now()
);

create table if not exists audit_logs (
  id bigserial primary key,
  user_id uuid references users(id) on delete set null,
  action text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

insert into items (name, type, rarity, price_coins, stats) values
  ('Espada de Coral', 'weapon', 'rare', 650, '{"damage": 18}'),
  ('Machado Vulcânico', 'weapon', 'epic', 1400, '{"damage": 32}'),
  ('Botas da Maré', 'armor', 'rare', 520, '{"speed": 8}'),
  ('Poção Solar', 'consumable', 'common', 80, '{"heal": 35}')
on conflict do nothing;
