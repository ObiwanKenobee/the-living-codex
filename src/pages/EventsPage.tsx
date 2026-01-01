import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Calendar, MapPin, Users, Video, Clock } from 'lucide-react';
import { format, isPast } from 'date-fns';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FadeInSection from '@/components/FadeInSection';
import EventRegistrationForm from '@/components/EventRegistrationForm';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Event {
  id: string;
  title: string;
  description: string | null;
  event_type: string;
  location: string | null;
  is_virtual: boolean;
  virtual_link: string | null;
  start_date: string;
  end_date: string | null;
  max_attendees: number | null;
  registration_deadline: string | null;
  image_url: string | null;
}

const eventTypeLabels: Record<string, string> = {
  workshop: 'Workshop',
  seminar: 'Seminar',
  retreat: 'Retreat',
  lecture: 'Lecture',
  community: 'Community Gathering',
};

const EventsPage = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const { data: events, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('start_date', { ascending: true });
      
      if (error) throw error;
      return data as Event[];
    },
  });

  const upcomingEvents = events?.filter(e => !isPast(new Date(e.start_date))) || [];
  const pastEvents = events?.filter(e => isPast(new Date(e.start_date))) || [];

  const isRegistrationOpen = (event: Event) => {
    if (!event.registration_deadline) return true;
    return !isPast(new Date(event.registration_deadline));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="py-20">
        <div className="container-wide">
          {/* Header */}
          <FadeInSection>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12 font-sans-nav text-xs tracking-wider"
            >
              <ArrowLeft size={14} />
              Return to Codex
            </Link>

            <h1 className="text-4xl md:text-5xl font-light mb-6">Events & Workshops</h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Join us for workshops, retreats, and community gatherings focused on ethical living, 
              regenerative practices, and the principles of the Atlas Codex.
            </p>
          </FadeInSection>

          {/* Upcoming Events */}
          <FadeInSection delay={100}>
            <section className="mt-16">
              <h2 className="text-2xl font-light mb-8">Upcoming Events</h2>
              
              {isLoading ? (
                <div className="text-muted-foreground">Loading events...</div>
              ) : upcomingEvents.length === 0 ? (
                <div className="p-8 border divider bg-card text-center">
                  <p className="text-muted-foreground">No upcoming events scheduled. Check back soon!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {upcomingEvents.map((event) => (
                    <div 
                      key={event.id}
                      className="border divider bg-card hover:bg-muted/20 transition-colors overflow-hidden"
                    >
                      {event.image_url && (
                        <div className="aspect-[16/9] overflow-hidden">
                          <img
                            src={event.image_url}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-start gap-3 mb-3">
                          <span className="px-2 py-1 text-xs font-sans-nav bg-primary/10 text-primary">
                            {eventTypeLabels[event.event_type] || event.event_type}
                          </span>
                          {event.is_virtual && (
                            <span className="px-2 py-1 text-xs font-sans-nav bg-accent/10 text-accent flex items-center gap-1">
                              <Video size={12} />
                              Virtual
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-xl font-light mb-3">{event.title}</h3>
                        
                        <div className="space-y-2 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar size={14} />
                            <span>{format(new Date(event.start_date), 'EEEE, MMMM d, yyyy')}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={14} />
                            <span>
                              {format(new Date(event.start_date), 'h:mm a')}
                              {event.end_date && ` - ${format(new Date(event.end_date), 'h:mm a')}`}
                            </span>
                          </div>
                          {event.location && (
                            <div className="flex items-center gap-2">
                              <MapPin size={14} />
                              <span>{event.location}</span>
                            </div>
                          )}
                          {event.max_attendees && (
                            <div className="flex items-center gap-2">
                              <Users size={14} />
                              <span>Limited to {event.max_attendees} attendees</span>
                            </div>
                          )}
                        </div>
                        
                        {event.description && (
                          <p className="text-sm text-reading mb-4 line-clamp-3">{event.description}</p>
                        )}
                        
                        <div className="flex items-center justify-between mt-4 pt-4 border-t divider">
                          {event.registration_deadline && (
                            <span className="text-xs text-muted-foreground">
                              Register by {format(new Date(event.registration_deadline), 'MMM d')}
                            </span>
                          )}
                          <button
                            onClick={() => setSelectedEvent(event)}
                            disabled={!isRegistrationOpen(event)}
                            className="ml-auto px-4 py-2 border divider hover:bg-foreground hover:text-background transition-colors font-sans-nav text-xs tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isRegistrationOpen(event) ? 'Register' : 'Registration Closed'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </FadeInSection>

          {/* Past Events */}
          {pastEvents.length > 0 && (
            <FadeInSection delay={200}>
              <section className="mt-20">
                <h2 className="text-2xl font-light mb-8 text-muted-foreground">Past Events</h2>
                <div className="space-y-4">
                  {pastEvents.slice(0, 5).map((event) => (
                    <div 
                      key={event.id}
                      className="p-4 border divider bg-card/50 opacity-70"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <h3 className="font-light">{event.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(event.start_date), 'MMMM d, yyyy')}
                            {event.location && ` • ${event.location}`}
                          </p>
                        </div>
                        <span className="text-xs font-sans-nav text-muted-foreground">
                          {eventTypeLabels[event.event_type] || event.event_type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </FadeInSection>
          )}

          {/* Note */}
          <FadeInSection delay={300}>
            <div className="mt-20 p-8 border divider bg-muted/10 text-center">
              <p className="text-sm text-muted-foreground italic">
                Can't find an event near you? Subscribe to our newsletter to be notified 
                when new events are announced in your area.
              </p>
            </div>
          </FadeInSection>
        </div>
      </main>

      <Footer />

      {/* Registration Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-light text-xl">
              Register for Event
            </DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div>
              <p className="text-sm text-muted-foreground mb-4">
                {selectedEvent.title}
              </p>
              <EventRegistrationForm 
                eventId={selectedEvent.id}
                eventTitle={selectedEvent.title}
                onSuccess={() => setSelectedEvent(null)}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventsPage;
