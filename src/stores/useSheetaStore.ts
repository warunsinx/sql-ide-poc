import { create } from "zustand";
import { runQuery as runSqlQuery } from "@/services/db";
import { useConnectionsStore } from "@/stores/useConnectionsStore";

export type SheetaState = {
  query: string;
  rows: Array<Record<string, unknown>>;
  columns: string[];
  setQuery: (query: string) => void;
  setResults: (rows: Array<Record<string, unknown>>, columns: string[]) => void;
  clearResults: () => void;
  runQuery: () => Promise<void>;
};

export const useSheetaStore = create<SheetaState>((set, get) => ({
  query: "",
  rows: [],
  columns: [],

  setQuery: (query: string) => set({ query }),

  setResults: (rows: Array<Record<string, unknown>>, columns: string[]) =>
    set({ rows, columns }),

  clearResults: () => set({ rows: [], columns: [] }),

  runQuery: async () => {
    try {
      const sql = get().query;
      // Get active connection URL (if any)
      const { getActiveConnection, buildDatabaseUrl } =
        useConnectionsStore.getState();
      const active = getActiveConnection();
      const dbUrl = active ? buildDatabaseUrl(active) : undefined;
      const result = await runSqlQuery(sql, dbUrl);

      if (result.length > 0) {
        const firstRow = result[0] as Record<string, unknown>;
        const cols = Object.keys(firstRow);
        set({ rows: result, columns: cols });
      } else {
        set({ rows: [], columns: [] });
      }
    } catch (error) {
      console.error(error);
      set({ rows: [], columns: [] });
    }
  },
}));
