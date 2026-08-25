
import { Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
 } from "@/components/ui/card";
import PoliticianImage from "./PoliticianImage";

 interface Politician{
        _id: string;
        name: string;
        photo?: string;
        averageRating: number;
        reviewCount: number;
        party: {
            name: string;
            abbreviation: string;
            logo?: string;
        };
    };


export default async function PoliticianDashboardCard() {

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_APP_URL}/api/politician/dashboard`,
            {
                next: {
                    revalidate: 60,
                },
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch politicians");
        }

        const data = await res.json();
        const politicians:Politician[] = data.data;

    return (
         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {politicians.map((politician)=>(

            <Card className="overflow-hidden" key={politician._id}>
            
            <PoliticianImage
                publicId={politician.photo}
                name={politician.name}
            />

            <CardHeader>
                <CardTitle>{politician.name}</CardTitle>

                <CardDescription>
                    {politician.party.abbreviation}
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="flex justify-between">
                    <span>⭐ {politician.averageRating}</span>
                    <span>{politician.reviewCount} reviews</span>
                </div>
            </CardContent>
        </Card>
        ))}
        </div>
    );
}