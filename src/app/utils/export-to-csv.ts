export function exportToCsv(filename: string, columns: string[], rows: any[]): void {
  if (!rows?.length || !columns?.length) {
    return;
  }

  const header = columns.join(',');
  const body = rows.map((row) =>
    columns
      .map((col) => {
        const value = row?.[col];
        // JSON.stringify handles quoting/escaping and preserves commas/newlines safely.
        return JSON.stringify(value ?? '');
      })
      .join(',')
  );

  const csv = [header, ...body].join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
