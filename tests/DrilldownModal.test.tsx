import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchInstitutions } from "../src/api/client";
import { DrilldownModal } from "../src/components/shared/DrilldownModal";
import type { BudgetDestination } from "../src/data/budget2026";
import { LinguiProvider } from "../src/i18n";

vi.mock("../src/api/client", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../src/api/client")>();
  return { ...actual, fetchInstitutions: vi.fn() };
});

const mockedFetch = vi.mocked(fetchInstitutions);

const destination: BudgetDestination = {
  id: "66",
  name: "Sănătate",
  amount: "100",
  percentOfTotal: "100",
};

function renderModal() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <LinguiProvider>
      <QueryClientProvider client={client}>
        <DrilldownModal
          destination={destination}
          onClose={() => {}}
          onBackToOverview={() => {}}
        />
      </QueryClientProvider>
    </LinguiProvider>
  );
}

describe("DrilldownModal", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the institutions of the destination", async () => {
    mockedFetch.mockResolvedValue({
      category: "66",
      total: "100",
      institutions: [
        { id: "1", name: "Spital A", amount: "60" },
        { id: "2", name: "Spital B", amount: "40" },
      ],
    });

    renderModal();

    expect(
      await screen.findByRole("dialog", { name: "Sănătate" })
    ).toBeInTheDocument();
    expect(await screen.findByText("Spital A")).toBeInTheDocument();
    expect(screen.getByText("Spital B")).toBeInTheDocument();
  });

  it("shows the empty state when the destination has no institutions", async () => {
    mockedFetch.mockResolvedValue({
      category: "66",
      total: "0",
      institutions: [],
    });

    renderModal();

    expect(await screen.findByText(/Fără instituții/)).toBeInTheDocument();
  });
});
