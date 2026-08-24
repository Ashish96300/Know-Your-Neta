
import { Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
 } from "@/components/ui/card";
import axios from "axios";

 interface PoliticianDashboardCardProps {
    politician: {
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
}


export default async function PoliticianDashboardCard() {

    const res = await axios.get('http://localhost:3000/api/politician/dashboard')

    const politicians: PoliticianDashboardCardProps["politician"][] =res.data.data;

    return (
         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {politicians.map((politician)=>(
            <Card className="overflow-hidden" key={politician._id}>
            <img
                src={politician.photo || "/placeholder-politician.png"}
                alt={politician.name}
                className="h-48 w-full object-cover"
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