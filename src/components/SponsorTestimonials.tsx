import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Partnering with this organization has been transformative for our brand visibility. The community engagement and event exposure exceeded our expectations.",
    author: "Sarah Mitchell",
    role: "Marketing Director",
    company: "TechVentures Inc.",
    tier: "Gold",
  },
  {
    quote: "As a Silver sponsor, we've seen remarkable ROI through increased brand recognition and valuable networking opportunities with like-minded organizations.",
    author: "Michael Chen",
    role: "CEO",
    company: "GreenPath Solutions",
    tier: "Silver",
  },
  {
    quote: "The Bronze tier was perfect for us as a growing company. It allowed us to test the waters and we're now proud Gold sponsors after seeing the incredible value.",
    author: "Emily Rodriguez",
    role: "Founder",
    company: "Artisan Collective",
    tier: "Bronze → Gold",
  },
];

const tierColors: Record<string, string> = {
  Gold: 'bg-gradient-to-r from-amber-400 to-amber-600',
  Silver: 'bg-gradient-to-r from-slate-400 to-slate-600',
  Bronze: 'bg-gradient-to-r from-orange-600 to-orange-800',
  'Bronze → Gold': 'bg-gradient-to-r from-orange-600 to-amber-500',
};

const SponsorTestimonials = () => {
  return (
    <section className="border-t border-border pt-16 mb-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-light mb-2">What Our Partners Say</h2>
        <p className="text-muted-foreground">
          Hear from organizations that have partnered with us
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="relative bg-card border border-border rounded-lg p-6 transition-all duration-300 hover:shadow-lg"
          >
            <Quote className="absolute top-4 right-4 h-8 w-8 text-muted-foreground/20" />
            
            <blockquote className="text-foreground mb-6 relative z-10">
              "{testimonial.quote}"
            </blockquote>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-lg font-medium text-muted-foreground">
                {testimonial.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <div className="font-medium text-foreground">{testimonial.author}</div>
                <div className="text-sm text-muted-foreground">
                  {testimonial.role}, {testimonial.company}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <span
                className={`inline-block text-xs text-white px-3 py-1 rounded-full ${tierColors[testimonial.tier]}`}
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
