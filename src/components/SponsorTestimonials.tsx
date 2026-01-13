import { useQuery } from '@tanstack/react-query';
import { Quote } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Testimonial {
  id: string;
  quote: string;
  author_name: string;
  author_role: string;
  company_name: string;
  tier: string;
}

const tierColors: Record<string, string> = {
  Gold: 'bg-gradient-to-r from-amber-400 to-amber-600',
  Silver: 'bg-gradient-to-r from-slate-400 to-slate-600',
  Bronze: 'bg-gradient-to-r from-orange-600 to-orange-800',
  'Bronze → Gold': 'bg-gradient-to-r from-orange-600 to-amber-500',
};

const SponsorTestimonials = () => {
  const { data: testimonials, isLoading } = useQuery({
    queryKey: ['sponsor-testimonials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sponsor_testimonials')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data as Testimonial[];
    },
  });

  if (isLoading) {
    return (
      <section className="border-t border-border pt-16 mb-16">
        <div className="text-center text-muted-foreground">Loading testimonials...</div>
      </section>
    );
  }

  if (!testimonials || testimonials.length === 0) {
    return null; // Don't show section if no testimonials
  }

  return (
    <section className="border-t border-border pt-16 mb-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-light mb-2">What Our Partners Say</h2>
        <p className="text-muted-foreground">
          Hear from organizations that have partnered with us
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="relative bg-card border border-border rounded-lg p-6 transition-all duration-300 hover:shadow-lg"
          >
            <Quote className="absolute top-4 right-4 h-8 w-8 text-muted-foreground/20" />
            
            <blockquote className="text-foreground mb-6 relative z-10">
              "{testimonial.quote}"
            </blockquote>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-lg font-medium text-muted-foreground">
                {testimonial.author_name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <div className="font-medium text-foreground">{testimonial.author_name}</div>
                <div className="text-sm text-muted-foreground">
                  {testimonial.author_role}, {testimonial.company_name}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <span
                className={`inline-block text-xs text-white px-3 py-1 rounded-full ${tierColors[testimonial.tier] || 'bg-primary'}`}
              >
                {testimonial.tier} Sponsor
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SponsorTestimonials;
