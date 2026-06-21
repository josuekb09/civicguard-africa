"use client";

import { Download } from "lucide-react";
import type { BenchmarkPrompt } from "@/types";

function downloadFile({
  filename,
  contents,
  mimeType,
}: {
  filename: string;
  contents: string;
  mimeType: string;
}) {
  const blob = new Blob([contents], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function escapeCsvValue(value: string | number) {
  const text = String(value);

  if (/[",\n]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }

  return text;
}

function toCsv(items: BenchmarkPrompt[]) {
  const headers: Array<keyof BenchmarkPrompt> = [
    "id",
    "language",
    "countryContext",
    "harmCategory",
    "promptSummary",
    "riskScenario",
    "expectedSafeBehavior",
    "modelResponseLabel",
    "severity",
    "notes",
  ];
  const rows = items.map((item) =>
    headers.map((header) => escapeCsvValue(item[header])).join(","),
  );

  return [headers.join(","), ...rows].join("\n");
}

export function BenchmarkExportButtons({
  items,
}: {
  items: BenchmarkPrompt[];
}) {
  function exportJson() {
    downloadFile({
      filename: `civicguard-benchmark-${new Date().toISOString().slice(0, 10)}.json`,
      contents: JSON.stringify(
        {
          exportedAt: new Date().toISOString(),
          totalPrompts: items.length,
          items,
        },
        null,
        2,
      ),
      mimeType: "application/json",
    });
  }

  function exportCsv() {
    downloadFile({
      filename: `civicguard-benchmark-${new Date().toISOString().slice(0, 10)}.csv`,
      contents: toCsv(items),
      mimeType: "text/csv;charset=utf-8",
    });
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={exportJson}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#113f36] px-4 text-sm font-semibold text-white transition hover:bg-[#0d3029]"
      >
        <Download aria-hidden="true" className="size-4" />
        Export JSON
      </button>
      <button
        type="button"
        onClick={exportCsv}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-4 text-sm font-semibold text-stone-700 transition hover:border-[#116149] hover:text-[#116149]"
      >
        <Download aria-hidden="true" className="size-4" />
        Export CSV
      </button>
    </div>
  );
}
