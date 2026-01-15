import { useState, useEffect } from 'react';
import { Moon, Sun, BookOpen, Printer } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type ReadingMode = 'default' | 'sepia' | 'dark';

const ReadingModeToggle = () => {
  const [mode, setMode] = useState<ReadingMode>('default');

  useEffect(() => {
    const saved = localStorage.getItem('atlas-reading-mode') as ReadingMode | null;
    if (saved) {
      setMode(saved);
      applyMode(saved);
    }
  }, []);

  const applyMode = (newMode: ReadingMode) => {
    const body = document.body;
    body.classList.remove('reading-mode-sepia', 'reading-mode-dark');
    
    if (newMode === 'sepia') {
      body.classList.add('reading-mode-sepia');
    } else if (newMode === 'dark') {
      body.classList.add('reading-mode-dark');
    }
  };

  const handleModeChange = (newMode: ReadingMode) => {
    setMode(newMode);
    applyMode(newMode);
    localStorage.setItem('atlas-reading-mode', newMode);
  };

  const handlePrint = () => {
    window.print();
  };

  const getModeIcon = () => {
    switch (mode) {
      case 'sepia':
        return <BookOpen className="h-4 w-4" />;
      case 'dark':
        return <Moon className="h-4 w-4" />;
      default:
        return <Sun className="h-4 w-4" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className="h-8 w-8 p-0 reading-mode-toggle"
          aria-label="Reading mode"
        >
          {getModeIcon()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-popover z-50">
        <DropdownMenuItem 
          onClick={() => handleModeChange('default')}
          className={mode === 'default' ? 'bg-muted' : ''}
        >
          <Sun className="h-4 w-4 mr-2" />
          <span>Default Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleModeChange('sepia')}
          className={mode === 'sepia' ? 'bg-muted' : ''}
        >
          <BookOpen className="h-4 w-4 mr-2" />
          <span>Sepia (Eye-friendly)</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleModeChange('dark')}
          className={mode === 'dark' ? 'bg-muted' : ''}
        >
          <Moon className="h-4 w-4 mr-2" />
          <span>Dark Reading</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handlePrint}>
          <Printer className="h-4 w-4 mr-2" />
          <span>Print Codex</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ReadingModeToggle;
