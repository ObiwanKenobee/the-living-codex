 import { Link } from 'react-router-dom';
 import { format } from 'date-fns';
 import { Calendar, MapPin, Clock, Heart, ExternalLink, Video, Trash2 } from 'lucide-react';
 import { Card, CardContent } from '@/components/ui/card';
 import { Button } from '@/components/ui/button';
 import { Badge } from '@/components/ui/badge';
 
 interface Event {
   id: string;
   title: string;
   start_date: string;
   end_date: string | null;
   location: string | null;
   is_virtual: boolean;
   event_type: string;
 }
 
 interface DashboardFavoritesProps {
   savedEvents: Event[];
   onRemoveFavorite: (id: string) => void;
 }
 
 const DashboardFavorites = ({ savedEvents, onRemoveFavorite }: DashboardFavoritesProps) => {
   return (
     <div className="space-y-6">
       <div className="flex items-center justify-between">
         <div>
           <h1 className="text-2xl font-light">Saved Events</h1>
           <p className="text-muted-foreground mt-1">
             Events you've bookmarked for later
           </p>
         </div>
         <Link to="/events">
           <Button variant="outline" className="gap-2">
             <Heart size={16} />
             Find More Events
           </Button>
         </Link>
       </div>
 
       {savedEvents.length === 0 ? (
         <Card>
           <CardContent className="py-16 text-center">
             <Heart className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
             <h3 className="text-lg font-medium mb-2">No saved events</h3>
             <p className="text-muted-foreground mb-6 max-w-md mx-auto">
               Browse events and click the heart icon to save them here for easy access later.
             </p>
             <Link to="/events">
               <Button>Explore Events</Button>
             </Link>
           </CardContent>
         </Card>
       ) : (
         <div className="grid gap-4 md:grid-cols-2">
           {savedEvents.map((event) => (
             <Card key={event.id} className="transition-all hover:shadow-md group">
               <CardContent className="p-5">
                 <div className="flex items-start justify-between gap-3 mb-3">
                   <div className="flex items-center gap-2">
                     <Badge variant="secondary" className="font-normal text-xs">
                       {event.event_type}
                     </Badge>
                     {event.is_virtual && (
                       <Badge variant="outline" className="font-normal text-xs gap-1">
                         <Video size={10} />
                         Virtual
                       </Badge>
                     )}
                   </div>
                   <Button
                     variant="ghost"
                     size="icon"
                     className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                     onClick={() => onRemoveFavorite(event.id)}
                   >
                     <Trash2 size={14} />
                   </Button>
                 </div>
                 
                 <h3 className="text-lg font-medium mb-3 line-clamp-2">{event.title}</h3>
                 
                 <div className="space-y-2 text-sm text-muted-foreground mb-4">
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
                 
                 <div className="flex items-center gap-2">
                   <Link to="/events" className="flex-1">
                     <Button variant="outline" size="sm" className="w-full gap-1.5">
                       View Event
                       <ExternalLink size={12} />
                     </Button>
                   </Link>
                   <Button 
                     variant="ghost" 
                     size="icon" 
                     className="h-9 w-9 text-primary"
                   >
                     <Heart size={16} className="fill-current" />
                   </Button>
                 </div>
               </CardContent>
             </Card>
           ))}
         </div>
       )}
     </div>
   );
 };
 
 export default DashboardFavorites;