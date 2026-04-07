import { Navbar }      from "@/components/sections/Navbar";
import { Hero }        from "@/components/sections/Hero";
import { Features }    from "@/components/sections/Features";
import { SpeedScale }  from "@/components/sections/SpeedScale";
import { HowItWorks }  from "@/components/sections/HowItWorks";
import { Docs }        from "@/components/sections/Docs";
import { Footer }      from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <SpeedScale />
        <HowItWorks />
        <Docs />
      </main>
      <Footer />
    </div>
  );
}
