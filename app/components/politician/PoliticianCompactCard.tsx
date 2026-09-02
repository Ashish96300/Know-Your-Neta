"use client";

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Star, MapPin, ArrowUpRight } from "lucide-react";
import { CldImage } from "next-cloudinary";


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

export default function PoliticianCompactCard({
    politician,
}: {
    politician: Politician;
}) {
    const areaTrail = [
        ...(politician.electoralArea?.ancestors?.map(
            (area) => area.name
        ) || []),
        politician.electoralArea?.name,
    ].filter(Boolean);

    const hasValidPhoto =
    politician.photo &&
    !politician.photo.includes("example.com");

    const hasValidLogo =
    politician.party?.logo&&
    !politician.party.logo.includes("logo");

    return (
        <Card className="group relative flex h-full flex-col justify-between overflow-hidden rounded-lg border border-[#0F3460]/70 bg-[#16213E]/80 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-[#E94560]/60 hover:shadow-lg hover:shadow-[#E94560]/10">

            <div className="flex flex-1 flex-col">

                {/* Politician Image */}
                <div className="relative h-24 w-full overflow-hidden bg-[#1A1A2E]">

                {hasValidPhoto ? (
                    <CldImage
                        src={politician.photo!}
                        alt={politician.name}
                        fill
                        className="object-cover object-top"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#0F3460]">
                        <span className="text-3xl font-bold text-[#F9F9F9]">
                            {politician.party?.abbreviation ||
                                politician.name
                                    .split(" ")
                                    .map((word) => word[0])
                                    .join("")
                                    .slice(0, 2)}
                        </span>
                    </div>
                )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#16213E] via-transparent to-transparent" />

                    {/* Party Badge */}
                    <div className="absolute right-1.5 top-1.5 flex items-center gap-1 rounded-full border border-[#0F3460] bg-[#16213E]/90 px-1.5 py-0.5 text-[9px] font-bold text-[#F9F9F9] backdrop-blur-sm">

                       {hasValidLogo ? (
                        <CldImage
                            src={politician.party?.logo}
                            alt={politician.party?.abbreviation}
                            width={12}
                            height={12}
                            className="size-full rounded-full object-contain"
                        />
                    ) : (
                        politician.party?.abbreviation?.slice(0, 3)
                    )}

                        <span>
                            {politician.party?.abbreviation}
                        </span>

                    </div>

                    {/* Electoral Area */}
                    {politician.electoralArea?.name && (
                        <div className="absolute bottom-1.5 left-1.5 flex max-w-[85%] items-center gap-1 rounded border border-[#0F3460]/70 bg-[#1A1A2E]/85 px-1 py-0.5 text-[9px] font-medium text-[#F9F9F9] backdrop-blur-sm">

                            <MapPin className="size-2 shrink-0 text-[#E94560]" />

                            <span className="truncate">
                                {politician.electoralArea.name}
                            </span>

                        </div>
                    )}

                </div>

                {/* Details */}
                <CardHeader className="space-y-0 p-2 pb-0.5">

                    <CardTitle
                        title={politician.name}
                        className="truncate text-xs font-bold tracking-tight text-[#F9F9F9] transition-colors group-hover:text-[#E94560]"
                    >
                        {politician.name}
                    </CardTitle>

                    <CardDescription
                        title={areaTrail.join(" → ")}
                        className="truncate text-[9px] text-[#F9F9F9]/50"
                    >
                        {areaTrail.length > 0
                            ? areaTrail.join(" → ")
                            : politician.party?.name}
                    </CardDescription>

                </CardHeader>

                {/* Rating */}
                <CardContent className="mt-auto px-2 py-1">

                    <div className="flex items-center justify-between rounded-md border border-[#0F3460]/50 bg-[#1A1A2E]/60 px-2 py-0.5 text-[10px]">

                        <span className="text-[#F9F9F9]/60">
                            Rating
                        </span>

                        <div className="flex items-center gap-1 font-semibold text-[#F9F9F9]">

                            <Star className="size-2.5 fill-amber-400 text-amber-400" />

                            <span>
                                {politician.averageRating
                                    ? politician.averageRating.toFixed(1)
                                    : "N/A"}
                            </span>

                        </div>

                    </div>

                </CardContent>

            </div>

            {/* View Button */}
            <CardFooter className="p-2 pt-0.5">

                <a
                    href={`/politician/${politician._id}`}
                    className="inline-flex w-full items-center justify-center gap-1 rounded-md border border-[#0F3460] bg-[#0F3460]/30 py-1 text-[10px] font-semibold text-[#F9F9F9] transition-colors hover:border-[#E94560] hover:bg-[#E94560]"
                >
                    <span>View</span>
                    <ArrowUpRight className="size-2.5" />
                </a>

            </CardFooter>

        </Card>
    );
}