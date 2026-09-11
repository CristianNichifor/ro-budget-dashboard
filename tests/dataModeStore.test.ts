import { beforeEach, describe, expect, it } from "vitest";
import { useDataModeStore } from "../src/store/useDataModeStore";

describe("useDataModeStore", () => {
  beforeEach(() => {
    useDataModeStore.setState({ mode: "unknown", successes: 0, failures: 0 });
  });

  it("stays unknown before any request settles", () => {
    expect(useDataModeStore.getState().mode).toBe("unknown");
  });

  it("turns live when only remote responses succeed", () => {
    const { reportRequest } = useDataModeStore.getState();
    reportRequest(true);
    reportRequest(true);
    expect(useDataModeStore.getState().mode).toBe("live");
  });

  it("turns fallback when only remote responses fail", () => {
    const { reportRequest } = useDataModeStore.getState();
    reportRequest(false);
    reportRequest(false);
    expect(useDataModeStore.getState().mode).toBe("fallback");
  });

  it("turns partial when responses are mixed", () => {
    const { reportRequest } = useDataModeStore.getState();
    reportRequest(true);
    reportRequest(false);
    expect(useDataModeStore.getState().mode).toBe("partial");
  });
});
