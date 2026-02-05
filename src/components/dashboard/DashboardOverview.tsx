 import { Link } from 'react-router-dom';
 import { format, isPast, differenceInDays } from 'date-fns';
 import { 
   Calendar, 
   Heart, 
   Clock, 
   TrendingUp, 
   ArrowRight,
   MapPin,
   ExternalLink
 } from 'lucide-react';
 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 import { Button } from '@/components/ui/button';
 import { Badge } from '@/components/ui/badge';
 import { Progress } from '@/components/ui/progress';
 
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
 }
 
 interface DashboardOverviewProps {
   upcomingRegistrations: Registration[];
   pastRegistrations: Registration[];
   savedEvents: Event[];
   onNavigate: (tab: string) => void;
 }
 
 const StatCard = ({ 
   title, 
   value, 
   icon: Icon, 
   trend, 
   description,
   onClick 
 }: { 
   title: string; 
   value: number | string; 
   icon: React.ElementType; 
   trend?: { value: number; label: string };
   description?: string;
   onClick?: () => void;
 }) => (
   <Card 
     className={`relative overflow-hidden ${onClick ? 'cursor-pointer hover:border-primary/50 transition-colors' : ''}`}
     onClick={onClick}
   >
     <CardContent className="p-6">
       <div className="flex items-start justify-between">
         <div>
           <p className="text-sm font-medium text-muted-foreground">{title}</p>
           <p className="text-3xl font-light mt-2">{value}</p>
           {description && (
             <p className="text-xs text-muted-foreground mt-1">{description}</p>
           )}
           {trend && (
             <div className="flex items-center gap-1 mt-2 text-xs">
               <TrendingUp size={12} className="text-primary" />
               <span className="text-primary font-medium">+{trend.value}</span>
               <span className="text-muted-foreground">{trend.label}</span>
             </div>
           )}
         </div>
         <div className="p-3 bg-primary/10 rounded-lg">
           <Icon size={20} className="text-primary" />
         </div>
       </div>
       {onClick && (
         <ArrowRight size={14} className="absolute bottom-4 right-4 text-muted-foreground" />
       )}
     </CardContent>
   </Card>
 );
 
 const DashboardOverview = ({
   upcomingRegistrations,
   pastRegistrations,
   savedEvents,
   onNavigate,
 }: DashboardOverviewProps) => {
   const nextEvent = upcomingRegistrations[0]?.events;
   const daysUntilNextEvent = nextEvent 
     ? differenceInDays(new Date(nextEvent.start_date), new Date())
     : null;
 
   const totalEvents = upcomingRegistrations.length + pastRegistrations.length;
   const completionRate = totalEvents > 0 
     ? Math.round((pastRegistrations.length / totalEvents) * 100) 
     : 0;
 
   return (
     <div className="space-y-8">
       {/* Welcome Section */}
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
           <h1 className="text-2xl md:text-3xl font-light">Welcome back</h1>
           <p className="text-muted-foreground mt-1">
             Here's what's happening with your Atlas journey
           </p>
         </div>
         <Link to="/events">
           <Button className="gap-2">
             <Calendar size={16} />
             Browse Events
           </Button>
         </Link>
       </div>
 
       {/* Stats Grid */}
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         <StatCard
           title="Upcoming Events"
           value={upcomingRegistrations.length}
           icon={Calendar}
           onClick={() => onNavigate('events')}
         />
         <StatCard
           title="Saved Events"
           value={savedEvents.length}
           icon={Heart}
           onClick={() => onNavigate('favorites')}
         />
         <StatCard
           title="Events Attended"
           value={pastRegistrations.length}
           icon={Clock}
           description={`${completionRate}% completion rate`}
         />
         <StatCard
           title="Next Event"
           value={daysUntilNextEvent !== null ? `${daysUntilNextEvent}d` : '—'}
           icon={TrendingUp}
           description={daysUntilNextEvent !== null ? 'days away' : 'No upcoming events'}
         />
       </div>
 
       {/* Next Event Highlight */}
       {nextEvent && (
         <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
           <CardHeader className="pb-2">
             <div className="flex items-center justify-between">
               <CardTitle className="text-lg font-light flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                 Your Next Event
               </CardTitle>
               <Badge variant="secondary" className="font-normal">
                 {nextEvent.event_type}
               </Badge>
             </div>
           </CardHeader>
           <CardContent>
             <h3 className="text-xl font-medium mb-3">{nextEvent.title}</h3>
             <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
               <span className="flex items-center gap-1.5">
                 <Calendar size={14} />
                 {format(new Date(nextEvent.start_date), 'EEEE, MMMM d, yyyy')}
               </span>
               <span className="flex items-center gap-1.5">
                 <Clock size={14} />
                 {format(new Date(nextEvent.start_date), 'h:mm a')}
               </span>
               {nextEvent.location && (
                 <span className="flex items-center gap-1.5">
                   <MapPin size={14} />
                   {nextEvent.location}
                 </span>
               )}
             </div>
             <div className="flex items-center gap-4">
               <div className="flex-1">
                 <div className="flex justify-between text-xs text-muted-foreground mb-1">
                   <span>Time remaining</span>
                   <span>{daysUntilNextEvent} days</span>
                 </div>
                 <Progress value={Math.max(0, 100 - (daysUntilNextEvent || 0) * 3)} className="h-1.5" />
               </div>
               <Button variant="outline" size="sm" className="gap-1.5">
                 View Details
                 <ExternalLink size={12} />
               </Button>
             </div>
           </CardContent>
         </Card>
       )}
 
       {/* Quick Actions / Recent Activity */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Recent Registrations */}
         <Card>
           <CardHeader className="flex flex-row items-center justify-between pb-2">
             <CardTitle className="text-base font-medium">Recent Registrations</CardTitle>
             <Button 
               variant="ghost" 
               size="sm" 
               onClick={() => onNavigate('events')}
               className="text-xs"
             >
               View All
             </Button>
           </CardHeader>
           <CardContent>
             {upcomingRegistrations.length === 0 ? (
               <div className="text-center py-8">
                 <Calendar className="w-10 h-10 mx-auto mb-3 text-muted-foreground/50" />
                 <p className="text-sm text-muted-foreground">No upcoming events</p>
                 <Link to="/events">
                   <Button variant="link" size="sm" className="mt-2">
                     Browse events
                   </Button>
                 </Link>
               </div>
             ) : (
               <div className="space-y-3">
                 {upcomingRegistrations.slice(0, 3).map((reg) => (
                   <div 
                     key={reg.id}
                     className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                   >
                     <div className="min-w-0 flex-1">
                       <p className="text-sm font-medium truncate">{reg.events?.title}</p>
                       <p className="text-xs text-muted-foreground">
                         {reg.events && format(new Date(reg.events.start_date), 'MMM d, yyyy')}
                       </p>
                     </div>
                     <Badge variant="outline" className="ml-2 text-xs shrink-0">
                       {reg.events?.event_type}
                     </Badge>
                   </div>
                 ))}
               </div>
             )}
           </CardContent>
         </Card>
 
         {/* Saved Events */}
         <Card>
           <CardHeader className="flex flex-row items-center justify-between pb-2">
             <CardTitle className="text-base font-medium">Saved Events</CardTitle>
             <Button 
               variant="ghost" 
               size="sm" 
               onClick={() => onNavigate('favorites')}
               className="text-xs"
             >
               View All
             </Button>
           </CardHeader>
           <CardContent>
             {savedEvents.length === 0 ? (
               <div className="text-center py-8">
                 <Heart className="w-10 h-10 mx-auto mb-3 text-muted-foreground/50" />
                 <p className="text-sm text-muted-foreground">No saved events</p>
                 <Link to="/events">
                   <Button variant="link" size="sm" className="mt-2">
                     Explore events
                   </Button>
                 </Link>
               </div>
             ) : (
               <div className="space-y-3">
                 {savedEvents.slice(0, 3).map((event) => (
                   <div 
                     key={event.id}
                     className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                   >
                     <div className="min-w-0 flex-1">
                       <p className="text-sm font-medium truncate">{event.title}</p>
                       <p className="text-xs text-muted-foreground">
                         {format(new Date(event.start_date), 'MMM d, yyyy')}
                       </p>
                     </div>
                     <Heart size={14} className="text-primary fill-primary ml-2 shrink-0" />
                   </div>
                 ))}
               </div>
             )}
           </CardContent>
         </Card>
       </div>
     </div>
   );
 };
 
 export default DashboardOverview;