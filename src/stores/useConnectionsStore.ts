import { create } from "zustand";
import { persist } from "zustand/middleware";
import Database from "@tauri-apps/plugin-sql";

export type Connection = {
  id: string;
  name: string;
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  type: "postgres";
};

type ConnectionsState = {
  connections: Connection[];
  activeConnectionId?: string;
  addConnection: (conn: Omit<Connection, "id">) => Promise<Connection>;
  testConnection: (conn: Omit<Connection, "id">) => Promise<void>;
  setActiveConnection: (id: string) => void;
  removeConnection: (id: string) => void;
  getActiveConnection: () => Connection | undefined;
  buildDatabaseUrl: (conn: Connection) => string;
};

export const useConnectionsStore = create<ConnectionsState>()(
  persist(
    (set, get) => ({
      connections: [],
      activeConnectionId: undefined,

      buildDatabaseUrl: (conn: Connection) => {
        // For Postgres via Tauri SQL plugin
        const user = encodeURIComponent(conn.username);
        const pass = encodeURIComponent(conn.password);
        return `postgres://${user}:${pass}@${conn.host}:${conn.port}/${conn.database}`;
      },

      testConnection: async (conn: Omit<Connection, "id">) => {
        const temp: Connection = { id: "temp", ...conn };
        const url = get().buildDatabaseUrl(temp);
        const db = await Database.load(url);
        // Simple connectivity check
        await db.select("select 1 as ok");
      },

      addConnection: async (conn: Omit<Connection, "id">) => {
        // Optional: test before saving
        await get().testConnection(conn);
        const newConn: Connection = { id: crypto.randomUUID(), ...conn };
        set((state) => ({
          connections: [...state.connections, newConn],
          activeConnectionId: state.activeConnectionId ?? newConn.id,
        }));
        return newConn;
      },

      setActiveConnection: (id: string) => set({ activeConnectionId: id }),

      removeConnection: (id: string) =>
        set((state) => ({
          connections: state.connections.filter((c) => c.id !== id),
          activeConnectionId:
            state.activeConnectionId === id
              ? undefined
              : state.activeConnectionId,
        })),

      getActiveConnection: () => {
        const { connections, activeConnectionId } = get();
        return connections.find((c) => c.id === activeConnectionId);
      },
    }),
    {
      name: "connections-store",
      version: 1,
      partialize: (state) => ({
        connections: state.connections,
        activeConnectionId: state.activeConnectionId,
      }),
    }
  )
);
