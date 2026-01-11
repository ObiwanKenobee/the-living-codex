import { useState, useRef } from 'react';
import { Upload, FileText, X, Check, Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface CSVPartner {
  name: string;
  website_url?: string;
  tier?: string;
  is_active?: string;
}

interface ImportResult {
  success: number;
  failed: number;
  errors: string[];
}

const PartnerCSVImport = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<CSVPartner[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);

  const parseCSV = (text: string): CSVPartner[] => {
    const lines = text.trim().split('\n');
    if (lines.length < 2) return [];

    const headers = lines[0].toLowerCase().split(',').map(h => h.trim().replace(/"/g, ''));
    const nameIndex = headers.indexOf('name');
    const websiteIndex = headers.indexOf('website_url') !== -1 
      ? headers.indexOf('website_url') 
      : headers.indexOf('website');
    const tierIndex = headers.indexOf('tier');
    const activeIndex = headers.indexOf('is_active') !== -1 
      ? headers.indexOf('is_active') 
      : headers.indexOf('active');

    if (nameIndex === -1) {
      toast({ 
        title: 'Invalid CSV', 
        description: 'CSV must have a "name" column', 
        variant: 'destructive' 
      });
      return [];
    }

    return lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
      return {
        name: values[nameIndex] || '',
        website_url: websiteIndex !== -1 ? values[websiteIndex] : undefined,
        tier: tierIndex !== -1 ? values[tierIndex] : undefined,
        is_active: activeIndex !== -1 ? values[activeIndex] : undefined,
      };
    }).filter(p => p.name);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith('.csv')) {
      toast({ 
        title: 'Invalid file', 
        description: 'Please select a CSV file', 
        variant: 'destructive' 
      });
      return;
    }

    setFile(selectedFile);
    setResult(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const parsed = parseCSV(text);
      setPreview(parsed);
    };
    reader.readAsText(selectedFile);
  };

  const handleImport = async () => {
    if (preview.length === 0) return;

    setIsImporting(true);
    const importResult: ImportResult = { success: 0, failed: 0, errors: [] };

    // Get current partner count for display_order
    const { data: existingPartners } = await supabase
      .from('partners')
      .select('id')
      .order('display_order', { ascending: false })
      .limit(1);

    let displayOrder = existingPartners?.[0] ? 1 : 1;
    const { count } = await supabase.from('partners').select('*', { count: 'exact', head: true });
    displayOrder = (count || 0) + 1;

    for (const partner of preview) {
      const tier = ['gold', 'silver', 'bronze'].includes(partner.tier?.toLowerCase() || '')
        ? partner.tier?.toLowerCase()
        : 'silver';
      
      const isActive = partner.is_active?.toLowerCase() !== 'false' && partner.is_active !== '0';

      const { error } = await supabase.from('partners').insert({
        name: partner.name,
        website_url: partner.website_url || null,
        tier,
        is_active: isActive,
        display_order: displayOrder,
      });

      if (error) {
        importResult.failed++;
        importResult.errors.push(`${partner.name}: ${error.message}`);
      } else {
        importResult.success++;
        displayOrder++;
      }
    }

    setResult(importResult);
    setIsImporting(false);

    if (importResult.success > 0) {
      queryClient.invalidateQueries({ queryKey: ['admin-partners'] });
      toast({ 
        title: 'Import complete', 
        description: `${importResult.success} partners imported successfully` 
      });
    }
  };

  const resetState = () => {
    setFile(null);
    setPreview([]);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClose = (open: boolean) => {
    if (!open) resetState();
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Upload size={14} className="mr-2" />
          Import CSV
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Bulk Import Partners</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            <p>Upload a CSV file with the following columns:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>name</strong> (required) - Partner name</li>
              <li><strong>website_url</strong> - Partner website</li>
              <li><strong>tier</strong> - gold, silver, or bronze</li>
              <li><strong>is_active</strong> - true or false</li>
            </ul>
            <Button 
              variant="link" 
              size="sm" 
              className="p-0 h-auto mt-2"
              onClick={() => {
                const template = 'name,website_url,tier,is_active\n"Example Partner","https://example.com","gold","true"\n"Another Partner","https://another.com","silver","true"';
                const blob = new Blob([template], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'partner-import-template.csv';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
              }}
            >
              <FileText size={14} className="mr-1" />
              Download CSV template
            </Button>
          </div>

          <div className="border-2 border-dashed divider rounded-lg p-6 text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
              id="csv-upload"
            />
            <label 
              htmlFor="csv-upload" 
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              <FileText size={32} className="text-muted-foreground" />
              <span className="text-sm">
                {file ? file.name : 'Click to select a CSV file'}
              </span>
            </label>
          </div>

          {preview.length > 0 && (
            <div className="border divider rounded-lg overflow-hidden">
              <div className="bg-muted px-4 py-2 border-b divider">
                <span className="text-sm font-medium">Preview ({preview.length} partners)</span>
              </div>
              <div className="max-h-48 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left px-4 py-2">Name</th>
                      <th className="text-left px-4 py-2">Website</th>
                      <th className="text-left px-4 py-2">Tier</th>
                      <th className="text-left px-4 py-2">Active</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preview.slice(0, 10).map((partner, i) => (
                      <tr key={i} className="border-t divider">
                        <td className="px-4 py-2">{partner.name}</td>
                        <td className="px-4 py-2 text-muted-foreground">
                          {partner.website_url || '—'}
                        </td>
                        <td className="px-4 py-2 capitalize">
                          {partner.tier || 'silver'}
                        </td>
                        <td className="px-4 py-2">
                          {partner.is_active?.toLowerCase() === 'false' ? 'No' : 'Yes'}
                        </td>
                      </tr>
                    ))}
                    {preview.length > 10 && (
                      <tr className="border-t divider">
                        <td colSpan={4} className="px-4 py-2 text-center text-muted-foreground">
                          ... and {preview.length - 10} more
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {result && (
            <div className={`p-4 rounded-lg ${
              result.failed > 0 ? 'bg-destructive/10' : 'bg-primary/10'
            }`}>
              <div className="flex items-center gap-2">
                {result.failed > 0 ? (
                  <X size={16} className="text-destructive" />
                ) : (
                  <Check size={16} className="text-primary" />
                )}
                <span className="font-medium">
                  {result.success} imported, {result.failed} failed
                </span>
              </div>
              {result.errors.length > 0 && (
                <ul className="mt-2 text-sm text-destructive list-disc list-inside">
                  {result.errors.slice(0, 5).map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => handleClose(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleImport} 
              disabled={preview.length === 0 || isImporting}
            >
              {isImporting ? 'Importing...' : `Import ${preview.length} Partners`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PartnerCSVImport;
