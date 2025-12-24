import { Link } from 'react-router-dom';
import NewsletterSignup from './NewsletterSignup';

const Footer = () => {
  return (
    <footer className="py-16 border-t divider">
      <div className="container-reading text-center">
        <div className="decorative-line mb-8" />
        
        <p className="font-sans-nav text-muted-foreground tracking-widest mb-4">
          The Atlas Codex of Living Systems
        </p>
        
        <p className="text-sm text-muted-foreground mb-8">
          A foundation for understanding regeneration across natural and human systems.
        </p>

        {/* Newsletter */}
        <div className="max-w-md mx-auto mb-8">
          <p className="font-sans-nav text-xs text-muted-foreground tracking-wider mb-4">
            Subscribe for Updates
          </p>
          <NewsletterSignup />
        </div>

        {/* Links */}
        <div className="flex justify-center gap-6 mb-8">
          <Link 
            to="/about"
            className="font-sans-nav text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Link 
            to="/events"
            className="font-sans-nav text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Events
          </Link>
          <Link 
            to="/resources"
            className="font-sans-nav text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Resources
          </Link>
          <a 
            href="#writings"
            className="font-sans-nav text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Writings
          </a>
          <a 
            href="#contact"
            className="font-sans-nav text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </a>
        </div>
        
        <p className="text-xs text-muted-foreground">
          This work is ongoing. What appears here today may be refined tomorrow.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
