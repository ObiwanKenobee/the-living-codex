import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Check, Award, Star, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import SponsorshipApplicationForm from '@/components/SponsorshipApplicationForm';
import SponsorTestimonials from '@/components/SponsorTestimonials';

interface SponsorshipTier {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string | null;
  features: string[];
  display_order: number;
  is_highlighted: boolean;
}

const tierIcons: Record<string, React.ReactNode> = {
  bronze: <Award className="h-8 w-8" />,
  silver: <Star className="h-8 w-8" />,
  gold: <Zap className="h-8 w-8" />,
};

const tierColors: Record<string, string> = {
  bronze: 'from-orange-600 to-orange-800',
  silver: 'from-slate-400 to-slate-600',
  gold: 'from-amber-400 to-amber-600',
};

const SponsorshipPage = () => {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { data: tiers, isLoading } = useQuery({
    queryKey: ['sponsorship-tiers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sponsorship_tiers')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data as SponsorshipTier[];
    },
  });

  const handleApply = (tierName: string) => {
    setSelectedTier(tierName);
    setShowForm(true);
    setTimeout(() => {
      document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-light mb-4">
              Partner With Us
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join our community of sponsors and partners. Choose a tier that aligns with your goals
              and gain visibility while supporting our mission.
            </p>
          </div>

          {/* Pricing Cards */}
          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">
              Loading pricing...
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {tiers?.map((tier) => {
                const tierKey = tier.name.toLowerCase();
                const icon = tierIcons[tierKey] || <Star className="h-8 w-8" />;
                const accentClass = tierColors[tierKey] || 'from-primary to-primary/80';

                return (
                  <div
                    key={tier.id}
                    className={`relative rounded-lg border bg-card overflow-hidden transition-all duration-300 hover:shadow-lg ${
                      tier.is_highlighted ? 'border-primary ring-2 ring-primary/20' : 'border-border'
                    }`}
                  >
                    {tier.is_highlighted && (
                      <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center text-xs py-1 uppercase tracking-wider font-medium">
                        Most Popular
                      </div>
                    )}
                    
                    <div className={`p-6 ${tier.is_highlighted ? 'pt-10' : ''}`}>
                      {/* Icon & Name */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${accentClass} text-white`}>
                          {icon}
                        </div>
                        <h2 className="text-2xl font-light">{tier.name}</h2>
                      </div>

                      {/* Price */}
                      <div className="mb-4">
                        <span className="text-4xl font-light">${tier.price.toLocaleString()}</span>
                        <span className="text-muted-foreground">{tier.period}</span>
                      </div>

                      {/* Description */}
                      {tier.description && (
                        <p className="text-sm text-muted-foreground mb-6">
                          {tier.description}
                        </p>
                      )}

                      {/* Features */}
                      <ul className="space-y-3 mb-6">
                        {tier.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <Button
                        className="w-full"
                        variant={tier.is_highlighted ? 'default' : 'outline'}
                        onClick={() => handleApply(tier.name)}
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Testimonials Section */}
          <SponsorTestimonials />

          {/* Benefits Section */}
          <div className="text-center border-t border-border pt-16 mb-16">
            <h2 className="text-2xl font-light mb-8">Why Partner With Us?</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-light text-primary mb-2">10K+</div>
                <p className="text-sm text-muted-foreground">Monthly Website Visitors</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light text-primary mb-2">5K+</div>
                <p className="text-sm text-muted-foreground">Newsletter Subscribers</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light text-primary mb-2">20+</div>
                <p className="text-sm text-muted-foreground">Annual Events</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light text-primary mb-2">50+</div>
                <p className="text-sm text-muted-foreground">Community Partners</p>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div id="application-form" className="max-w-2xl mx-auto">
            {showForm ? (
              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="text-2xl font-light mb-2 text-center">Apply for Sponsorship</h2>
                <p className="text-muted-foreground text-center mb-8">
                  Fill out the form below and our team will get back to you within 2-3 business days.
                </p>
                <SponsorshipApplicationForm
                  tiers={tiers?.map(t => ({ name: t.name, price: t.price })) || []}
                  preselectedTier={selectedTier || undefined}
                />
              </div>
            ) : (
              <div className="text-center bg-muted/30 rounded-lg p-8">
                <h2 className="text-xl font-light mb-2">Ready to become a sponsor?</h2>
                <p className="text-muted-foreground mb-4">
                  Select a tier above or start your application now.
                </p>
                <Button onClick={() => setShowForm(true)}>
                  Start Application
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SponsorshipPage;
