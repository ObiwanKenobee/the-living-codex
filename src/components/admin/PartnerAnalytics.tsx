import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TrendingUp, Eye, MousePointer, Calendar, Download, FileText } from 'lucide-react';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import CSVExport from './CSVExport';

interface PartnerStats {
  id: string;
  name: string;
  logo_url: string | null;
  tier: string;
  impressions: number;
  clicks: number;
  ctr: number;
}

const PartnerAnalytics = () => {
  const [startDate, setStartDate] = useState(() => format(subDays(new Date(), 30), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState(() => format(new Date(), 'yyyy-MM-dd'));
  const [dateFilterOpen, setDateFilterOpen] = useState(false);

  const { data: analytics, isLoading } = useQuery({
    queryKey: ['partner-analytics', startDate, endDate],
    queryFn: async () => {
      // Fetch all partners
      const { data: partners, error: partnersError } = await supabase
        .from('partners')
        .select('id, name, logo_url, tier')
        .order('display_order', { ascending: true });

      if (partnersError) throw partnersError;

      // Fetch analytics counts grouped by partner and event type within date range
      let query = supabase
        .from('partner_analytics')
        .select('partner_id, event_type, created_at');
      
      if (startDate) {
        query = query.gte('created_at', startOfDay(new Date(startDate)).toISOString());
      }
      if (endDate) {
        query = query.lte('created_at', endOfDay(new Date(endDate)).toISOString());
      }
      
      const { data: analyticsData, error: analyticsError } = await query;

      if (analyticsError) throw analyticsError;

      // Calculate stats for each partner
      const stats: PartnerStats[] = partners.map(partner => {
        const partnerEvents = analyticsData.filter(a => a.partner_id === partner.id);
        const impressions = partnerEvents.filter(a => a.event_type === 'impression').length;
        const clicks = partnerEvents.filter(a => a.event_type === 'click').length;
        const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;

        return {
          id: partner.id,
          name: partner.name,
          logo_url: partner.logo_url,
          tier: partner.tier || 'silver',
          impressions,
          clicks,
          ctr,
        };
      });

      // Sort by impressions descending
      return stats.sort((a, b) => b.impressions - a.impressions);
    },
  });

  const setPresetRange = (days: number) => {
    setEndDate(format(new Date(), 'yyyy-MM-dd'));
    setStartDate(format(subDays(new Date(), days), 'yyyy-MM-dd'));
    setDateFilterOpen(false);
  };

  const csvColumns = [
    { key: 'name', label: 'Partner Name' },
    { key: 'tier', label: 'Tier' },
    { key: 'impressions', label: 'Impressions' },
    { key: 'clicks', label: 'Clicks' },
    { key: 'ctr', label: 'CTR (%)' },
  ];

  const csvData = analytics?.map(p => ({
    name: p.name,
    tier: p.tier,
    impressions: p.impressions,
    clicks: p.clicks,
    ctr: p.ctr.toFixed(2),
  })) || [];

  const totalImpressions = analytics?.reduce((sum, p) => sum + p.impressions, 0) || 0;
  const totalClicks = analytics?.reduce((sum, p) => sum + p.clicks, 0) || 0;
  const averageCTR = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;

  return (
    <div className="border divider bg-card overflow-hidden">
      <div className="p-4 border-b divider flex items-center justify-between flex-wrap gap-4">
        <h2 className="font-light">Partner Analytics</h2>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Date Range Filter */}
          <Popover open={dateFilterOpen} onOpenChange={setDateFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Calendar size={14} className="mr-2" />
                {format(new Date(startDate), 'MMM d')} - {format(new Date(endDate), 'MMM d, yyyy')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-4">
                <div className="text-sm font-medium">Date Range</div>
                
                {/* Preset Buttons */}
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => setPresetRange(7)}>
                    Last 7 days
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setPresetRange(30)}>
                    Last 30 days
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setPresetRange(90)}>
                    Last 90 days
                  </Button>
                </div>

                {/* Custom Date Inputs */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start-date" className="text-xs">Start Date</Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="end-date" className="text-xs">End Date</Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  size="sm"
                  onClick={() => setDateFilterOpen(false)}
                >
                  Apply
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* CSV Export */}
          <CSVExport
            data={csvData}
            filename={`partner-analytics-${startDate}-to-${endDate}`}
            columns={csvColumns}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 p-4 border-b divider">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
            <Eye size={14} />
            <span className="text-xs uppercase tracking-wider">Total Impressions</span>
          </div>
          <p className="text-2xl font-light">{totalImpressions.toLocaleString()}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
            <MousePointer size={14} />
            <span className="text-xs uppercase tracking-wider">Total Clicks</span>
          </div>
          <p className="text-2xl font-light">{totalClicks.toLocaleString()}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
            <TrendingUp size={14} />
            <span className="text-xs uppercase tracking-wider">Avg CTR</span>
          </div>
          <p className="text-2xl font-light">{averageCTR.toFixed(2)}%</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Partner</TableHead>
              <TableHead>Tier</TableHead>
              <TableHead className="text-right">Impressions</TableHead>
              <TableHead className="text-right">Clicks</TableHead>
              <TableHead className="text-right">CTR</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  Loading analytics...
                </TableCell>
              </TableRow>
            ) : analytics?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No analytics data yet.
                </TableCell>
              </TableRow>
            ) : (
              analytics?.map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {partner.logo_url ? (
                        <img 
                          src={partner.logo_url} 
                          alt={partner.name} 
                          className="h-6 w-12 object-contain"
                        />
                      ) : (
                        <div className="h-6 w-12 bg-muted flex items-center justify-center text-xs">
                          —
                        </div>
                      )}
                      <span className="font-medium">{partner.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs px-2 py-1 rounded capitalize bg-muted">
                      {partner.tier}
                    </span>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {partner.impressions.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {partner.clicks.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    <span className={partner.ctr > 5 ? 'text-primary' : ''}>
                      {partner.ctr.toFixed(2)}%
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PartnerAnalytics;
