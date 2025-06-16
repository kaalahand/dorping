'use client';

import { Navigation } from '@/components/organisms/Navigation/Navigation';
import { HeroSection } from '@/components/organisms/HeroSection/HeroSection';
import { PricingSection } from '@/components/organisms/PricingSection/PricingSection';
import { SocialProofSection } from '@/components/organisms/SocialProofSection/SocialProofSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      <main>
        <HeroSection />
        <PricingSection />
        <SocialProofSection />
      </main>
    </div>
  );
}