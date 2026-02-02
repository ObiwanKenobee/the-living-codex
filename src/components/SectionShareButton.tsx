import { useState } from 'react';
import { Share2, Check, Link, Twitter, Linkedin } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface SectionShareButtonProps {
  sectionId: string;
  sectionTitle: string;
}

const SectionShareButton = ({ sectionId, sectionTitle }: SectionShareButtonProps) => {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/#${sectionId}`;
  };

  const handleCopyLink = async () => {
    const url = getShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success('Link copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const handleTwitterShare = () => {
    const url = getShareUrl();
    const text = `Check out "${sectionTitle}" from The Atlas Codex`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      '_blank'
    );
  };

  const handleLinkedInShare = () => {
    const url = getShareUrl();
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      '_blank'
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
          aria-label={`Share ${sectionTitle}`}
        >
          <Share2 size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer">
          {copied ? <Check size={16} className="mr-2" /> : <Link size={16} className="mr-2" />}
          {copied ? 'Copied!' : 'Copy link'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleTwitterShare} className="cursor-pointer">
          <Twitter size={16} className="mr-2" />
          Share on X
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLinkedInShare} className="cursor-pointer">
          <Linkedin size={16} className="mr-2" />
          Share on LinkedIn
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SectionShareButton;
