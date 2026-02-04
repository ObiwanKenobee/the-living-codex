import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import SectionBookmarkButton from './SectionBookmarkButton';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  variant?: 'default' | 'card' | 'minimal';
  sectionId?: string;
  parentSection?: string;
}

const CollapsibleSection = ({ 
  title, 
  children, 
  defaultOpen = false,
  variant = 'default',
  sectionId,
  parentSection
}: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const variantStyles = {
    default: {
      trigger: 'flex-1 flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors',
      wrapper: 'w-full flex items-center border divider',
      content: 'p-4 border-x border-b divider'
    },
    card: {
      trigger: 'flex-1 flex items-center justify-between p-4 bg-card hover:bg-muted/30 transition-colors',
      wrapper: 'w-full flex items-center border divider',
      content: 'p-4 bg-background border-x border-b divider'
    },
    minimal: {
      trigger: 'flex-1 flex items-center justify-between py-3 hover:text-primary transition-colors',
      wrapper: 'w-full flex items-center border-b divider',
      content: 'py-4'
    }
  };

  const styles = variantStyles[variant];

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className={styles.wrapper}>
        <CollapsibleTrigger className={styles.trigger}>
          <span className="font-medium text-sm text-left">{title}</span>
          <ChevronDown 
            className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </CollapsibleTrigger>
        {sectionId && parentSection && (
          <div className="px-2 border-l divider">
            <SectionBookmarkButton
              sectionId={sectionId}
              sectionTitle={title}
              parentSection={parentSection}
            />
          </div>
        )}
      </div>
      <CollapsibleContent className={styles.content}>
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CollapsibleSection;
