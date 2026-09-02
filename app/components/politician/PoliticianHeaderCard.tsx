"use client";

import { Card } from "@/components/ui/card";
import { CldImage } from "next-cloudinary";

interface Politician {
  _id: string;
  name: string;
  photo: string;
  party: {
    _id: string;
    name: string;
    abbreviation: string;
    logo: string;
  };
}

export default function PoliticianHeaderCard({
  politician,
}: {
  politician: Politician;
}) {
  return (
    <Card className="relative overflow-hidden rounded-2xl border border-[#0F3460]/80 bg-[#16213E]/85 p-5 shadow-xl backdrop-blur-md md:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="relative size-24 shrink-0 sm:size-28">
          <div className="size-full overflow-hidden rounded-2xl border-2 border-[#0F3460] bg-[#1A1A2E] shadow-inner">

            <CldImage
              src={politician.photo || "placeholder_politician"}
              alt={politician.name}
              width={120}
              height={120}
              sizes="120px"
              className="size-full object-cover object-top"
            />
          </div>

          {politician.party?.logo && (
            <div
              title={politician.party.name}
              className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full border-2 border-[#16213E] bg-[#1A1A2E] p-1 shadow-md shadow-black/40"
            >
              <CldImage
                src={politician.party.logo}
                alt={politician.party.abbreviation}
                width={28}
                height={28}
                sizes="28px"
                className="size-full rounded-full object-contain"
              />
            </div>
          )}
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full border border-[#0F3460] bg-[#0F3460]/50 px-2.5 py-0.5 text-xs font-semibold text-[#E94560]">
              {politician.party.abbreviation}
            </span>
            <span className="truncate text-xs font-medium text-[#F9F9F9]/50">
              {politician.party.name}
            </span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-[#F9F9F9] sm:text-2xl">
            {politician.name}
          </h2>
        </div>
      </div>
    </Card>
  );
}