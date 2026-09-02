import { getPolitician } from "@/lib/data/politician/politician";
import { notFound } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  ShieldAlert, 
  Wallet, 
  Scale, 
  ShieldCheck 
} from "lucide-react";

interface Politician {
  _id: string;
  criminalCaseCount: number;
  assets: number;
  liabilities: number;
  netWorth: number;
}

interface Props {
  params: Promise<{
    id: string;
  }>;
}

function formatINR(amount: number): string {
  if (amount === undefined || amount === null || isNaN(amount)) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default async function Accountability({ params }: Props) {
  const { id } = await params;
  const politician: Politician | null = await getPolitician(id);

  if (!politician) {
    notFound();
  }

  const hasCriminalCases = (politician.criminalCaseCount ?? 0) > 0;

  return (
    <div className="space-y-6">
      {/* Section Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg border border-[#0F3460] bg-[#0F3460]/60 text-[#E94560]">
            <Scale className="size-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#F9F9F9]">
              Financial & Legal Accountability
            </h2>
            <p className="text-xs text-[#F9F9F9]/50">
              Self-declared election affidavit records and criminal disclosures
            </p>
          </div>
        </div>

        {/* Status Chip */}
        <Badge
          variant="outline"
          className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold border ${
            hasCriminalCases
              ? "border-[#E94560]/40 bg-[#E94560]/10 text-[#E94560]"
              : "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
          }`}
        >
          {hasCriminalCases ? (
            <>
              <ShieldAlert className="size-3.5" />
              <span>{politician.criminalCaseCount} Declared Cases</span>
            </>
          ) : (
            <>
              <ShieldCheck className="size-3.5" />
              <span>Clean Record</span>
            </>
          )}
        </Badge>
      </div>

      {/* 2x2 Financial & Legal Metric Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Card 1: Total Assets */}
        <Card className="rounded-2xl border border-[#0F3460]/80 bg-[#16213E]/80 backdrop-blur-md shadow-lg transition-all hover:border-[#0F3460]">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-[#F9F9F9]/50">
              Total Assets
            </CardTitle>
            <div className="rounded-lg border border-[#0F3460] bg-[#0F3460]/50 p-2 text-emerald-400">
              <TrendingUp className="size-4" />
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            <p className="text-2xl font-bold tracking-tight text-[#F9F9F9]">
              {formatINR(politician.assets)}
            </p>
            <p className="text-[11px] text-[#F9F9F9]/40">
              Movable & Immovable declared assets
            </p>
          </CardContent>
        </Card>

        {/* Card 2: Total Liabilities */}
        <Card className="rounded-2xl border border-[#0F3460]/80 bg-[#16213E]/80 backdrop-blur-md shadow-lg transition-all hover:border-[#0F3460]">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-[#F9F9F9]/50">
              Total Liabilities
            </CardTitle>
            <div className="rounded-lg border border-[#0F3460] bg-[#0F3460]/50 p-2 text-[#E94560]">
              <TrendingDown className="size-4" />
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            <p className="text-2xl font-bold tracking-tight text-[#F9F9F9]">
              {formatINR(politician.liabilities)}
            </p>
            <p className="text-[11px] text-[#F9F9F9]/40">
              Loans, dues & financial obligations
            </p>
          </CardContent>
        </Card>

        {/* Card 3: Criminal Cases */}
        <Card className="rounded-2xl border border-[#0F3460]/80 bg-[#16213E]/80 backdrop-blur-md shadow-lg transition-all hover:border-[#0F3460]">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-[#F9F9F9]/50">
              Criminal Cases
            </CardTitle>
            <div
              className={`rounded-lg border p-2 ${
                hasCriminalCases
                  ? "border-[#E94560]/50 bg-[#E94560]/10 text-[#E94560]"
                  : "border-[#0F3460] bg-[#0F3460]/50 text-emerald-400"
              }`}
            >
              <ShieldAlert className="size-4" />
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span
                className={`text-2xl font-bold tracking-tight ${
                  hasCriminalCases ? "text-[#E94560]" : "text-emerald-400"
                }`}
              >
                {politician.criminalCaseCount ?? 0}
              </span>
              <span className="text-xs text-[#F9F9F9]/50">
                {hasCriminalCases ? "active cases reported" : "cases pending"}
              </span>
            </div>
            <p className="text-[11px] text-[#F9F9F9]/40">
              As reported in official ECI affidavit
            </p>
          </CardContent>
        </Card>

        {/* Card 4: Net Worth */}
        <Card className="rounded-2xl border border-[#0F3460]/80 bg-[#16213E]/80 backdrop-blur-md shadow-lg transition-all hover:border-[#0F3460]">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-[#F9F9F9]/50">
              Declared Net Worth
            </CardTitle>
            <div className="rounded-lg border border-[#0F3460] bg-[#0F3460]/50 p-2 text-[#E94560]">
              <Wallet className="size-4" />
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            <p className="text-2xl font-bold tracking-tight text-[#E94560]">
              {formatINR(politician.netWorth ?? (politician.assets - politician.liabilities))}
            </p>
            <p className="text-[11px] text-[#F9F9F9]/40">
              Total Assets minus Liabilities
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}