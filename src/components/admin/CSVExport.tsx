import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CSVExportProps {
  data: Record<string, any>[];
  filename: string;
  columns?: { key: string; label: string }[];
}

const CSVExport = ({ data, filename, columns }: CSVExportProps) => {
  const exportToCSV = () => {
    if (!data || data.length === 0) return;

    // Determine columns from first row if not provided
    const cols = columns || Object.keys(data[0]).map(key => ({ key, label: key }));

    // Create CSV header
    const header = cols.map(col => `"${col.label}"`).join(',');

    // Create CSV rows
    const rows = data.map(row => {
      return cols.map(col => {
        let value = row[col.key];
        
        // Handle nested objects (like events.title)
        if (col.key.includes('.')) {
          const keys = col.key.split('.');
          value = keys.reduce((obj, key) => obj?.[key], row);
        }

        // Format value
        if (value === null || value === undefined) {
          return '""';
        }
        if (typeof value === 'object') {
          value = JSON.stringify(value);
        }
        // Escape quotes and wrap in quotes
        return `"${String(value).replace(/"/g, '""')}"`;
      }).join(',');
    });

    // Combine header and rows
    const csv = [header, ...rows].join('\n');

    // Create and download file
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={exportToCSV}
      disabled={!data || data.length === 0}
    >
      <Download size={14} className="mr-2" />
      Export CSV
    </Button>
  );
};

export default CSVExport;
