import { useState } from 'react';
import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ContactDialog from './ContactDialog';

const Navbar = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: MessageCircle, href: 'https://wa.me/', label: 'WhatsApp' },
    { icon: Mail, href: 'mailto:hello@example.com', label: 'Email' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-2xl font-bold text-gradient">
              ADHIL • MK
            </div>

            {/* Social Icons - Center */}
            <div className="flex items-center gap-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                  aria-label={label}
                >
                  <Icon size={20} />
                </a>
              ))}


              {/* View CV Button */}
              <Button
                onClick={() => window.open('/cv.pdf', '_blank')}
                variant="outline"
              className="bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300 glow-primary"
              >
                View CV
              </Button>
            </div>



            {/* Contact Button */}
            <Button
              onClick={() => setIsContactOpen(true)}
              className="bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300 glow-primary"
            >
              Contact
            </Button>

          </div>
        </div>
      </nav>

      <ContactDialog open={isContactOpen} onOpenChange={setIsContactOpen} />
    </>
  );
};

export default Navbar;