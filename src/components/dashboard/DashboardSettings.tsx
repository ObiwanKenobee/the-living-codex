import { Bell, Mail, Shield, Globe, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUserPreferences } from '@/hooks/useUserPreferences';

interface DashboardSettingsProps {
  userId?: string;
}

const DashboardSettings = ({ userId }: DashboardSettingsProps) => {
  const { preferences, isLoading, updatePreferences, isUpdating } = useUserPreferences(userId);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="grid gap-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account preferences
          </p>
        </div>
        {isUpdating && (
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Loader2 size={14} className="animate-spin" />
            Saving...
          </div>
        )}
      </div>

      <div className="grid gap-6">
        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell size={18} className="text-primary" />
              <CardTitle className="text-lg">Notifications</CardTitle>
            </div>
            <CardDescription>
              Choose what updates you'd like to receive
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications" className="text-sm font-medium">
                  Email Notifications
                </Label>
                <p className="text-xs text-muted-foreground">
                  Receive updates about your event registrations
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={preferences.email_notifications}
                onCheckedChange={(checked) => updatePreferences({ email_notifications: checked })}
                disabled={isUpdating}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="event-reminders" className="text-sm font-medium">
                  Event Reminders
                </Label>
                <p className="text-xs text-muted-foreground">
                  Get reminded 24 hours before your registered events
                </p>
              </div>
              <Switch
                id="event-reminders"
                checked={preferences.event_reminders}
                onCheckedChange={(checked) => updatePreferences({ event_reminders: checked })}
                disabled={isUpdating}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="newsletter" className="text-sm font-medium">
                  Newsletter Updates
                </Label>
                <p className="text-xs text-muted-foreground">
                  Stay informed about Atlas Codex news and content
                </p>
              </div>
              <Switch
                id="newsletter"
                checked={preferences.newsletter_updates}
                onCheckedChange={(checked) => updatePreferences({ newsletter_updates: checked })}
                disabled={isUpdating}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield size={18} className="text-primary" />
              <CardTitle className="text-lg">Privacy</CardTitle>
            </div>
            <CardDescription>
              Control your profile visibility and data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Globe size={14} className="text-muted-foreground" />
                  <Label className="text-sm font-medium">Profile Visibility</Label>
                </div>
                <p className="text-xs text-muted-foreground">
                  Control who can see your profile information
                </p>
              </div>
              <Select
                value={preferences.profile_visibility}
                onValueChange={(value: 'public' | 'private') => 
                  updatePreferences({ profile_visibility: value })
                }
                disabled={isUpdating}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail size={18} className="text-primary" />
              <CardTitle className="text-lg">Account</CardTitle>
            </div>
            <CardDescription>
              Manage your account settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              To update your email address or password, please contact support.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardSettings;
