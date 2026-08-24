import DashboardSidebar from "../../components/layout/Sidebar";
import PoliticianDashboardCard from "../../components/politician/PoliticianDashboardCard";
import { HeroBanner } from "../../components/ui/HeroBanner";

export default function LandingPage() {
  return (

    <div className="min-h-screen flex flex-col md:flex-row font-sans bg-[#1A1A2E] text-white">
{/*       
      <aside className="w-full md:w-64 shrink-0"> 
      <DashboardSidebar/>
      </aside> */}

      <main className="flex-1 p-6 overflow-y-auto" >
       <HeroBanner/>
        <PoliticianDashboardCard/>
      </main>

    </div>
  );
}
