import FadeInSection from './FadeInSection';

const ContactSection = () => {
  return (
    <section id="contact" className="section-spacing border-t divider">
      <div className="container-reading text-center">
        <FadeInSection>
          <p className="font-sans-nav text-muted-foreground mb-4 tracking-widest">
            VIII
          </p>
          <h2 className="text-3xl md:text-4xl font-light mb-12">
            Correspondence
          </h2>
        </FadeInSection>
        
        <FadeInSection delay={100}>
          <div className="prose-codex mb-12">
            <p className="text-muted-foreground">
              This work unfolds slowly. If what you have read here resonates with 
              your own work or questions, you are welcome to write.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={200}>
          <div className="p-8 border divider bg-card max-w-md mx-auto">
            <p className="font-sans-nav text-sm text-muted-foreground mb-4 tracking-wider">
              For serious inquiries
            </p>
            <a 
              href="mailto:correspondence@atlascodex.org"
              className="text-lg text-reading hover:text-foreground transition-colors duration-300"
            >
              correspondence@atlascodex.org
            </a>
          </div>
        </FadeInSection>

        <FadeInSection delay={300}>
          <div className="mt-16">
            <p className="text-sm text-muted-foreground italic">
              We read everything. We cannot respond to everything.<br />
              Patience is appreciated.
            </p>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default ContactSection;
