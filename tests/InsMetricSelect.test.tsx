import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { InsMetricSelect } from "../src/components/shared/InsMetricSelect";
import { LinguiProvider } from "../src/i18n";

const options = [
  { code: "a", label: "Indicator A", unit: "x" },
  { code: "b", label: "Indicator B", unit: "y" },
];

function renderSelect(value: string, onChange: (code: string) => void) {
  return render(
    <LinguiProvider>
      <InsMetricSelect options={options} value={value} onChange={onChange} />
    </LinguiProvider>
  );
}

describe("InsMetricSelect", () => {
  it("renders one option per catalog entry with the current value", () => {
    renderSelect("a", () => {});

    expect(screen.getAllByRole("option")).toHaveLength(2);
    expect(screen.getByRole("combobox")).toHaveValue("a");
  });

  it("reports the selected code", () => {
    const onChange = vi.fn();
    renderSelect("a", onChange);

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "b" },
    });

    expect(onChange).toHaveBeenCalledWith("b");
  });
});
