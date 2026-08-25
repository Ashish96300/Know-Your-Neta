import SearchPolitician from "@/app/components/politician/SearchPolitician";
import PoliticianMainCard from "@/app/components/politician/PoliticianMainCard";


export default function PoliticianPage() {
  return (
    <>
      <SearchPolitician />
      <div className="pt-2">
        <PoliticianMainCard />
      </div>
    </>
  );
}