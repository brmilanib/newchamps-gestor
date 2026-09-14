import * as XLSX from "xlsx";

/**
 * Lê as linhas de uma aba de um arquivo xlsx/csv (em memória) como objetos por coluna.
 * `header` permite pular linhas de título antes do cabeçalho real (ex.: abas de
 * relatório que começam com um título na primeira linha).
 */
export function lerLinhas(
  buffer: ArrayBuffer | Uint8Array | Buffer,
  aba?: string,
  opts?: { header?: number },
): Array<Record<string, unknown>> {
  const wb = XLSX.read(buffer, { type: "buffer", cellDates: true });
  const nome = aba ?? wb.SheetNames[0];
  const ws = wb.Sheets[nome];
  if (!ws) throw new Error(`Aba "${nome}" não encontrada. Abas disponíveis: ${wb.SheetNames.join(", ")}`);
  return XLSX.utils.sheet_to_json(ws, {
    defval: null,
    ...(opts?.header != null ? { range: opts.header } : {}),
  });
}

export function nomesDasAbas(buffer: ArrayBuffer | Uint8Array | Buffer): string[] {
  return XLSX.read(buffer, { type: "buffer" }).SheetNames;
}
