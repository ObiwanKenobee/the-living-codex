import { formatDistanceToNow } from 'date-fns';
import {
  Calendar,
  Heart,
  User,
  Settings,
  Bell,
  LogIn,
  FileText,
  Activity,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useActivityLog, ActivityEntry } from '@/hooks/useActivityLog';

interface DashboardActivityFeedProps {
  userId?: string;
  limit?: number;
}

const actionConfig: Record<string, { icon: React.ElementType; label: string; color: string }> = {
  'event.register': { icon: Calendar, label: 'Registered for event', color: 'text-primary' },
  'event.favorite': { icon: Heart, label: 'Saved event', color: 'text-pink-500' },
  'event.unfavorite': { icon: Heart, label: 'Unsaved event', color: 'text-muted-foreground' },
  'profile.update': { icon: User, label: 'Updated profile', color: 'text-blue-500' },
  'settings.update': { icon: Settings, label: 'Changed settings', color: 'text-muted-foreground' },
  'notification.read': { icon: Bell, label: 'Read notification', color: 'text-muted-foreground' },
  'auth.login': { icon: LogIn, label: 'Signed in', color: 'text-green-500' },
  'bookmark.add': { icon: FileText, label: 'Bookmarked section', color: 'text-amber-500' },
};

const getConfig = (action: string) =>
  actionConfig[action] || { icon: Activity, label: action, color: 'text-muted-foreground' };

const DashboardActivityFeed = ({ userId, limit = 10 }: DashboardActivityFeedProps) => {
  const { activities, isLoading } = useActivityLog(userId);
  const displayActivities = activities.slice(0, limit);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start gap-3">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <div className="flex-1">
                <Skeleton className="h-4 w-3/4 mb-1" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <Activity size={16} className="text-primary" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        {displayActivities.length === 0 ? (
          <div className="text-center py-8">
            <Activity className="w-10 h-10 mx-auto mb-3 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">No activity yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Your actions will appear here as you explore
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {displayActivities.map((entry, idx) => {
              const config = getConfig(entry.action);
              const Icon = config.icon;
              const entityName = (entry.metadata as any)?.name || entry.entity_id || '';
              return (
                <div
                  key={entry.id}
                  className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className="p-1.5 rounded-md bg-muted/50 mt-0.5">
                    <Icon size={14} className={config.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{config.label}</span>
                      {entityName && (
                        <span className="text-muted-foreground"> · {entityName}</span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(entry.created_at), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardActivityFeed;
