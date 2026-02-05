 import { Link } from 'react-router-dom';
 import { format, isPast } from 'date-fns';
 import { Calendar, MapPin, Clock, ExternalLink, Video } from 'lucide-react';
 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 import { Button } from '@/components/ui/button';
 import { Badge } from '@/components/ui/badge';
 import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
 
 interface Event {
   id: string;
   title: string;
   start_date: string;
   end_date: string | null;
   location: string | null;
   is_virtual: boolean;
   event_type: string;
 }
 
 interface Registration {
   id: string;
   events: Event | null;
   registered_at: string;
   status?: string | null;
 }
 
 interface DashboardEventsProps {
   upcomingRegistrations: Registration[];
   pastRegistrations: Registration[];
 }
 
 const EventCard = ({ registration, isPast }: { registration: Registration; isPast?: boolean }) => {
   const event = registration.events;
   if (!event) return null;
 
   return (
     <Card className={`transition-all hover:shadow-md ${isPast ? 'opacity-70' : ''}`}>
       <CardContent className="p-5">
         <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
           <div className="flex-1 min-w-0">
             <div className="flex items-center gap-2 mb-2">
               <Badge variant={isPast ? 'secondary' : 'default'} className="font-normal text-xs">
                 {event.event_type}
               </Badge>
               {event.is_virtual && (
                 <Badge variant="outline" className="font-normal text-xs gap-1">
                   <Video size={10} />
                   Virtual
                 </Badge>
               )}
               {!isPast && (
                 <Badge variant="outline" className="font-normal text-xs text-primary border-primary/30 bg-primary/5">
                   Registered
                 </Badge>
               )}
             </div>
             
             <h3 className="text-lg font-medium mb-3 truncate">{event.title}</h3>
             
             <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
               <span className="flex items-center gap-1.5">
                 <Calendar size={14} />
                 {format(new Date(event.start_date), 'EEEE, MMM d, yyyy')}
               </span>
               <span className="flex items-center gap-1.5">
                 <Clock size={14} />
                 {format(new Date(event.start_date), 'h:mm a')}
               </span>
               {event.location && (
                 <span className="flex items-center gap-1.5">
                   <MapPin size={14} />
                   {event.location}
                 </span>
               )}
             </div>
           </div>
           
           <div className="flex items-center gap-2 shrink-0">
             <Button variant="outline" size="sm" className="gap-1.5">
               View Details
               <ExternalLink size={12} />
             </Button>
           </div>
         </div>
       </CardContent>
     </Card>
   );
 };
 
 const DashboardEvents = ({ upcomingRegistrations, pastRegistrations }: DashboardEventsProps) => {
   return (
     <div className="space-y-6">
       <div className="flex items-center justify-between">
         <div>
           <h1 className="text-2xl font-light">My Events</h1>
           <p className="text-muted-foreground mt-1">
             Manage your event registrations and history
           </p>
         </div>
         <Link to="/events">
           <Button className="gap-2">
             <Calendar size={16} />
             Browse Events
           </Button>
         </Link>
       </div>
 
       <Tabs defaultValue="upcoming" className="w-full">
         <TabsList>
           <TabsTrigger value="upcoming" className="gap-2">
             Upcoming
             {upcomingRegistrations.length > 0 && (
               <span className="px-1.5 py-0.5 text-xs rounded-full bg-primary/20">
                 {upcomingRegistrations.length}
               </span>
             )}
           </TabsTrigger>
           <TabsTrigger value="past" className="gap-2">
             Past Events
             {pastRegistrations.length > 0 && (
               <span className="px-1.5 py-0.5 text-xs rounded-full bg-muted">
                 {pastRegistrations.length}
               </span>
             )}
           </TabsTrigger>
         </TabsList>
 
         <TabsContent value="upcoming" className="mt-6">
           {upcomingRegistrations.length === 0 ? (
             <Card>
               <CardContent className="py-16 text-center">
                 <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                 <h3 className="text-lg font-medium mb-2">No upcoming events</h3>
                 <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                   You haven't registered for any upcoming events yet. Explore our calendar to find events that interest you.
                 </p>
                 <Link to="/events">
                   <Button>Browse Events</Button>
                 </Link>
               </CardContent>
             </Card>
           ) : (
             <div className="space-y-4">
               {upcomingRegistrations.map((reg) => (
                 <EventCard key={reg.id} registration={reg} />
               ))}
             </div>
           )}
         </TabsContent>
 
         <TabsContent value="past" className="mt-6">
           {pastRegistrations.length === 0 ? (
             <Card>
               <CardContent className="py-16 text-center">
                 <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                 <h3 className="text-lg font-medium mb-2">No past events</h3>
                 <p className="text-muted-foreground max-w-md mx-auto">
                   Once you attend events, they'll appear here for your reference.
                 </p>
               </CardContent>
             </Card>
           ) : (
             <div className="space-y-4">
               {pastRegistrations.map((reg) => (
                 <EventCard key={reg.id} registration={reg} isPast />
               ))}
             </div>
           )}
         </TabsContent>
       </Tabs>
     </div>
   );
 };
 
 export default DashboardEvents;