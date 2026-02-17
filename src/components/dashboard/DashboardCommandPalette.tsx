import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  Calendar,
  Heart,
  User,
  Settings,
  Bell,
  BookOpen,
  Search,
  LogOut,
  HelpCircle,
  FileText,
  Globe,
} from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';

interface DashboardCommandPaletteProps {
  onNavigate: (tab: string) => void;
  onSignOut: () => void;
  isAdmin?: boolean;
}

const DashboardCommandPalette = ({
  onNavigate,
  onSignOut,
  isAdmin,
}: DashboardCommandPaletteProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const run = (fn: () => void) => {
    setOpen(false);
    fn();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search commands, pages, actions…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Dashboard">
          <CommandItem onSelect={() => run(() => onNavigate('overview'))}>
            <Home className="mr-2 h-4 w-4" /> Overview
          </CommandItem>
          <CommandItem onSelect={() => run(() => onNavigate('events'))}>
            <Calendar className="mr-2 h-4 w-4" /> My Events
          </CommandItem>
          <CommandItem onSelect={() => run(() => onNavigate('favorites'))}>
            <Heart className="mr-2 h-4 w-4" /> Saved Events
          </CommandItem>
          <CommandItem onSelect={() => run(() => onNavigate('notifications'))}>
            <Bell className="mr-2 h-4 w-4" /> Notifications
          </CommandItem>
          <CommandItem onSelect={() => run(() => onNavigate('profile'))}>
            <User className="mr-2 h-4 w-4" /> Profile
          </CommandItem>
          <CommandItem onSelect={() => run(() => onNavigate('settings'))}>
            <Settings className="mr-2 h-4 w-4" /> Settings
          </CommandItem>
          <CommandItem onSelect={() => run(() => onNavigate('activity'))}>
            <FileText className="mr-2 h-4 w-4" /> Activity Log
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => run(() => navigate('/'))}>
            <BookOpen className="mr-2 h-4 w-4" /> Home / Codex
          </CommandItem>
          <CommandItem onSelect={() => run(() => navigate('/events'))}>
            <Calendar className="mr-2 h-4 w-4" /> Browse Events
          </CommandItem>
          <CommandItem onSelect={() => run(() => navigate('/resources'))}>
            <HelpCircle className="mr-2 h-4 w-4" /> Resources
          </CommandItem>
          <CommandItem onSelect={() => run(() => navigate('/glossary'))}>
            <Globe className="mr-2 h-4 w-4" /> Glossary
          </CommandItem>
          <CommandItem onSelect={() => run(() => navigate('/about'))}>
            <Search className="mr-2 h-4 w-4" /> About
          </CommandItem>
        </CommandGroup>

        {isAdmin && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Admin">
              <CommandItem onSelect={() => run(() => navigate('/admin'))}>
                <Settings className="mr-2 h-4 w-4" /> Admin Dashboard
              </CommandItem>
            </CommandGroup>
          </>
        )}

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => run(onSignOut)}>
            <LogOut className="mr-2 h-4 w-4" /> Sign Out
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default DashboardCommandPalette;
