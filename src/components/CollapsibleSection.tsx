import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  variant?: 'default' | 'card' | 'minimal';
}

const CollapsibleSection = ({ 
  title, 
  children, 
  defaultOpen = false,
  variant = 'default' 
}: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const variantStyles = {
    default: {
      trigger: 'w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 border divider transition-colors',
      content: 'p-4 border-x border-b divider'
    },
    card: {
      trigger: 'w-full flex items-center justify-between p-4 bg-card hover:bg-muted/30 border divider transition-colors',
      content: 'p-4 bg-background border-x border-b divider'
    },
    minimal: {
      trigger: 'w-full flex items-center justify-between py-3 border-b divider hover:text-primary transition-colors',
      content: 'py-4'
    }
  };

  const styles = variantStyles[variant];

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className={styles.trigger}>
        <span className="font-medium text-sm text-left">{title}</span>
        <ChevronDown 
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className={styles.content}>
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CollapsibleSection;
