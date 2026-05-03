import SEOHead from "@/components/SEOHead";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { BookSection } from "@/components/landing/BookSection";
import { Testimonial } from "@/components/landing/Testimonial";
import { WhoItsFor } from "@/components/landing/WhoItsFor";
import { Pricing } from "@/components/landing/Pricing";
import { TrustPrivacy } from "@/components/landing/TrustPrivacy";
import { Faq } from "@/components/landing/Faq";
import { FinalCta } from "@/components/landing/FinalCta";
import { Footer } from "@/components/landing/Footer";
import { StickyCta } from "@/components/landing/StickyCta";

const Index = () => {
  return (
    <div className="min-h-screen bg-paper">
      <SEOHead />
      <Nav />
      <main>
        <Hero />
        <ProblemSection />
        <HowItWorks />
        <BookSection />
        <Testimonial />
        <WhoItsFor />
        <Pricing />
        <TrustPrivacy />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyCta />
    </div>
  );
};

export default Index;
