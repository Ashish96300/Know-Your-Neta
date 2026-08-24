import SearchPolitician from "@/app/components/politician/SearchPolitician";
import PoliticianMainCard from "@/app/components/politician/PoliticianMainCard";
import DashboardSidebar from "@/app/components/layout/Sidebar";

export default function PoliticianPage() {
    return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <SearchPolitician />
      <div className="pt-2">
        <PoliticianMainCard />
      </div>
    </div>
    );
}

