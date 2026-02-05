 import { Link, useLocation } from 'react-router-dom';
 import { 
   Calendar, 
   Heart, 
   User, 
   Settings, 
   BookOpen,
   Home,
   Bell,
   HelpCircle,
   LogOut,
   ChevronLeft,
   ChevronRight
 } from 'lucide-react';
 import { cn } from '@/lib/utils';
 import { Button } from '@/components/ui/button';
 import { Avatar, AvatarFallback } from '@/components/ui/avatar';
 import { Separator } from '@/components/ui/separator';
 import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
 } from '@/components/ui/tooltip';
 
 interface DashboardSidebarProps {
   collapsed: boolean;
   onToggle: () => void;
   userName: string;
   userEmail: string;
   activeTab: string;
   onTabChange: (tab: string) => void;
   onSignOut: () => void;
   stats: {
     upcomingEvents: number;
     savedEvents: number;
     pastEvents: number;
   };
 }
 
 const mainNavItems = [
   { id: 'overview', label: 'Overview', icon: Home },
   { id: 'events', label: 'My Events', icon: Calendar },
   { id: 'favorites', label: 'Saved Events', icon: Heart },
   { id: 'notifications', label: 'Notifications', icon: Bell },
 ];
 
 const secondaryNavItems = [
   { id: 'profile', label: 'Profile', icon: User },
   { id: 'settings', label: 'Settings', icon: Settings },
 ];
 
 const DashboardSidebar = ({
   collapsed,
   onToggle,
   userName,
   userEmail,
   activeTab,
   onTabChange,
   onSignOut,
   stats,
 }: DashboardSidebarProps) => {
   const getInitials = (name: string) => {
     return name
       .split(' ')
       .map(n => n[0])
       .join('')
       .toUpperCase()
       .slice(0, 2);
   };
 
   const NavItem = ({ item, badge }: { item: typeof mainNavItems[0]; badge?: number }) => {
     const isActive = activeTab === item.id;
     const Icon = item.icon;
 
     const content = (
       <button
         onClick={() => onTabChange(item.id)}
         className={cn(
           'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
           'hover:bg-accent/50',
           isActive && 'bg-primary/10 text-primary border border-primary/20',
           !isActive && 'text-muted-foreground hover:text-foreground'
         )}
       >
         <Icon size={18} className={cn(isActive && 'text-primary')} />
         {!collapsed && (
           <>
             <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
             {badge !== undefined && badge > 0 && (
               <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary font-medium">
                 {badge}
               </span>
             )}
           </>
         )}
       </button>
     );
 
     if (collapsed) {
       return (
         <Tooltip>
           <TooltipTrigger asChild>{content}</TooltipTrigger>
           <TooltipContent side="right" sideOffset={10}>
             <p>{item.label}</p>
             {badge !== undefined && badge > 0 && (
               <span className="ml-2 text-xs text-primary">({badge})</span>
             )}
           </TooltipContent>
         </Tooltip>
       );
     }
 
     return content;
   };
 
   return (
     <aside
       className={cn(
         'fixed left-0 top-0 h-screen bg-card border-r border-border z-40 transition-all duration-300 flex flex-col',
         collapsed ? 'w-16' : 'w-64'
       )}
     >
       {/* Header */}
       <div className={cn(
         'flex items-center h-16 px-4 border-b border-border',
         collapsed ? 'justify-center' : 'justify-between'
       )}>
         {!collapsed && (
           <Link to="/" className="flex items-center gap-2 group">
             <BookOpen size={20} className="text-primary" />
             <span className="font-sans-nav text-sm tracking-wider group-hover:text-primary transition-colors">
               Atlas Codex
             </span>
           </Link>
         )}
         {collapsed && (
           <Link to="/">
             <BookOpen size={20} className="text-primary" />
           </Link>
         )}
         <Button
           variant="ghost"
           size="icon"
           onClick={onToggle}
           className={cn('h-8 w-8', collapsed && 'absolute -right-3 bg-card border border-border rounded-full shadow-sm')}
         >
           {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
         </Button>
       </div>
 
       {/* User Profile Section */}
       <div className={cn(
         'p-4 border-b border-border',
         collapsed && 'flex justify-center'
       )}>
         {collapsed ? (
           <Tooltip>
             <TooltipTrigger>
               <Avatar className="h-10 w-10">
                 <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                   {getInitials(userName || 'U')}
                 </AvatarFallback>
               </Avatar>
             </TooltipTrigger>
             <TooltipContent side="right" sideOffset={10}>
               <p className="font-medium">{userName}</p>
               <p className="text-xs text-muted-foreground">{userEmail}</p>
             </TooltipContent>
           </Tooltip>
         ) : (
           <div className="flex items-center gap-3">
             <Avatar className="h-10 w-10">
               <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                 {getInitials(userName || 'U')}
               </AvatarFallback>
             </Avatar>
             <div className="flex-1 min-w-0">
               <p className="text-sm font-medium truncate">{userName}</p>
               <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
             </div>
           </div>
         )}
       </div>
 
       {/* Main Navigation */}
       <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
         <div className="space-y-1">
           {!collapsed && (
             <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
               Main
             </p>
           )}
           <NavItem item={mainNavItems[0]} />
           <NavItem item={mainNavItems[1]} badge={stats.upcomingEvents} />
           <NavItem item={mainNavItems[2]} badge={stats.savedEvents} />
           <NavItem item={mainNavItems[3]} />
         </div>
 
         <Separator className="my-4" />
 
         <div className="space-y-1">
           {!collapsed && (
             <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
               Account
             </p>
           )}
           {secondaryNavItems.map((item) => (
             <NavItem key={item.id} item={item} />
           ))}
         </div>
       </nav>
 
       {/* Footer */}
       <div className="p-3 border-t border-border space-y-1">
         {!collapsed ? (
           <>
             <Link
               to="/resources"
               className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
             >
               <HelpCircle size={18} />
               <span className="text-sm">Help & Resources</span>
             </Link>
             <button
               onClick={onSignOut}
               className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
             >
               <LogOut size={18} />
               <span className="text-sm">Sign Out</span>
             </button>
           </>
         ) : (
           <>
             <Tooltip>
               <TooltipTrigger asChild>
                 <Link
                   to="/resources"
                   className="flex justify-center py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                 >
                   <HelpCircle size={18} />
                 </Link>
               </TooltipTrigger>
               <TooltipContent side="right">Help & Resources</TooltipContent>
             </Tooltip>
             <Tooltip>
               <TooltipTrigger asChild>
                 <button
                   onClick={onSignOut}
                   className="w-full flex justify-center py-2.5 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
                 >
                   <LogOut size={18} />
                 </button>
               </TooltipTrigger>
               <TooltipContent side="right">Sign Out</TooltipContent>
             </Tooltip>
           </>
         )}
       </div>
     </aside>
   );
 };
 
 export default DashboardSidebar;