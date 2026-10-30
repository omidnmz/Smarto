import pg from 'pg';

const url = process.env.DATABASE_URL;
if (!url) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

export const pool = new pg.Pool({
  connectionString: url,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
  max: Number(process.env.DATABASE_POOL || 10),
});

export const q = (text, params) => pool.query(text, params);

// Documents are stored by their full path, the same shape the panel uses:
// collection paths have an odd number of segments, document paths an even number.
const SCHEMA = `
create table if not exists users (
  id text primary key,
  phone text unique not null,
  created_at bigint not null
);
create table if not exists otps (
  phone text primary key,
  code_hash text not null,
  expires_at bigint not null,
  attempts int not null default 0,
  sent_at bigint not null
);
create table if not exists sessions (
  token_hash text primary key,
  user_id text not null references users(id) on delete cascade,
  expires_at bigint not null
);
create table if not exists docs (
  path text primary key,
  parent text not null,
  id text not null,
  data jsonb not null,
  updated_at bigint not null
);
create index if not exists docs_parent_idx on docs(parent);
create index if not exists docs_people_uid_idx on docs((data->>'uid')) where parent like 'workspaces/%/people';
create index if not exists docs_people_phone_idx on docs((data->>'phone')) where parent like 'workspaces/%/people';
`;

export async function migrate() {
  await q(SCHEMA);
}
