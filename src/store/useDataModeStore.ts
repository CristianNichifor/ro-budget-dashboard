import { create } from "zustand";

export type DataMode = "unknown" | "live" | "fallback" | "partial";

interface DataModeState {
  mode: DataMode;
  successes: number;
  failures: number;
  reportRequest: (ok: boolean) => void;
}

/**
 * Tracks whether API calls are answered by the remote BFF or silently
 * fall back to bundled demo data, so the UI can label the data honestly.
 */
export const useDataModeStore = create<DataModeState>((set, get) => ({
  mode: "unknown",
  successes: 0,
  failures: 0,
  reportRequest: (ok) => {
    const successes = get().successes + (ok ? 1 : 0);
    const failures = get().failures + (ok ? 0 : 1);

    let mode: DataMode;
    if (successes > 0 && failures === 0) {
      mode = "live";
    } else if (failures > 0 && successes === 0) {
      mode = "fallback";
    } else if (successes > 0 && failures > 0) {
      mode = "partial";
    } else {
      mode = "unknown";
    }

    set({ successes, failures, mode });
  },
}));
