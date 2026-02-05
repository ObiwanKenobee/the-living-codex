 import { useEffect, useState } from 'react';
 import { useNavigate } from 'react-router-dom';
 import { useQuery } from '@tanstack/react-query';
 import { isPast } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useEventFavorites } from '@/hooks/useEventFavorites';
 import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
 import DashboardOverview from '@/components/dashboard/DashboardOverview';
 import DashboardEvents from '@/components/dashboard/DashboardEvents';
 import DashboardFavorites from '@/components/dashboard/DashboardFavorites';
 import DashboardProfile from '@/components/dashboard/DashboardProfile';
 import DashboardNotifications from '@/components/dashboard/DashboardNotifications';
 import DashboardSettings from '@/components/dashboard/DashboardSettings';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface Event {
  id: string;
  title: string;
  start_date: string;
  end_date: string | null;
  location: string | null;
  is_virtual: boolean;
  event_type: string;
}

const DashboardPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
   const [activeTab, setActiveTab] = useState('overview');
   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
   const { favorites, removeFavorite } = useEventFavorites();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session?.user) {
          navigate('/login');
        } else {
          setUser(session.user);
          setIsLoading(false);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        navigate('/login');
      } else {
        setUser(session.user);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const { data: profile, refetch: refetchProfile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: registrations } = useQuery({
    queryKey: ['user-registrations', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('event_registrations')
        .select(`
          *,
          events (
            id,
            title,
            start_date,
            end_date,
            location,
            is_virtual,
            event_type
          )
        `)
        .eq('user_id', user.id)
        .order('registered_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: favoriteEvents } = useQuery({
    queryKey: ['favorite-events', favorites],
    queryFn: async () => {
      if (favorites.length === 0) return [];
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .in('id', favorites)
        .order('start_date', { ascending: true });
      
      if (error) throw error;
      return data as Event[];
    },
    enabled: favorites.length > 0,
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: 'Signed out',
      description: 'You have been signed out successfully.',
    });
    navigate('/');
  };

  const upcomingRegistrations = registrations?.filter(
     (r: any) => r.events && !isPast(new Date(r.events.start_date))
  ) || [];

  const pastRegistrations = registrations?.filter(
     (r: any) => r.events && isPast(new Date(r.events.start_date))
  ) || [];

  const upcomingFavorites = favoriteEvents?.filter(
     (e: Event) => !isPast(new Date(e.start_date))
  ) || [];

   const stats = {
     upcomingEvents: upcomingRegistrations.length,
     savedEvents: upcomingFavorites.length,
     pastEvents: pastRegistrations.length,
   };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

   const renderContent = () => {
     switch (activeTab) {
       case 'overview':
         return (
           <DashboardOverview
             upcomingRegistrations={upcomingRegistrations}
             pastRegistrations={pastRegistrations}
             savedEvents={upcomingFavorites}
             onNavigate={setActiveTab}
           />
         );
       case 'events':
         return (
           <DashboardEvents
             upcomingRegistrations={upcomingRegistrations}
             pastRegistrations={pastRegistrations}
           />
         );
       case 'favorites':
         return (
           <DashboardFavorites
             savedEvents={upcomingFavorites}
             onRemoveFavorite={removeFavorite}
           />
         );
       case 'profile':
         return (
           <DashboardProfile
             profile={profile}
             userEmail={user?.email || ''}
             stats={stats}
             onProfileUpdate={() => refetchProfile()}
           />
         );
       case 'notifications':
         return <DashboardNotifications />;
       case 'settings':
         return <DashboardSettings />;
       default:
         return (
           <DashboardOverview
             upcomingRegistrations={upcomingRegistrations}
             pastRegistrations={pastRegistrations}
             savedEvents={upcomingFavorites}
             onNavigate={setActiveTab}
           />
         );
     }
   };

  return (
     <div className="min-h-screen bg-background text-foreground">
       <DashboardSidebar
         collapsed={sidebarCollapsed}
         onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
         userName={profile?.full_name || 'User'}
         userEmail={user?.email || ''}
         activeTab={activeTab}
         onTabChange={setActiveTab}
         onSignOut={handleSignOut}
         stats={stats}
       />
       
       <main 
         className={`min-h-screen transition-all duration-300 ${
           sidebarCollapsed ? 'ml-16' : 'ml-64'
         }`}
       >
         <div className="p-6 md:p-8 lg:p-10 max-w-7xl">
           {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
