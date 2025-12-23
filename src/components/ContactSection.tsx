import FadeInSection from './FadeInSection';
import ContactForm from './ContactForm';

const ContactSection = () => {
  return (
    <section id="contact" className="section-spacing border-t divider">
      <div className="container-reading">
        <FadeInSection>
          <div className="text-center">
            <p className="font-sans-nav text-muted-foreground mb-4 tracking-widest">
              VIII
            </p>
            <h2 className="text-3xl md:text-4xl font-light mb-12">
              Correspondence
            </h2>
          </div>
        </FadeInSection>
        
        <FadeInSection delay={100}>
          <div className="prose-codex mb-12 text-center">
            <p className="text-muted-foreground">
              This work unfolds slowly. If what you have read here resonates with 
              your own work or questions, you are welcome to write.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={200}>
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </FadeInSection>

        <FadeInSection delay={300}>
          <div className="mt-16 text-center">
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
