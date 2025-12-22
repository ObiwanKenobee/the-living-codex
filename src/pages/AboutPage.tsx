import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import FadeInSection from '@/components/FadeInSection';
import Timeline from '@/components/Timeline';
import NewsletterSignup from '@/components/NewsletterSignup';
import ThemeToggle from '@/components/ThemeToggle';

const teamMembers = [
  {
    name: 'Dr. Elena Vasquez',
    role: 'Founding Director',
    bio: 'Systems ecologist with two decades of field research in regenerative landscapes. Her work bridges indigenous knowledge systems with contemporary ecological science.'
  },
  {
    name: 'Marcus Chen',
    role: 'Research Lead',
    bio: 'Philosopher of science specializing in complexity theory and emergent systems. Former lecturer at the Institute for Advanced Study.'
  },
  {
    name: 'Dr. Amara Okonkwo',
    role: 'Practice Director',
    bio: 'Applied ecologist focused on translating theoretical frameworks into on-ground regenerative practices. Pioneer in participatory action research methods.'
  },
  {
    name: 'James Whitmore',
    role: 'Habitat Steward',
    bio: 'Master gardener and permaculture designer. Oversees the living laboratory at Habitat One and maintains the seed library.'
  }
];

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container-wide">
          <div className="flex items-center justify-between h-14">
            <Link 
              to="/" 
              className="font-sans-nav text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-2"
            >
              <ArrowLeft size={14} />
              Home
            </Link>
            <span className="font-sans-nav text-foreground tracking-widest">
              About the Foundation
            </span>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="container-wide">
        {/* Mission Section */}
        <section className="mb-24">
          <FadeInSection>
            <div className="container-reading mx-auto">
              <p className="font-sans-nav text-muted-foreground mb-4 tracking-widest">
                Our Mission
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-8 text-balance">
                Understanding Regeneration Across Living Systems
              </h1>
              <div className="decorative-line !mx-0 mb-8" />
            </div>
          </FadeInSection>

          <FadeInSection delay={100}>
            <div className="container-reading mx-auto prose-codex space-y-6">
              <p>
                The Atlas Codex Foundation exists to advance understanding of regeneration—
                the capacity of living systems to restore, renew, and evolve toward greater 
                complexity and resilience. We believe this understanding is essential for 
                navigating the challenges of our time.
              </p>
              <p>
                Our work synthesizes insights from ecology, philosophy, indigenous wisdom 
                traditions, and systems science. We seek patterns that apply across scales: 
                from cellular repair to ecosystem restoration to the renewal of human communities.
              </p>
              <p>
                This is not academic work alone. We maintain living laboratories, publish 
                our evolving understanding openly, and collaborate with practitioners who 
                apply these principles in contexts ranging from soil restoration to 
                organizational design.
              </p>
            </div>
          </FadeInSection>
        </section>

        {/* History / Timeline Section */}
        <section className="mb-24 py-16 border-t border-b divider">
          <FadeInSection>
            <div className="text-center mb-16">
              <p className="font-sans-nav text-muted-foreground mb-4 tracking-widest">
                Our Journey
              </p>
              <h2 className="text-2xl md:text-3xl font-light">
                Evolution of the Foundation
              </h2>
            </div>
          </FadeInSection>

          <Timeline />
        </section>

        {/* Team Section */}
        <section className="mb-24">
          <FadeInSection>
            <div className="text-center mb-12">
              <p className="font-sans-nav text-muted-foreground mb-4 tracking-widest">
                Our Team
              </p>
              <h2 className="text-2xl md:text-3xl font-light mb-4">
                Stewards of the Work
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                A small team of researchers, practitioners, and observers committed to 
                patient inquiry and careful documentation.
              </p>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <FadeInSection key={member.name} delay={index * 100}>
                <div className="p-6 bg-card border border-border">
                  <h3 className="text-lg font-light mb-1">{member.name}</h3>
                  <p className="font-sans-nav text-xs text-accent tracking-wider mb-4">
                    {member.role}
                  </p>
                  <p className="text-sm text-reading leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="mb-16">
          <FadeInSection>
            <div className="max-w-xl mx-auto text-center">
              <p className="font-sans-nav text-muted-foreground mb-4 tracking-widest">
                Stay Connected
              </p>
              <h2 className="text-2xl md:text-3xl font-light mb-4">
                Receive Updates
              </h2>
              <p className="text-muted-foreground mb-8">
                Occasional correspondence as our understanding develops. 
                No more than monthly—usually less.
              </p>
              <NewsletterSignup />
            </div>
          </FadeInSection>
        </section>

        {/* Return Link */}
        <FadeInSection delay={200}>
          <div className="text-center">
            <Link 
              to="/"
              className="font-sans-nav text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Return to Home
            </Link>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default AboutPage;
