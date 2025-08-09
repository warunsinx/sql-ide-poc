import Database from "@tauri-apps/plugin-sql";

export async function runQuery(
  sql: string,
  databaseUrl?: string
): Promise<Array<Record<string, unknown>>> {
  const db = await Database.load(
    databaseUrl ?? import.meta.env.VITE_DATABASE_URL
  );
  const result = await db.select(sql);
  return Array.isArray(result)
    ? (result as Array<Record<string, unknown>>)
    : [];
}
