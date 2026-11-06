import { AfterHero } from "@/components/motion/AfterHero";
import { AboutSection } from "@/components/sections/home/AboutSection";
import { ClosingCta } from "@/components/sections/home/ClosingCta";
import { CommerceHero } from "@/components/sections/home/CommerceHero";
import { ConnectedIntegrations } from "@/components/sections/home/ConnectedIntegrations";
import { RetentionStack } from "@/components/sections/home/RetentionStack";
import { SupportSection } from "@/components/sections/home/SupportSection";
import { TestimonialsSection } from "@/components/sections/home/TestimonialsSection";
import { TrustStrip } from "@/components/sections/home/TrustStrip";

export default function Home() {
  return (
    <>
      <div className="commerce-stage">
        <CommerceHero />
      </div>
      <div className="home-pattern">
      <AfterHero>
        <TrustStrip />
      </AfterHero>
      <AboutSection />
      <RetentionStack />
      <ConnectedIntegrations />
      <TestimonialsSection />
      <SupportSection />
      <ClosingCta />
      </div>
    </>
  );
}
