import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { LogOut, Users, Mail, Calendar, CalendarPlus, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import EventsManager from '@/components/admin/EventsManager';
import type { User, Session } from '@supabase/supabase-js';

const AdminDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session) {
        navigate('/auth');
      }
    });

    // Check session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        setTimeout(() => {
          verifyAdminAccess(session.user.id);
        }, 0);
      } else {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const verifyAdminAccess = async (userId: string) => {
    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin');
    
    if (!roles || roles.length === 0) {
      toast({
        title: 'Access Denied',
        description: 'You do not have admin privileges.',
        variant: 'destructive',
      });
      await supabase.auth.signOut();
      navigate('/auth');
    } else {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  // Fetch newsletter subscribers
  const { data: subscribers, refetch: refetchSubscribers } = useQuery({
    queryKey: ['admin-subscribers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('subscribed_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !isLoading,
  });

  // Fetch contact messages
  const { data: messages, refetch: refetchMessages } = useQuery({
    queryKey: ['admin-messages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !isLoading,
  });

  // Fetch event registrations
  const { data: registrations, refetch: refetchRegistrations } = useQuery({
    queryKey: ['admin-registrations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('event_registrations')
        .select(`
          *,
          events (title)
        `)
        .order('registered_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !isLoading,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Verifying access...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b divider bg-card">
        <div className="container-wide py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-light">Admin Dashboard</h1>
            <p className="text-xs text-muted-foreground">
              Signed in as {user?.email}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleSignOut}>
            <LogOut size={14} className="mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-wide py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="p-6 border divider bg-card">
            <div className="flex items-center gap-3 mb-2">
              <Users size={18} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Newsletter Subscribers</span>
            </div>
            <p className="text-3xl font-light">{subscribers?.length || 0}</p>
          </div>
          <div className="p-6 border divider bg-card">
            <div className="flex items-center gap-3 mb-2">
              <Mail size={18} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Contact Messages</span>
            </div>
            <p className="text-3xl font-light">{messages?.length || 0}</p>
          </div>
          <div className="p-6 border divider bg-card">
            <div className="flex items-center gap-3 mb-2">
              <CalendarPlus size={18} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Total Events</span>
            </div>
            <p className="text-3xl font-light">—</p>
          </div>
          <div className="p-6 border divider bg-card">
            <div className="flex items-center gap-3 mb-2">
              <Calendar size={18} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Event Registrations</span>
            </div>
            <p className="text-3xl font-light">{registrations?.length || 0}</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="events" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="registrations">Registrations</TabsTrigger>
            <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          {/* Events Tab */}
          <TabsContent value="events">
            <EventsManager />
          </TabsContent>

          {/* Subscribers Tab */}
          <TabsContent value="subscribers">
            <div className="border divider bg-card overflow-hidden">
              <div className="p-4 border-b divider flex items-center justify-between">
                <h2 className="font-light">Newsletter Subscribers</h2>
                <Button variant="ghost" size="sm" onClick={() => refetchSubscribers()}>
                  <RefreshCw size={14} className="mr-2" />
                  Refresh
                </Button>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Subscribed</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subscribers?.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                          No subscribers yet
                        </TableCell>
                      </TableRow>
                    ) : (
                      subscribers?.map((sub) => (
                        <TableRow key={sub.id}>
                          <TableCell className="font-mono text-sm">{sub.email}</TableCell>
                          <TableCell>
                            {sub.unsubscribed_at ? (
                              <span className="text-xs px-2 py-1 bg-destructive/10 text-destructive rounded">
                                Unsubscribed
                              </span>
                            ) : sub.confirmed ? (
                              <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                                Confirmed
                              </span>
                            ) : (
                              <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded">
                                Pending
                              </span>
                            )}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {format(new Date(sub.subscribed_at), 'MMM d, yyyy h:mm a')}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <div className="border divider bg-card overflow-hidden">
              <div className="p-4 border-b divider flex items-center justify-between">
                <h2 className="font-light">Contact Messages</h2>
                <Button variant="ghost" size="sm" onClick={() => refetchMessages()}>
                  <RefreshCw size={14} className="mr-2" />
                  Refresh
                </Button>
              </div>
              <div className="divide-y divider">
                {messages?.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    No messages yet
                  </div>
                ) : (
                  messages?.map((msg) => (
                    <div key={msg.id} className="p-4">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-medium">{msg.subject}</h3>
                          <p className="text-sm text-muted-foreground">
                            From: {msg.name} &lt;{msg.email}&gt;
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(msg.created_at), 'MMM d, yyyy h:mm a')}
                        </span>
                      </div>
                      <p className="text-sm text-reading whitespace-pre-wrap">{msg.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </TabsContent>

          {/* Registrations Tab */}
          <TabsContent value="registrations">
            <div className="border divider bg-card overflow-hidden">
              <div className="p-4 border-b divider flex items-center justify-between">
                <h2 className="font-light">Event Registrations</h2>
                <Button variant="ghost" size="sm" onClick={() => refetchRegistrations()}>
                  <RefreshCw size={14} className="mr-2" />
                  Refresh
                </Button>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Registered</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {registrations?.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                          No registrations yet
                        </TableCell>
                      </TableRow>
                    ) : (
                      registrations?.map((reg: any) => (
                        <TableRow key={reg.id}>
                          <TableCell>{reg.name}</TableCell>
                          <TableCell className="font-mono text-sm">{reg.email}</TableCell>
                          <TableCell>{reg.events?.title || 'Unknown'}</TableCell>
                          <TableCell>
                            <span className={`text-xs px-2 py-1 rounded ${
                              reg.status === 'confirmed' 
                                ? 'bg-primary/10 text-primary'
                                : reg.status === 'cancelled'
                                ? 'bg-destructive/10 text-destructive'
                                : 'bg-muted text-muted-foreground'
                            }`}>
                              {reg.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {format(new Date(reg.registered_at), 'MMM d, yyyy')}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
