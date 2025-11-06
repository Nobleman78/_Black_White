import Clients from "@/components/LandingPage/Clients";
import CTA from "@/components/LandingPage/CTA";
import DemandableService from "@/components/LandingPage/DemandableService";
import FixedButton from "@/components/LandingPage/FixedButton";
import Hero from "@/components/LandingPage/Hero";
import Quote from "@/components/LandingPage/Quote";

export default function Home() {
  return (
    <div className="mb-5">
      <Hero />
      <Quote />
      <DemandableService />
      <Clients />
      <CTA />
      <FixedButton/>
    </div>
  );
}