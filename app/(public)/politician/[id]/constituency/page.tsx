import { getPolitician } from "@/lib/data/politician/politician";
import { notFound } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Clock, Landmark, Layers } from "lucide-react";

interface ElectoralArea {
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
}

interface Politician {
  electoralArea?: ElectoralArea;
  termStatus: "current" | "past";
  currentTermStartYear?: number;
  status: "active" | "former";
}

interface Props {
  params: Promise<{
    id: string;
  }>;
}

// Order mapping: State -> Lok Sabha -> Vidhan Sabha -> Municipal/Ward
const LEVEL_ORDER: Record<string, number> = {
  state: 1,
  country: 1,
  loksabha: 2,
  "lok sabha": 2,
  parliamentary: 2,
  vidhansabha: 3,
  "vidhan sabha": 3,
  assembly: 3,
  municipal: 4,
  ward: 5,
  local: 6,
};

function getLevelRank(type: string): number {
  const normalized = type.toLowerCase().trim();
  return LEVEL_ORDER[normalized] ?? 99;
}

export default async function Constituency({ params }: Props) {
  const { id } = await params;
  const politician: Politician | null = await getPolitician(id);

  if (!politician) {
    notFound();
  }

  const area = politician.electoralArea;

  if (!area) {
    return (
      <div className="flex h-48 flex-col items-center justify-center rounded-2xl border border-[#0F3460]/80 bg-[#16213E]/60 text-center backdrop-blur-md">
        <MapPin className="size-8 text-[#E94560] mb-2 opacity-80" />
        <p className="text-sm font-semibold text-[#F9F9F9]">
          Electoral Area Unavailable
        </p>
        <p className="text-xs text-[#F9F9F9]/50">
          No constituency mapping found for this representative.
        </p>
      </div>
    );
  }

  // Combine ancestors and current area, then sort State -> Lok -> Vidhan -> Municipal
  const allLevels = [...(area.ancestors ?? []), area];
  const sortedHierarchy = allLevels.sort(
    (a, b) => getLevelRank(a.type) - getLevelRank(b.type)
  );

  return (
    <div className="space-y-6">
      {/* Electoral Hierarchy */}
      <Card className="rounded-2xl border border-[#0F3460]/80 bg-[#16213E]/80 backdrop-blur-md shadow-lg">
        <CardHeader className="border-b border-[#0F3460]/60 pb-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#0F3460]/60 text-[#E94560] border border-[#0F3460]">
              <Layers className="size-4" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-[#F9F9F9]">
                Electoral Hierarchy
              </CardTitle>
              <p className="text-xs text-[#F9F9F9]/50">
                Administrative and representation jurisdiction mapping
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-5 space-y-3">
          {sortedHierarchy.map((item, index) => (
            <div
              key={item._id || index}
              className="flex items-center justify-between rounded-xl border border-[#0F3460]/60 bg-[#1A1A2E]/60 p-3.5 transition-colors hover:border-[#E94560]/50"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-6 items-center justify-center rounded-full bg-[#0F3460]/70 text-[10px] font-bold text-[#E94560]">
                  {index + 1}
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-[#F9F9F9]/60">
                  {item.type}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {item.number && (
                  <Badge
                    variant="outline"
                    className="border-[#0F3460] bg-[#16213E] text-[10px] font-semibold text-[#E94560]"
                  >
                    No. {item.number}
                  </Badge>
                )}
                <span className="text-sm font-semibold text-[#F9F9F9]">
                  {item.name}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Term & Representation Information */}
      <Card className="rounded-2xl border border-[#0F3460]/80 bg-[#16213E]/80 backdrop-blur-md shadow-lg">
        <CardHeader className="border-b border-[#0F3460]/60 pb-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#0F3460]/60 text-[#E94560] border border-[#0F3460]">
              <Landmark className="size-4" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-[#F9F9F9]">
                Term & Tenure Details
              </CardTitle>
              <p className="text-xs text-[#F9F9F9]/50">
                Current legislative status and timeline
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-5 grid gap-4 sm:grid-cols-3">
          {/* Term Status */}
          <div className="rounded-xl border border-[#0F3460]/50 bg-[#1A1A2E]/60 p-3.5">
            <div className="flex items-center gap-1.5 text-xs text-[#F9F9F9]/50 mb-1">
              <Clock className="size-3.5 text-[#E94560]" />
              <span>Term Status</span>
            </div>
            <p className="text-sm font-semibold capitalize text-[#F9F9F9]">
              {politician.termStatus} Term
            </p>
          </div>

          {/* Started Year */}
          <div className="rounded-xl border border-[#0F3460]/50 bg-[#1A1A2E]/60 p-3.5">
            <div className="flex items-center gap-1.5 text-xs text-[#F9F9F9]/50 mb-1">
              <Calendar className="size-3.5 text-[#E94560]" />
              <span>Term Began</span>
            </div>
            <p className="text-sm font-semibold text-[#F9F9F9]">
              {politician.currentTermStartYear ?? "Not Recorded"}
            </p>
          </div>

          {/* Politician Activity Status */}
          <div className="rounded-xl border border-[#0F3460]/50 bg-[#1A1A2E]/60 p-3.5">
            <div className="flex items-center gap-1.5 text-xs text-[#F9F9F9]/50 mb-1">
              <Landmark className="size-3.5 text-[#E94560]" />
              <span>Activity Status</span>
            </div>
            <div>
              <Badge
                variant="outline"
                className={`capitalize text-xs font-semibold px-2 py-0.5 border ${
                  politician.status === "active"
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                    : "border-[#0F3460] bg-[#16213E] text-[#F9F9F9]/60"
                }`}
              >
                {politician.status}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}