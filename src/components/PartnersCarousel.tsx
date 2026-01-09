import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

type PartnerTier = 'gold' | 'silver' | 'bronze';

interface Partner {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  tier: PartnerTier;
}

const tierOrder: Record<PartnerTier, number> = {
  gold: 1,
  silver: 2,
  bronze: 3,
};

const tierLabels: Record<PartnerTier, string> = {
  gold: 'Gold Partners',
  silver: 'Silver Partners',
  bronze: 'Bronze Partners',
};

const PartnersCarousel = () => {
  const [position, setPosition] = useState(0);

  const { data: partners = [] } = useQuery({
    queryKey: ['partners'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('partners')
        .select('id, name, logo_url, website_url, tier')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data as Partner[];
    },
  });

  // Group partners by tier
  const partnersByTier = partners.reduce((acc, partner) => {
    const tier = partner.tier || 'silver';
    if (!acc[tier]) acc[tier] = [];
    acc[tier].push(partner);
    return acc;
  }, {} as Record<PartnerTier, Partner[]>);

  // Get sorted tiers that have partners
  const tiersWithPartners = (['gold', 'silver', 'bronze'] as PartnerTier[])
    .filter(tier => partnersByTier[tier]?.length > 0);

  useEffect(() => {
    if (partners.length === 0) return;
    
    const interval = setInterval(() => {
      setPosition((prev) => (prev + 1) % partners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [partners.length]);

  if (partners.length === 0) return null;

  return (
    <section className="py-16 bg-muted/30 border-y divider overflow-hidden">
      <div className="container-wide mb-8">
        <p className="text-xs tracking-wider uppercase text-muted-foreground text-center font-sans-nav">
          Our Partners & Affiliates
        </p>
      </div>

      <div className="space-y-12">
        {tiersWithPartners.map((tier) => (
          <div key={tier} className="space-y-4">
            <p className="text-xs tracking-wider uppercase text-muted-foreground text-center font-sans-nav">
              {tierLabels[tier]}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 px-4">
              {partnersByTier[tier].map((partner) => (
                <a
                  key={partner.id}
                  href={partner.website_url || '#'}
                  target={partner.website_url ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className={`flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 ${
                    tier === 'gold' ? 'w-48 h-24' : tier === 'silver' ? 'w-40 h-20' : 'w-32 h-16'
                  }`}
                >
                  {partner.logo_url ? (
                    <img 
                      src={partner.logo_url} 
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center border divider bg-card px-4">
                      <span className="text-xs text-center font-sans-nav text-muted-foreground">
                        {partner.name}
                      </span>
                    </div>
                  )}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PartnersCarousel;