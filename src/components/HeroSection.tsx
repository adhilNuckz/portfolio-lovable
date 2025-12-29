import { useEffect, useState } from 'react';
import profileImage from '@/assets/profile-hero.png';

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxStyle = {
    transform: `translateY(${scrollY * 0.3}px)`,
  };

  const textBackStyle = {
    transform: `translateY(${scrollY * 0.5}px) scale(${1 - scrollY * 0.0003})`,
    opacity: Math.max(0, 1 - scrollY * 0.003),
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
      
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[80px] animate-breathe" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[60px] animate-breathe" style={{ animationDelay: '2s' }} />

      {/* Text behind image */}
      <div
        className={`absolute z-0 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={textBackStyle}
      >
        <h1 className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-bold text-yellow-400/20 select-none whitespace-nowrap animate-text-float">
          WELL         COME
        </h1>
      </div>

      {/* Profile Image with 3D Ribbon Text */}
      <div
        className={`relative z-10 transition-all duration-1000 ${isLoaded ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
        style={parallaxStyle}
      >
        <div className="relative" style={{ perspective: '1000px' }}>
          {/* Glow ring */}
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-primary to-accent blur-2xl opacity-50 animate-glow-pulse" />
          
          {/* Image container */}
          <div className="relative w-[300px] h-[450px] md:w-[350px] md:h-[550px] lg:w-[450px] lg:h-[650px] rounded-[2rem] overflow-hidden">
            <img
              src={profileImage}
              alt="Developer Portrait"
              className="w-full h-full object-cover"
            />
            
            {/* 3D Ribbon Text Wrapper - 30 degree slope */}
            <div 
              className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none"
              style={{ perspective: '800px' }}
            >
              {/* Rotation wrapper - separate from animation */}
              <div style={{ transform: 'rotate(-30deg)' }}>
                <div 
                  className="animate-ribbon-flow whitespace-nowrap"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <span className="text-[3rem] md:text-[4rem] lg:text-[5rem] font-bold text-gradient drop-shadow-[0_0_30px_hsl(var(--primary)/0.8)]">
                    DEVELOPER • DESIGNER • CREATOR • ADHIL
                  </span>
                  <span className="text-[3rem] md:text-[4rem] lg:text-[5rem] font-bold text-gradient drop-shadow-[0_0_30px_hsl(var(--primary)/0.8)]">
                       --- DEVELOPER • DESIGNER • CREATOR • ADHIL-
                  </span>
                   <span className="text-[3rem] md:text-[4rem] lg:text-[5rem] font-bold text-gradient drop-shadow-[0_0_30px_hsl(var(--primary)/0.8)]">
                       --- DEVELOPER • DESIGNER • CREATOR • ADHIL-
                  </span>
                   <span className="text-[3rem] md:text-[4rem] lg:text-[5rem] font-bold text-gradient drop-shadow-[0_0_30px_hsl(var(--primary)/0.8)]">
                       --- DEVELOPER • DESIGNER • CREATOR • ADHIL---
                  </span>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom text - fixed positioning */}
      <div
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 text-center z-30 transition-all duration-1000 delay-500 ${
          isLoaded && scrollY < 100 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <p className="text-muted-foreground text-lg md:text-xl mb-4 animate-fade-in">
          Developer of Current & Future Technologies
        </p>
        <div className="flex items-center justify-center gap-2 text-primary animate-float">
         <br />
          <span>Scroll to explore</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;