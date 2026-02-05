 import { format } from 'date-fns';
 import { User, Mail, Calendar, Award, Settings } from 'lucide-react';
 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 import { Avatar, AvatarFallback } from '@/components/ui/avatar';
 import { Button } from '@/components/ui/button';
 import { Separator } from '@/components/ui/separator';
 import ProfileEditor from '@/components/ProfileEditor';
 
 interface Profile {
   id: string;
   user_id: string;
   full_name: string | null;
   email: string | null;
   created_at: string;
   updated_at: string;
 }
 
 interface DashboardProfileProps {
   profile: Profile | null;
   userEmail: string;
   stats: {
     upcomingEvents: number;
     savedEvents: number;
     pastEvents: number;
   };
   onProfileUpdate: () => void;
 }
 
 const DashboardProfile = ({ profile, userEmail, stats, onProfileUpdate }: DashboardProfileProps) => {
   const getInitials = (name: string | null) => {
     if (!name) return 'U';
     return name
       .split(' ')
       .map(n => n[0])
       .join('')
       .toUpperCase()
       .slice(0, 2);
   };
 
   return (
     <div className="space-y-6">
       <div>
         <h1 className="text-2xl font-light">Profile</h1>
         <p className="text-muted-foreground mt-1">
           Manage your account settings and preferences
         </p>
       </div>
 
       <div className="grid gap-6 lg:grid-cols-3">
         {/* Profile Card */}
         <Card className="lg:col-span-2">
           <CardContent className="p-6">
             <div className="flex flex-col sm:flex-row items-start gap-6">
               <Avatar className="h-20 w-20">
                 <AvatarFallback className="bg-primary/10 text-primary text-xl font-medium">
                   {getInitials(profile?.full_name)}
                 </AvatarFallback>
               </Avatar>
               
               <div className="flex-1 min-w-0">
                 <h2 className="text-xl font-medium mb-1">
                   {profile?.full_name || 'Your Name'}
                 </h2>
                 <p className="text-muted-foreground flex items-center gap-2">
                   <Mail size={14} />
                   {userEmail}
                 </p>
                 
                 <Separator className="my-4" />
                 
                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                   <div>
                     <p className="text-2xl font-light">{stats.upcomingEvents}</p>
                     <p className="text-xs text-muted-foreground">Upcoming</p>
                   </div>
                   <div>
                     <p className="text-2xl font-light">{stats.pastEvents}</p>
                     <p className="text-xs text-muted-foreground">Attended</p>
                   </div>
                   <div>
                     <p className="text-2xl font-light">{stats.savedEvents}</p>
                     <p className="text-xs text-muted-foreground">Saved</p>
                   </div>
                   <div>
                     <p className="text-2xl font-light">
                       {profile ? format(new Date(profile.created_at), 'yyyy') : '—'}
                     </p>
                     <p className="text-xs text-muted-foreground">Member since</p>
                   </div>
                 </div>
               </div>
             </div>
           </CardContent>
         </Card>
 
         {/* Quick Stats Card */}
         <Card>
           <CardHeader className="pb-3">
             <CardTitle className="text-base font-medium flex items-center gap-2">
               <Award size={16} className="text-primary" />
               Journey Stats
             </CardTitle>
           </CardHeader>
           <CardContent className="space-y-4">
             <div className="flex justify-between items-center">
               <span className="text-sm text-muted-foreground">Total Events</span>
               <span className="font-medium">{stats.upcomingEvents + stats.pastEvents}</span>
             </div>
             <Separator />
             <div className="flex justify-between items-center">
               <span className="text-sm text-muted-foreground">Completion Rate</span>
               <span className="font-medium">
                 {stats.upcomingEvents + stats.pastEvents > 0
                   ? Math.round((stats.pastEvents / (stats.upcomingEvents + stats.pastEvents)) * 100)
                   : 0}%
               </span>
             </div>
             <Separator />
             <div className="flex justify-between items-center">
               <span className="text-sm text-muted-foreground">Member Since</span>
               <span className="font-medium">
                 {profile ? format(new Date(profile.created_at), 'MMM yyyy') : '—'}
               </span>
             </div>
           </CardContent>
         </Card>
       </div>
 
       {/* Edit Profile Section */}
       <Card>
         <CardHeader>
           <CardTitle className="text-base font-medium flex items-center gap-2">
             <Settings size={16} />
             Edit Profile
           </CardTitle>
         </CardHeader>
         <CardContent>
           {profile && (
             <ProfileEditor profile={profile} onUpdate={onProfileUpdate} />
           )}
         </CardContent>
       </Card>
     </div>
   );
 };
 
 export default DashboardProfile;