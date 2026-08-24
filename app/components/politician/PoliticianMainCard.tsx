
import axios from "axios";
import PoliticianCompactCard from "./PoliticianCompactCard";

interface Politician {
    _id: string;
    name: string;
    photo?: string;
    averageRating: number;

    party?: {
        name: string;
        abbreviation: string;
        logo?: string;
    };

    electoralArea?: {
        _id: string;
        name: string;
        type: string;
        number?: number;

        ancestors?: {
            _id: string;
            name: string;
            type: string;
            number?: number;
        }[];
    };
}

export default async function PoliticianMainCard() {

    const res = await axios.get(
        "http://localhost:3000/api/politician"
    );

    const politicians: Politician[] = res.data.data;

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {politicians.map((politician) => (
                <PoliticianCompactCard
                    key={politician._id}
                    politician={politician}
                />
            ))}
        </div>
    );
}