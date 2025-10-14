import { Hero } from "@/components/homepage/hero";
import { HowItWorks } from "@/components/homepage/how-it-works";
import { MissionValues } from "@/components/homepage/mission-values";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <MissionValues />
      <HowItWorks />
    </div>
  );
}
