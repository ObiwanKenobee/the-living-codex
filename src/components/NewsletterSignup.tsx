import { useState } from 'react';
import { Send, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate subscription (replace with actual API call when backend is connected)
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubscribed(true);
    setEmail('');

    toast({
      title: 'Subscribed',
      description: 'You will receive updates as understanding develops.',
    });
  };

  if (isSubscribed) {
    return (
      <div className="flex items-center justify-center gap-2 py-3 text-primary">
        <Check size={16} />
        <span className="font-sans-nav text-xs tracking-wider">Subscribed to updates</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="flex-1 px-4 py-2.5 bg-muted/30 border divider text-sm placeholder:text-muted-foreground focus:outline-none focus:border-foreground/30 transition-colors"
        disabled={isSubmitting}
        maxLength={255}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-6 py-2.5 bg-foreground text-background font-sans-nav text-xs tracking-wider hover:bg-foreground/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          'Subscribing...'
        ) : (
          <>
            <span>Subscribe</span>
            <Send size={12} />
          </>
        )}
      </button>
    </form>
  );
};

export default NewsletterSignup;
