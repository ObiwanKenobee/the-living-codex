import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  company_name: z.string().min(2, 'Company name is required'),
  contact_name: z.string().min(2, 'Contact name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  website_url: z.string().url('Valid URL required').optional().or(z.literal('')),
  preferred_tier: z.string().min(1, 'Please select a tier'),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface SponsorshipApplicationFormProps {
  tiers: { name: string; price: number }[];
  preselectedTier?: string;
}

const SponsorshipApplicationForm = ({ tiers, preselectedTier }: SponsorshipApplicationFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      preferred_tier: preselectedTier || '',
    },
  });

  const selectedTier = watch('preferred_tier');

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('sponsorship_applications').insert({
        company_name: data.company_name,
        contact_name: data.contact_name,
        email: data.email,
        phone: data.phone || null,
        website_url: data.website_url || null,
        preferred_tier: data.preferred_tier,
        message: data.message || null,
      });

      if (error) throw error;

      // Send email notification
      try {
        await supabase.functions.invoke('send-sponsorship-notification', {
          body: {
            company_name: data.company_name,
            contact_name: data.contact_name,
            email: data.email,
            phone: data.phone,
            website_url: data.website_url,
            preferred_tier: data.preferred_tier,
            message: data.message,
          },
        });
      } catch (emailError) {
        console.error('Failed to send notification email:', emailError);
        // Don't fail the submission if email fails
      }

      setIsSubmitted(true);
      toast({
        title: 'Application Submitted',
        description: 'We\'ll be in touch soon to discuss your sponsorship.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to submit application',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
        <h3 className="text-2xl font-light mb-2">Application Received!</h3>
        <p className="text-muted-foreground">
          Thank you for your interest. Our team will review your application and contact you within 2-3 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="company_name">Company Name *</Label>
          <Input
            id="company_name"
            {...register('company_name')}
            placeholder="Your organization name"
          />
          {errors.company_name && (
            <p className="text-sm text-destructive mt-1">{errors.company_name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="contact_name">Contact Name *</Label>
          <Input
            id="contact_name"
            {...register('contact_name')}
            placeholder="Your full name"
          />
          {errors.contact_name && (
            <p className="text-sm text-destructive mt-1">{errors.contact_name.message}</p>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="you@company.com"
          />
          {errors.email && (
            <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            {...register('phone')}
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="website_url">Website</Label>
        <Input
          id="website_url"
          {...register('website_url')}
          placeholder="https://yourcompany.com"
        />
        {errors.website_url && (
          <p className="text-sm text-destructive mt-1">{errors.website_url.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="preferred_tier">Preferred Tier *</Label>
        <Select
          value={selectedTier}
          onValueChange={(value) => setValue('preferred_tier', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a sponsorship tier" />
          </SelectTrigger>
          <SelectContent>
            {tiers.map((tier) => (
              <SelectItem key={tier.name} value={tier.name}>
                {tier.name} (${tier.price.toLocaleString()}/year)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.preferred_tier && (
          <p className="text-sm text-destructive mt-1">{errors.preferred_tier.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="message">Additional Information</Label>
        <Textarea
          id="message"
          {...register('message')}
          placeholder="Tell us about your organization and why you're interested in sponsoring..."
          rows={4}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        <Send size={16} className="mr-2" />
        {isSubmitting ? 'Submitting...' : 'Submit Application'}
      </Button>
    </form>
  );
};

export default SponsorshipApplicationForm;
