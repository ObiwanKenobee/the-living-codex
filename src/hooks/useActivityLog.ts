import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ActivityEntry {
  id: string;
  user_id: string;
  action: string;
  entity_type: string;
  entity_id: string | null;
  metadata: Record<string, any>;
  created_at: string;
}

export const useActivityLog = (userId?: string) => {
  const queryClient = useQueryClient();

  const { data: activities = [], isLoading } = useQuery({
    queryKey: ['activity-log', userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from('activity_log')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50);
      if (error) throw error;
      return data as ActivityEntry[];
    },
    enabled: !!userId,
  });

  const logActivity = useMutation({
    mutationFn: async ({
      action,
      entity_type,
      entity_id,
      metadata,
    }: {
      action: string;
      entity_type: string;
      entity_id?: string;
      metadata?: Record<string, any>;
    }) => {
      if (!userId) return;
      const { error } = await supabase.from('activity_log').insert({
        user_id: userId,
        action,
        entity_type,
        entity_id: entity_id || null,
        metadata: metadata || {},
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activity-log', userId] });
    },
  });

  return { activities, isLoading, logActivity: logActivity.mutate };
};
