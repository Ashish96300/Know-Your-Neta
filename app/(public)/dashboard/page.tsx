// app/(public)/page.tsx (dashboard/landing)
import PoliticianDashboardCard from "@/app/components/politician/PoliticianDashboardCard";
import { HeroBanner } from "@/app/components/ui/HeroBanner";

export default function LandingPage() {
  return (
    <>
      <HeroBanner />
      <PoliticianDashboardCard />
    </>
  );
}