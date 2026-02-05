 import { Settings, Bell, Eye, Moon, Shield } from 'lucide-react';
 import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
 import { Switch } from '@/components/ui/switch';
 import { Label } from '@/components/ui/label';
 import { Separator } from '@/components/ui/separator';
 
 const DashboardSettings = () => {
   return (
     <div className="space-y-6">
       <div>
         <h1 className="text-2xl font-light">Settings</h1>
         <p className="text-muted-foreground mt-1">
           Customize your experience and preferences
         </p>
       </div>
 
       <div className="grid gap-6">
         {/* Notifications Settings */}
         <Card>
           <CardHeader>
             <CardTitle className="text-base font-medium flex items-center gap-2">
               <Bell size={16} />
               Notifications
             </CardTitle>
             <CardDescription>
               Choose how you want to be notified
             </CardDescription>
           </CardHeader>
           <CardContent className="space-y-4">
             <div className="flex items-center justify-between">
               <div className="space-y-0.5">
                 <Label>Email notifications</Label>
                 <p className="text-xs text-muted-foreground">
                   Receive updates about events via email
                 </p>
               </div>
               <Switch defaultChecked />
             </div>
             <Separator />
             <div className="flex items-center justify-between">
               <div className="space-y-0.5">
                 <Label>Event reminders</Label>
                 <p className="text-xs text-muted-foreground">
                   Get reminded before your registered events
                 </p>
               </div>
               <Switch defaultChecked />
             </div>
             <Separator />
             <div className="flex items-center justify-between">
               <div className="space-y-0.5">
                 <Label>Newsletter</Label>
                 <p className="text-xs text-muted-foreground">
                   Receive our monthly newsletter
                 </p>
               </div>
               <Switch />
             </div>
           </CardContent>
         </Card>
 
         {/* Privacy Settings */}
         <Card>
           <CardHeader>
             <CardTitle className="text-base font-medium flex items-center gap-2">
               <Shield size={16} />
               Privacy
             </CardTitle>
             <CardDescription>
               Manage your privacy preferences
             </CardDescription>
           </CardHeader>
           <CardContent className="space-y-4">
             <div className="flex items-center justify-between">
               <div className="space-y-0.5">
                 <Label>Profile visibility</Label>
                 <p className="text-xs text-muted-foreground">
                   Allow others to see your profile
                 </p>
               </div>
               <Switch />
             </div>
             <Separator />
             <div className="flex items-center justify-between">
               <div className="space-y-0.5">
                 <Label>Show activity</Label>
                 <p className="text-xs text-muted-foreground">
                   Display your event attendance publicly
                 </p>
               </div>
               <Switch />
             </div>
           </CardContent>
         </Card>
 
         {/* Appearance Settings */}
         <Card>
           <CardHeader>
             <CardTitle className="text-base font-medium flex items-center gap-2">
               <Eye size={16} />
               Appearance
             </CardTitle>
             <CardDescription>
               Customize how the dashboard looks
             </CardDescription>
           </CardHeader>
           <CardContent className="space-y-4">
             <div className="flex items-center justify-between">
               <div className="space-y-0.5">
                 <Label>Compact mode</Label>
                 <p className="text-xs text-muted-foreground">
                   Use a more condensed layout
                 </p>
               </div>
               <Switch />
             </div>
             <Separator />
             <div className="flex items-center justify-between">
               <div className="space-y-0.5">
                 <Label>Animations</Label>
                 <p className="text-xs text-muted-foreground">
                   Enable smooth transitions and animations
                 </p>
               </div>
               <Switch defaultChecked />
             </div>
           </CardContent>
         </Card>
       </div>
     </div>
   );
 };
 
 export default DashboardSettings;