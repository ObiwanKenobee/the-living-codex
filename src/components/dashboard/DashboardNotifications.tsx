 import { Bell, Check, Calendar, Heart, Info } from 'lucide-react';
 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 import { Button } from '@/components/ui/button';
 import { Badge } from '@/components/ui/badge';
 
 interface Notification {
   id: string;
   type: 'event' | 'reminder' | 'system';
   title: string;
   message: string;
   timestamp: Date;
   read: boolean;
 }
 
 // Mock notifications - in production these would come from the database
 const mockNotifications: Notification[] = [
   {
     id: '1',
     type: 'system',
     title: 'Welcome to Atlas Codex',
     message: 'Thank you for joining our community. Explore events and resources to begin your journey.',
     timestamp: new Date(),
     read: false,
   },
 ];
 
 const DashboardNotifications = () => {
   const notifications = mockNotifications;
   const unreadCount = notifications.filter(n => !n.read).length;
 
   const getIcon = (type: Notification['type']) => {
     switch (type) {
       case 'event':
         return Calendar;
       case 'reminder':
         return Bell;
       default:
         return Info;
     }
   };
 
   return (
     <div className="space-y-6">
       <div className="flex items-center justify-between">
         <div>
           <h1 className="text-2xl font-light">Notifications</h1>
           <p className="text-muted-foreground mt-1">
             Stay updated with your events and community
           </p>
         </div>
         {unreadCount > 0 && (
           <Button variant="outline" size="sm" className="gap-2">
             <Check size={14} />
             Mark all as read
           </Button>
         )}
       </div>
 
       {notifications.length === 0 ? (
         <Card>
           <CardContent className="py-16 text-center">
             <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
             <h3 className="text-lg font-medium mb-2">No notifications</h3>
             <p className="text-muted-foreground max-w-md mx-auto">
               You're all caught up! We'll notify you about upcoming events and important updates.
             </p>
           </CardContent>
         </Card>
       ) : (
         <div className="space-y-3">
           {notifications.map((notification) => {
             const Icon = getIcon(notification.type);
             return (
               <Card 
                 key={notification.id} 
                 className={`transition-all hover:shadow-sm ${!notification.read ? 'border-l-4 border-l-primary' : ''}`}
               >
                 <CardContent className="p-4">
                   <div className="flex items-start gap-4">
                     <div className={`p-2 rounded-lg ${!notification.read ? 'bg-primary/10' : 'bg-muted'}`}>
                       <Icon size={16} className={!notification.read ? 'text-primary' : 'text-muted-foreground'} />
                     </div>
                     <div className="flex-1 min-w-0">
                       <div className="flex items-center justify-between gap-2 mb-1">
                         <h4 className="font-medium text-sm">{notification.title}</h4>
                         {!notification.read && (
                           <Badge variant="secondary" className="text-xs">New</Badge>
                         )}
                       </div>
                       <p className="text-sm text-muted-foreground">{notification.message}</p>
                       <p className="text-xs text-muted-foreground mt-2">
                         {notification.timestamp.toLocaleDateString()}
                       </p>
                     </div>
                   </div>
                 </CardContent>
               </Card>
             );
           })}
         </div>
       )}
     </div>
   );
 };
 
 export default DashboardNotifications;