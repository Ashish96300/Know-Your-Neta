
import PoliticianTabs from "@/app/components/politician/PoliticianTab";
import PoliticianHeaderCard from "@/app/components/politician/PoliticianHeaderCard";
import Politician from "@/lib/models/Politician";
import dbConnect from "@/lib/db/connectDB";
import { getPolitician } from "@/lib/data/politician/politician";


interface Props {
    children: React.ReactNode;
    params: Promise<{ id: string }>;
}

export default async function PoliticianLayout({
    children,
    params,
}: Props) {
    const { id } = await params;

    const politician = await getPolitician(id);

    if (!politician) {
        throw new Error("Politician not found");
    }

    return (
        <div className="mx-auto max-w-5xl space-y-6">

            <PoliticianHeaderCard
                politician={JSON.parse(JSON.stringify(politician))}
            />

            <PoliticianTabs />

            {children}

        </div>
    );
}