import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPolitician } from "@/lib/data/politician/politician";
import { 
  GraduationCap, 
  Briefcase, 
  Star, 
  Activity, 
  Trophy, 
  CheckCircle2 
} from "lucide-react";

// interface Politician {
//   education: string;
//   profession: string;
//   achievements: string;
//   status: "active" | "former";
//   averageRating: number;
//   reviewCount: number;
// }

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Overview({ params }: Props) {
  const { id } = await params;
  const politician = await getPolitician(id);

  if(!politician) return;
  return (
    <div className="space-y-6">
      {/* 4-Column KPI / Overview Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Education Card */}
        <Card className="rounded-2xl border border-[#0F3460]/80 bg-[#16213E]/80 backdrop-blur-md shadow-lg transition-all hover:border-[#0F3460]">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-[#F9F9F9]/50">
              Education
            </CardTitle>
            <div className="rounded-lg bg-[#0F3460]/50 p-2 text-[#E94560] border border-[#0F3460]">
              <GraduationCap className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-semibold text-[#F9F9F9] line-clamp-2">
              {politician.education || "Not Specified"}
            </p>
          </CardContent>
        </Card>

        {/* Profession Card */}
        <Card className="rounded-2xl border border-[#0F3460]/80 bg-[#16213E]/80 backdrop-blur-md shadow-lg transition-all hover:border-[#0F3460]">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-[#F9F9F9]/50">
              Profession
            </CardTitle>
            <div className="rounded-lg bg-[#0F3460]/50 p-2 text-[#E94560] border border-[#0F3460]">
              <Briefcase className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-semibold text-[#F9F9F9] line-clamp-2">
              {politician.profession || "Not Specified"}
            </p>
          </CardContent>
        </Card>

        {/* Rating Card */}
        <Card className="rounded-2xl border border-[#0F3460]/80 bg-[#16213E]/80 backdrop-blur-md shadow-lg transition-all hover:border-[#0F3460]">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-[#F9F9F9]/50">
              Citizen Rating
            </CardTitle>
            <div className="rounded-lg bg-[#0F3460]/50 p-2 text-amber-400 border border-[#0F3460]">
              <Star className="size-4 fill-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-[#F9F9F9]">
                {politician.averageRating ? Number(politician.averageRating).toFixed(1) : "N/A"}
              </span>
              <span className="text-xs text-[#F9F9F9]/50">
                ({politician.reviewCount || 0} reviews)
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Status Card */}
        <Card className="rounded-2xl border border-[#0F3460]/80 bg-[#16213E]/80 backdrop-blur-md shadow-lg transition-all hover:border-[#0F3460]">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-[#F9F9F9]/50">
              Tenure Status
            </CardTitle>
            <div className="rounded-lg bg-[#0F3460]/50 p-2 text-[#E94560] border border-[#0F3460]">
              <Activity className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <Badge
              variant="outline"
              className={`capitalize px-2.5 py-0.5 text-xs font-semibold border ${
                politician.status === "active"
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                  : "border-[#0F3460] bg-[#1A1A2E] text-[#F9F9F9]/60"
              }`}
            >
              {politician.status}
            </Badge>
          </CardContent>
        </Card>

      </div>

      {/* Achievements Section Card */}
      <Card className="rounded-2xl border border-[#0F3460]/80 bg-[#16213E]/80 backdrop-blur-md shadow-lg">
        <CardHeader className="border-b border-[#0F3460]/60 pb-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#0F3460]/60 text-[#E94560] border border-[#0F3460]">
              <Trophy className="size-4" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-[#F9F9F9]">
                Key Achievements & Highlights
              </CardTitle>
              <p className="text-xs text-[#F9F9F9]/50">
                Notable legislative milestones and public contributions
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-5">
          {politician.achievements ? (
            <div className="flex items-start gap-3 rounded-xl border border-[#0F3460]/50 bg-[#1A1A2E]/60 p-4">
              <CheckCircle2 className="size-4 shrink-0 text-[#E94560] mt-0.5" />
              <p className="text-xs leading-relaxed text-[#F9F9F9]/80 whitespace-pre-line">
                {politician.achievements}
              </p>
            </div>
          ) : (
            <p className="text-xs text-[#F9F9F9]/40 italic">
              No specific achievements recorded yet.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}