import { Check, Award, Star, Zap } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

interface TierFeature {
  text: string;
  included: boolean;
}

interface SponsorshipTier {
  name: string;
  price: string;
  period: string;
  description: string;
  icon: React.ReactNode;
  features: TierFeature[];
  highlighted?: boolean;
  accentClass: string;
}

const tiers: SponsorshipTier[] = [
  {
    name: 'Bronze',
    price: '$500',
    period: '/year',
    description: 'Essential visibility for emerging partners',
    icon: <Award className="h-8 w-8" />,
    accentClass: 'from-orange-600 to-orange-800',
    features: [
      { text: 'Logo on website footer carousel', included: true },
      { text: 'Monthly newsletter mention', included: true },
      { text: 'Partner directory listing', included: true },
      { text: 'Event booth space', included: false },
      { text: 'Speaking opportunities', included: false },
      { text: 'Co-branded content', included: false },
    ],
  },
  {
    name: 'Silver',
    price: '$1,500',
    period: '/year',
    description: 'Enhanced exposure for growing organizations',
    icon: <Star className="h-8 w-8" />,
    accentClass: 'from-slate-400 to-slate-600',
    features: [
      { text: 'Logo on website footer carousel', included: true },
      { text: 'Monthly newsletter mention', included: true },
      { text: 'Partner directory listing', included: true },
      { text: 'Event booth space (1 event)', included: true },
      { text: 'Quarterly social media feature', included: true },
      { text: 'Co-branded content', included: false },
    ],
  },
  {
    name: 'Gold',
    price: '$5,000',
    period: '/year',
    description: 'Premium partnership for maximum impact',
    icon: <Zap className="h-8 w-8" />,
    accentClass: 'from-amber-400 to-amber-600',
    highlighted: true,
    features: [
      { text: 'Premium logo placement on website', included: true },
      { text: 'Weekly newsletter features', included: true },
      { text: 'Featured partner directory listing', included: true },
      { text: 'Event booth space (all events)', included: true },
      { text: 'Speaking opportunities at events', included: true },
      { text: 'Co-branded content & campaigns', included: true },
    ],
  },
];

const SponsorshipPage = () => {
  const handleContactClick = (tier: string) => {
    const subject = encodeURIComponent(`${tier} Sponsorship Inquiry`);
    const body = encodeURIComponent(`I'm interested in learning more about the ${tier} sponsorship tier.`);
    window.location.href = `mailto:partnerships@example.com?subject=${subject}&body=${body}`;
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
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-lg border bg-card overflow-hidden transition-all duration-300 hover:shadow-lg ${
                  tier.highlighted ? 'border-primary ring-2 ring-primary/20' : 'border-border'
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center text-xs py-1 uppercase tracking-wider font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className={`p-6 ${tier.highlighted ? 'pt-10' : ''}`}>
                  {/* Icon & Name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${tier.accentClass} text-white`}>
                      {tier.icon}
                    </div>
                    <h2 className="text-2xl font-light">{tier.name}</h2>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-4xl font-light">{tier.price}</span>
                    <span className="text-muted-foreground">{tier.period}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-6">
                    {tier.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check
                          className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                            feature.included ? 'text-primary' : 'text-muted-foreground/30'
                          }`}
                        />
                        <span className={feature.included ? '' : 'text-muted-foreground/50 line-through'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    className="w-full"
                    variant={tier.highlighted ? 'default' : 'outline'}
                    onClick={() => handleContactClick(tier.name)}
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="text-center border-t border-border pt-16">
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

          {/* FAQ or Contact */}
          <div className="mt-16 text-center bg-muted/30 rounded-lg p-8">
            <h2 className="text-xl font-light mb-2">Have questions?</h2>
            <p className="text-muted-foreground mb-4">
              We'd love to discuss how we can work together.
            </p>
            <Button variant="outline" onClick={() => handleContactClick('General')}>
              Get in Touch
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SponsorshipPage;
