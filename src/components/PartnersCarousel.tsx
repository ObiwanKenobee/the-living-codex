import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface Partner {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
}

const PartnersCarousel = () => {
  const [position, setPosition] = useState(0);

  const { data: partners = [] } = useQuery({
    queryKey: ['partners'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('partners')
        .select('id, name, logo_url, website_url')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data as Partner[];
    },
  });

  useEffect(() => {
    if (partners.length === 0) return;
    
    const interval = setInterval(() => {
      setPosition((prev) => (prev + 1) % partners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [partners.length]);

  // Don't render if no partners
  if (partners.length === 0) return null;

  // Double the array for seamless looping
  const displayPartners = [...partners, ...partners];

  return (
    <section className="py-16 bg-muted/30 border-y divider overflow-hidden">
      <div className="container-wide mb-8">
        <p className="text-xs tracking-wider uppercase text-muted-foreground text-center font-sans-nav">
          Our Partners & Affiliates
        </p>
      </div>

      <div className="relative">
        <div 
          className="flex items-center gap-12 transition-transform duration-1000 ease-linear"
          style={{
            transform: `translateX(-${position * (160 + 48)}px)`,
          }}
        >
          {displayPartners.map((partner, index) => (
            <a
              key={`${partner.id}-${index}`}
              href={partner.website_url || '#'}
              target={partner.website_url ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="flex-shrink-0 w-40 h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
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

        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default PartnersCarousel;
