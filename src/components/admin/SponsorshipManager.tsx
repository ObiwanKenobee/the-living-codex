import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Plus, Edit2, Trash2, DollarSign, Mail, Building, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SponsorshipTier {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string | null;
  features: string[];
  display_order: number;
  is_highlighted: boolean;
  is_active: boolean;
}

interface SponsorshipApplication {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string | null;
  website_url: string | null;
  preferred_tier: string;
  message: string | null;
  status: string;
  created_at: string;
}

const SponsorshipManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTier, setEditingTier] = useState<SponsorshipTier | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    period: '/year',
    description: '',
    features: '',
    is_highlighted: false,
    is_active: true,
  });

  // Fetch tiers
  const { data: tiers, isLoading: tiersLoading } = useQuery({
    queryKey: ['admin-sponsorship-tiers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sponsorship_tiers')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data as SponsorshipTier[];
    },
  });

  // Fetch applications
  const { data: applications, refetch: refetchApplications } = useQuery({
    queryKey: ['admin-sponsorship-applications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sponsorship_applications')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as SponsorshipApplication[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (data: typeof formData & { id?: string }) => {
      const features = data.features.split('\n').filter(f => f.trim());
      
      if (data.id) {
        const { error } = await supabase
          .from('sponsorship_tiers')
          .update({
            name: data.name,
            price: data.price,
            period: data.period,
            description: data.description || null,
            features,
            is_highlighted: data.is_highlighted,
            is_active: data.is_active,
          })
          .eq('id', data.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('sponsorship_tiers')
          .insert({
            name: data.name,
            price: data.price,
            period: data.period,
            description: data.description || null,
            features,
            is_highlighted: data.is_highlighted,
            is_active: data.is_active,
            display_order: (tiers?.length || 0) + 1,
          });
        
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-sponsorship-tiers'] });
      toast({ title: editingTier ? 'Tier updated' : 'Tier created' });
      resetForm();
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('sponsorship_tiers')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-sponsorship-tiers'] });
      toast({ title: 'Tier deleted' });
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('sponsorship_applications')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-sponsorship-applications'] });
      toast({ title: 'Status updated' });
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const resetForm = () => {
    setFormData({
      name: '',
      price: 0,
      period: '/year',
      description: '',
      features: '',
      is_highlighted: false,
      is_active: true,
    });
    setEditingTier(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (tier: SponsorshipTier) => {
    setEditingTier(tier);
    setFormData({
      name: tier.name,
      price: tier.price,
      period: tier.period,
      description: tier.description || '',
      features: tier.features.join('\n'),
      is_highlighted: tier.is_highlighted,
      is_active: tier.is_active,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate({
      ...formData,
      id: editingTier?.id,
    });
  };

  const statusColors: Record<string, string> = {
    pending: 'bg-amber-500/10 text-amber-600',
    reviewed: 'bg-blue-500/10 text-blue-600',
    approved: 'bg-primary/10 text-primary',
    rejected: 'bg-destructive/10 text-destructive',
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="tiers">
        <TabsList className="mb-4">
          <TabsTrigger value="tiers">Pricing Tiers</TabsTrigger>
          <TabsTrigger value="applications">
            Applications ({applications?.filter(a => a.status === 'pending').length || 0})
          </TabsTrigger>
        </TabsList>

        {/* Tiers Tab */}
        <TabsContent value="tiers">
          <div className="border divider bg-card overflow-hidden">
            <div className="p-4 border-b divider flex items-center justify-between">
              <h2 className="font-light">Sponsorship Tiers</h2>
              <Dialog open={isDialogOpen} onOpenChange={(open) => {
                if (!open) resetForm();
                setIsDialogOpen(open);
              }}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus size={14} className="mr-2" />
                    Add Tier
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>
                      {editingTier ? 'Edit Tier' : 'Add Sponsorship Tier'}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Tier Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Gold, Silver, Bronze..."
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">Price (USD) *</Label>
                        <Input
                          id="price"
                          type="number"
                          min="0"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="period">Period</Label>
                        <Select
                          value={formData.period}
                          onValueChange={(value) => setFormData({ ...formData, period: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="/year">/year</SelectItem>
                            <SelectItem value="/month">/month</SelectItem>
                            <SelectItem value="/event">/event</SelectItem>
                            <SelectItem value=" one-time">one-time</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Brief description of this tier..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="features">Features (one per line)</Label>
                      <Textarea
                        id="features"
                        value={formData.features}
                        onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                        placeholder="Logo on website&#10;Newsletter mention&#10;Event booth space"
                        rows={5}
                      />
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Switch
                          id="is_highlighted"
                          checked={formData.is_highlighted}
                          onCheckedChange={(checked) => setFormData({ ...formData, is_highlighted: checked })}
                        />
                        <Label htmlFor="is_highlighted">Highlight (Most Popular)</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          id="is_active"
                          checked={formData.is_active}
                          onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                        />
                        <Label htmlFor="is_active">Active</Label>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={saveMutation.isPending}>
                        {saveMutation.isPending ? 'Saving...' : editingTier ? 'Update' : 'Create'}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Features</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-24">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tiersLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : tiers?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No tiers yet. Add your first tier above.
                      </TableCell>
                    </TableRow>
                  ) : (
                    tiers?.map((tier) => (
                      <TableRow key={tier.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{tier.name}</span>
                            {tier.is_highlighted && (
                              <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded">
                                Popular
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">${tier.price.toLocaleString()}</span>
                          <span className="text-muted-foreground">{tier.period}</span>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {tier.features.length} features
                        </TableCell>
                        <TableCell>
                          <span className={`text-xs px-2 py-1 rounded ${
                            tier.is_active
                              ? 'bg-primary/10 text-primary'
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {tier.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" onClick={() => handleEdit(tier)}>
                              <Edit2 size={14} />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => deleteMutation.mutate(tier.id)}>
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        {/* Applications Tab */}
        <TabsContent value="applications">
          <div className="border divider bg-card overflow-hidden">
            <div className="p-4 border-b divider flex items-center justify-between">
              <h2 className="font-light">Sponsorship Applications</h2>
              <Button variant="ghost" size="sm" onClick={() => refetchApplications()}>
                <RefreshCw size={14} className="mr-2" />
                Refresh
              </Button>
            </div>

            <div className="divide-y divider">
              {applications?.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  No applications yet
                </div>
              ) : (
                applications?.map((app) => (
                  <div key={app.id} className="p-4">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Building size={16} className="text-muted-foreground" />
                          <h3 className="font-medium">{app.company_name}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded capitalize ${statusColors[app.status] || statusColors.pending}`}>
                            {app.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {app.contact_name} • <a href={`mailto:${app.email}`} className="hover:underline">{app.email}</a>
                          {app.phone && ` • ${app.phone}`}
                        </p>
                        <p className="text-sm">
                          <span className="text-muted-foreground">Preferred Tier:</span>{' '}
                          <span className="font-medium">{app.preferred_tier}</span>
                        </p>
                        {app.website_url && (
                          <a href={app.website_url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                            {app.website_url}
                          </a>
                        )}
                        {app.message && (
                          <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded mt-2">
                            {app.message}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(app.created_at), 'MMM d, yyyy')}
                        </span>
                        <Select
                          value={app.status}
                          onValueChange={(status) => updateStatusMutation.mutate({ id: app.id, status })}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="reviewed">Reviewed</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={`mailto:${app.email}?subject=Re: ${app.preferred_tier} Sponsorship Application`}>
                            <Mail size={14} />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SponsorshipManager;
