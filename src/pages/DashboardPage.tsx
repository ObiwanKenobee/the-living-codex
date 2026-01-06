import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Calendar, MapPin, LogOut, User } from 'lucide-react';
import { format, isPast } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FadeInSection from '@/components/FadeInSection';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { User as SupabaseUser } from '@supabase/supabase-js';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const { data: profile } = useQuery({
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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: 'Signed out',
      description: 'You have been signed out successfully.',
    });
    navigate('/');
  };

  const upcomingRegistrations = registrations?.filter(
    r => r.events && !isPast(new Date(r.events.start_date))
  ) || [];

  const pastRegistrations = registrations?.filter(
    r => r.events && isPast(new Date(r.events.start_date))
  ) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="py-20">
        <div className="container-wide">
          <FadeInSection>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12 font-sans-nav text-xs tracking-wider"
            >
              <ArrowLeft size={14} />
              Return to Codex
            </Link>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
              <div>
                <h1 className="text-3xl md:text-4xl font-light mb-2">Your Dashboard</h1>
                <p className="text-muted-foreground">
                  Welcome back, {profile?.full_name || user?.email}
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={handleSignOut}
                className="self-start flex items-center gap-2"
              >
                <LogOut size={16} />
                Sign Out
              </Button>
            </div>
          </FadeInSection>

          <FadeInSection delay={50}>
            <Tabs defaultValue="events" className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="events">My Events</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
              </TabsList>

              <TabsContent value="events">
                <div className="space-y-12">
                  {/* Upcoming Events */}
                  <section>
                    <h2 className="text-xl font-light mb-6">Upcoming Events</h2>
                    {upcomingRegistrations.length === 0 ? (
                      <div className="p-8 border divider bg-card text-center">
                        <p className="text-muted-foreground mb-4">
                          You haven't registered for any upcoming events.
                        </p>
                        <Link to="/events">
                          <Button variant="outline">Browse Events</Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="grid gap-4">
                        {upcomingRegistrations.map((reg) => (
                          <div 
                            key={reg.id}
                            className="p-6 border divider bg-card"
                          >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div>
                                <h3 className="text-lg font-light mb-2">
                                  {reg.events?.title}
                                </h3>
                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Calendar size={14} />
                                    {reg.events && format(new Date(reg.events.start_date), 'MMM d, yyyy')}
                                  </span>
                                  {reg.events?.location && (
                                    <span className="flex items-center gap-1">
                                      <MapPin size={14} />
                                      {reg.events.location}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <span className="text-xs font-sans-nav text-primary bg-primary/10 px-3 py-1 self-start">
                                Registered
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>

                  {/* Past Events */}
                  {pastRegistrations.length > 0 && (
                    <section>
                      <h2 className="text-xl font-light mb-6 text-muted-foreground">Past Events</h2>
                      <div className="grid gap-4">
                        {pastRegistrations.map((reg) => (
                          <div 
                            key={reg.id}
                            className="p-4 border divider bg-card/50 opacity-70"
                          >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                              <div>
                                <h3 className="font-light">{reg.events?.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {reg.events && format(new Date(reg.events.start_date), 'MMMM d, yyyy')}
                                </p>
                              </div>
                              <span className="text-xs font-sans-nav text-muted-foreground">
                                Attended
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="profile">
                <div className="max-w-lg">
                  <div className="p-8 border divider bg-card">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                        <User size={24} className="text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="text-lg font-light">
                          {profile?.full_name || 'Your Name'}
                        </h3>
                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                      </div>
                    </div>

                    <div className="space-y-4 text-sm">
                      <div className="flex justify-between py-2 border-b divider">
                        <span className="text-muted-foreground">Member since</span>
                        <span>{profile && format(new Date(profile.created_at), 'MMMM yyyy')}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b divider">
                        <span className="text-muted-foreground">Events attended</span>
                        <span>{pastRegistrations.length}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-muted-foreground">Upcoming events</span>
                        <span>{upcomingRegistrations.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </FadeInSection>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardPage;
