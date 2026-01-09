import { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2, Edit2, GripVertical, ExternalLink, BarChart3 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import PartnerCSVImport from './PartnerCSVImport';
import PartnerAnalytics from './PartnerAnalytics';

type PartnerTier = 'gold' | 'silver' | 'bronze';

interface Partner {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  display_order: number;
  is_active: boolean;
  tier: PartnerTier;
}

const tierColors: Record<PartnerTier, string> = {
  gold: 'bg-amber-500/20 text-amber-700 dark:text-amber-400',
  silver: 'bg-slate-400/20 text-slate-600 dark:text-slate-300',
  bronze: 'bg-orange-600/20 text-orange-700 dark:text-orange-400',
};

const PartnersManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    website_url: '',
    is_active: true,
    tier: 'silver' as PartnerTier,
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const dragOverId = useRef<string | null>(null);

  const { data: partners, isLoading } = useQuery({
    queryKey: ['admin-partners'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data as Partner[];
    },
  });

  const uploadLogo = async (file: File, partnerId: string): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${partnerId}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('partner-logos')
      .upload(fileName, file, { upsert: true });
    
    if (uploadError) throw uploadError;
    
    const { data: { publicUrl } } = supabase.storage
      .from('partner-logos')
      .getPublicUrl(fileName);
    
    return publicUrl;
  };

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      setIsUploading(true);
      
      const { data: partner, error } = await supabase
        .from('partners')
        .insert({
          name: data.name,
          website_url: data.website_url || null,
          is_active: data.is_active,
          tier: data.tier,
          display_order: (partners?.length || 0) + 1,
        })
        .select()
        .single();
      
      if (error) throw error;
      
      if (logoFile && partner) {
        const logoUrl = await uploadLogo(logoFile, partner.id);
        await supabase
          .from('partners')
          .update({ logo_url: logoUrl })
          .eq('id', partner.id);
      }
      
      return partner;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-partners'] });
      toast({ title: 'Partner added successfully' });
      resetForm();
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
    onSettled: () => setIsUploading(false),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof formData }) => {
      setIsUploading(true);
      
      let logoUrl = editingPartner?.logo_url;
      
      if (logoFile) {
        logoUrl = await uploadLogo(logoFile, id);
      }
      
      const { error } = await supabase
        .from('partners')
        .update({
          name: data.name,
          website_url: data.website_url || null,
          is_active: data.is_active,
          tier: data.tier,
          logo_url: logoUrl,
        })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-partners'] });
      toast({ title: 'Partner updated successfully' });
      resetForm();
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
    onSettled: () => setIsUploading(false),
  });

  const reorderMutation = useMutation({
    mutationFn: async (reorderedPartners: Partner[]) => {
      const updates = reorderedPartners.map((partner, index) => 
        supabase
          .from('partners')
          .update({ display_order: index + 1 })
          .eq('id', partner.id)
      );
      
      await Promise.all(updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-partners'] });
      toast({ title: 'Order updated' });
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('partners')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-partners'] });
      toast({ title: 'Partner deleted' });
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const handleDragStart = (e: React.DragEvent, partnerId: string) => {
    setDraggedId(partnerId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, partnerId: string) => {
    e.preventDefault();
    dragOverId.current = partnerId;
  };

  const handleDragEnd = () => {
    if (!draggedId || !dragOverId.current || !partners) {
      setDraggedId(null);
      return;
    }

    const draggedIndex = partners.findIndex(p => p.id === draggedId);
    const dropIndex = partners.findIndex(p => p.id === dragOverId.current);

    if (draggedIndex !== dropIndex) {
      const reordered = [...partners];
      const [removed] = reordered.splice(draggedIndex, 1);
      reordered.splice(dropIndex, 0, removed);
      reorderMutation.mutate(reordered);
    }

    setDraggedId(null);
    dragOverId.current = null;
  };

  const resetForm = () => {
    setFormData({ name: '', website_url: '', is_active: true, tier: 'silver' });
    setLogoFile(null);
    setEditingPartner(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (partner: Partner) => {
    setEditingPartner(partner);
    setFormData({
      name: partner.name,
      website_url: partner.website_url || '',
      is_active: partner.is_active,
      tier: partner.tier || 'silver',
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPartner) {
      updateMutation.mutate({ id: editingPartner.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <div className="space-y-6">
      {showAnalytics && <PartnerAnalytics />}
      
      <div className="border divider bg-card overflow-hidden">
        <div className="p-4 border-b divider flex items-center justify-between">
          <h2 className="font-light">Partners & Affiliates</h2>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowAnalytics(!showAnalytics)}
            >
              <BarChart3 size={14} className="mr-2" />
              {showAnalytics ? 'Hide Analytics' : 'Analytics'}
            </Button>
            <PartnerCSVImport />
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              if (!open) resetForm();
              setIsDialogOpen(open);
            }}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus size={14} className="mr-2" />
                  Add Partner
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingPartner ? 'Edit Partner' : 'Add New Partner'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Partner Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="tier">Tier</Label>
                    <Select
                      value={formData.tier}
                      onValueChange={(value: PartnerTier) => setFormData({ ...formData, tier: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gold">🥇 Gold</SelectItem>
                        <SelectItem value="silver">🥈 Silver</SelectItem>
                        <SelectItem value="bronze">🥉 Bronze</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="logo">Logo</Label>
                    <Input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                    />
                    {editingPartner?.logo_url && !logoFile && (
                      <div className="mt-2">
                        <img 
                          src={editingPartner.logo_url} 
                          alt="Current logo" 
                          className="h-12 object-contain"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="website">Website URL</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website_url}
                      onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                      placeholder="https://example.com"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch
                      id="is_active"
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                    />
                    <Label htmlFor="is_active">Active</Label>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isUploading || !formData.name}>
                      {isUploading ? 'Saving...' : editingPartner ? 'Update' : 'Add'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Logo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Website</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : partners?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No partners yet. Add your first partner above.
                  </TableCell>
                </TableRow>
              ) : (
                partners?.map((partner) => (
                  <TableRow 
                    key={partner.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, partner.id)}
                    onDragOver={(e) => handleDragOver(e, partner.id)}
                    onDragEnd={handleDragEnd}
                    className={draggedId === partner.id ? 'opacity-50' : ''}
                  >
                    <TableCell>
                      <GripVertical size={14} className="text-muted-foreground cursor-grab active:cursor-grabbing" />
                    </TableCell>
                    <TableCell>
                      {partner.logo_url ? (
                        <img 
                          src={partner.logo_url} 
                          alt={partner.name} 
                          className="h-8 w-16 object-contain"
                        />
                      ) : (
                        <div className="h-8 w-16 bg-muted flex items-center justify-center text-xs text-muted-foreground">
                          No logo
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{partner.name}</TableCell>
                    <TableCell>
                      <span className={`text-xs px-2 py-1 rounded capitalize ${tierColors[partner.tier || 'silver']}`}>
                        {partner.tier || 'silver'}
                      </span>
                    </TableCell>
                    <TableCell>
                      {partner.website_url ? (
                        <a 
                          href={partner.website_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                        >
                          Visit <ExternalLink size={12} />
                        </a>
                      ) : (
                        <span className="text-muted-foreground text-sm">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className={`text-xs px-2 py-1 rounded ${
                        partner.is_active 
                          ? 'bg-primary/10 text-primary'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {partner.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEdit(partner)}
                        >
                          <Edit2 size={14} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => deleteMutation.mutate(partner.id)}
                        >
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
    </div>
  );
};

export default PartnersManager;