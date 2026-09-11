/**
 * Minimal CSV serialization. Pure function — no I/O, no throw.
 */
export function toCsv(headers: string[], rows: (string | number)[][]): string {
  const escape = (cell: string | number): string => {
    const text = String(cell);
    if (/[",\n\r]/.test(text)) {
      return `"${text.replace(/"/g, '""')}"`;
    }
    return text;
  };

  return [headers, ...rows].map((row) => row.map(escape).join(",")).join("\n");
}
