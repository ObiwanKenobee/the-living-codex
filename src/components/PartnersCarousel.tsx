import { useEffect, useState } from 'react';

interface Partner {
  name: string;
  logoUrl: string;
}

const partners: Partner[] = [
  { name: 'Ethical Living Institute', logoUrl: '/placeholder.svg' },
  { name: 'Green Future Foundation', logoUrl: '/placeholder.svg' },
  { name: 'Mindful Communities Network', logoUrl: '/placeholder.svg' },
  { name: 'Sustainable Spaces Alliance', logoUrl: '/placeholder.svg' },
  { name: 'Global Wisdom Council', logoUrl: '/placeholder.svg' },
  { name: 'Earth Harmony Project', logoUrl: '/placeholder.svg' },
];

const PartnersCarousel = () => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => (prev + 1) % partners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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
            <div
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 w-40 h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
            >
              <div className="w-full h-full flex items-center justify-center border divider bg-card px-4">
                <span className="text-xs text-center font-sans-nav text-muted-foreground">
                  {partner.name}
                </span>
              </div>
            </div>
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
