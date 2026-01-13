import { useQuery } from '@tanstack/react-query';
import { ExternalLink, Award, Star, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface Partner {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  tier: string;
}

const tierConfig: Record<string, { icon: React.ReactNode; color: string; order: number }> = {
  gold: { 
    icon: <Zap className="h-6 w-6" />, 
    color: 'from-amber-400 to-amber-600',
    order: 1
  },
  silver: { 
    icon: <Star className="h-6 w-6" />, 
    color: 'from-slate-400 to-slate-600',
    order: 2
  },
  bronze: { 
    icon: <Award className="h-6 w-6" />, 
    color: 'from-orange-600 to-orange-800',
    order: 3
  },
};

const SponsorsPage = () => {
  const { data: partners, isLoading } = useQuery({
    queryKey: ['sponsors-page-partners'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data as Partner[];
    },
  });

  // Group partners by tier
  const partnersByTier = partners?.reduce((acc, partner) => {
    const tier = partner.tier?.toLowerCase() || 'bronze';
    if (!acc[tier]) acc[tier] = [];
    acc[tier].push(partner);
    return acc;
  }, {} as Record<string, Partner[]>) || {};

  // Sort tiers by order
  const sortedTiers = Object.keys(partnersByTier).sort((a, b) => {
    const orderA = tierConfig[a]?.order || 99;
    const orderB = tierConfig[b]?.order || 99;
    return orderA - orderB;
  });

  const trackClick = async (partnerId: string) => {
    try {
      await supabase.from('partner_analytics').insert({
        partner_id: partnerId,
        event_type: 'click',
        referrer: window.location.href,
        user_agent: navigator.userAgent,
      });
    } catch (error) {
      console.error('Failed to track click:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-light mb-4">
              Our Sponsors & Partners
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              We're grateful to these organizations for their support in advancing our mission.
              Their partnership makes our work possible.
            </p>
            <Link to="/sponsorship">
              <Button variant="outline">
                Become a Sponsor
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">
              Loading sponsors...
            </div>
          ) : sortedTiers.length === 0 ? (
            <div className="text-center py-16 border border-dashed rounded-lg">
              <p className="text-muted-foreground mb-4">No sponsors yet</p>
              <Link to="/sponsorship">
                <Button>Be our first sponsor</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-16">
              {sortedTiers.map((tier) => {
                const config = tierConfig[tier] || tierConfig.bronze;
                const tierPartners = partnersByTier[tier];

                return (
                  <section key={tier}>
                    {/* Tier Header */}
                    <div className="flex items-center justify-center gap-3 mb-8">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${config.color} text-white`}>
                        {config.icon}
                      </div>
                      <h2 className="text-2xl font-light capitalize">{tier} Sponsors</h2>
                    </div>

                    {/* Partners Grid */}
                    <div className={`grid gap-6 ${
                      tier === 'gold' 
                        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                        : tier === 'silver'
                        ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                        : 'grid-cols-3 md:grid-cols-4 lg:grid-cols-6'
                    }`}>
                      {tierPartners.map((partner) => (
                        <a
                          key={partner.id}
                          href={partner.website_url || '#'}
                          target={partner.website_url ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          onClick={() => trackClick(partner.id)}
                          className={`group relative bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/30 ${
                            tier === 'gold' ? 'p-8' : tier === 'silver' ? 'p-6' : 'p-4'
                          }`}
                        >
                          {/* Logo */}
                          <div className={`flex items-center justify-center mb-4 ${
                            tier === 'gold' ? 'h-24' : tier === 'silver' ? 'h-16' : 'h-12'
                          }`}>
                            {partner.logo_url ? (
                              <img
                                src={partner.logo_url}
                                alt={partner.name}
                                className="max-h-full max-w-full object-contain"
                              />
                            ) : (
                              <div className={`bg-muted rounded-lg flex items-center justify-center text-muted-foreground font-medium ${
                                tier === 'gold' ? 'w-24 h-24 text-2xl' : tier === 'silver' ? 'w-16 h-16 text-lg' : 'w-12 h-12 text-sm'
                              }`}>
                                {partner.name.substring(0, 2).toUpperCase()}
                              </div>
                            )}
                          </div>

                          {/* Name */}
                          <div className="text-center">
                            <h3 className={`font-medium text-foreground group-hover:text-primary transition-colors ${
                              tier === 'gold' ? 'text-lg' : tier === 'silver' ? 'text-base' : 'text-sm'
                            }`}>
                              {partner.name}
                            </h3>
                          </div>

                          {/* External Link Icon */}
                          {partner.website_url && (
                            <ExternalLink 
                              className="absolute top-3 right-3 h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" 
                            />
                          )}
                        </a>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-20 text-center border-t border-border pt-16">
            <h2 className="text-2xl font-light mb-4">Join Our Partner Network</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Interested in becoming a sponsor? We offer flexible partnership tiers 
              to match your organization's goals and budget.
            </p>
            <Link to="/sponsorship">
              <Button size="lg">
                View Sponsorship Tiers
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SponsorsPage;
