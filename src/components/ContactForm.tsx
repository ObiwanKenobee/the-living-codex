import { useState } from 'react';
import { Send, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all fields.',
        variant: 'destructive',
      });
      return;
    }

    if (!email.includes('@')) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact', {
        body: formData,
      });

      if (error) throw error;

      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      toast({
        title: 'Message sent',
        description: 'We have received your correspondence.',
      });
    } catch (error: any) {
      console.error('Contact form error:', error);
      toast({
        title: 'Failed to send',
        description: error.message || 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="p-8 border divider bg-card text-center">
        <div className="flex items-center justify-center gap-2 mb-4 text-primary">
          <Check size={20} />
          <span className="font-sans-nav text-sm tracking-wider">Message Received</span>
        </div>
        <p className="text-sm text-muted-foreground">
          We read everything carefully. If your inquiry requires a response, we will be in touch.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="mt-6 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 border divider bg-card space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block font-sans-nav text-xs text-muted-foreground tracking-wider mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-muted/30 border divider text-sm placeholder:text-muted-foreground focus:outline-none focus:border-foreground/30 transition-colors"
            disabled={isSubmitting}
            maxLength={100}
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-sans-nav text-xs text-muted-foreground tracking-wider mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-muted/30 border divider text-sm placeholder:text-muted-foreground focus:outline-none focus:border-foreground/30 transition-colors"
            disabled={isSubmitting}
            maxLength={255}
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block font-sans-nav text-xs text-muted-foreground tracking-wider mb-2">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-muted/30 border divider text-sm focus:outline-none focus:border-foreground/30 transition-colors"
          disabled={isSubmitting}
        >
          <option value="">Select a subject</option>
          <option value="General Inquiry">General Inquiry</option>
          <option value="Research Collaboration">Research Collaboration</option>
          <option value="Speaking Request">Speaking Request</option>
          <option value="Media Inquiry">Media Inquiry</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block font-sans-nav text-xs text-muted-foreground tracking-wider mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          className="w-full px-4 py-3 bg-muted/30 border divider text-sm placeholder:text-muted-foreground focus:outline-none focus:border-foreground/30 transition-colors resize-none"
          disabled={isSubmitting}
          maxLength={2000}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-foreground text-background font-sans-nav text-xs tracking-wider hover:bg-foreground/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          'Sending...'
        ) : (
          <>
            <span>Send Message</span>
            <Send size={14} />
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
