import { getPolitician } from "@/lib/data/politician/politician";
import { notFound } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ElectionPromise from "@/lib/models/Promise";

import { 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Calendar, 
  ExternalLink, 
  ScrollText,
  AlertCircle 
} from "lucide-react";

interface AllPromise {
  _id: string;
  title: string;
  description?: string;
  date: string | Date;
  source?: string;
  status: "Promised" | "In Progress" | "Completed" | "Not Completed";
  completionDate?: string | Date;
}

interface Props {
  params: Promise<{ id: string }>;
}

function formatDate(d?: string | Date) {
  if (!d) return null;
  return new Date(d).toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  });
}

function getStatusBadge(status: AllPromise["status"]) {
  switch (status) {
    case "Completed":
      return (
        <Badge
          variant="outline"
          className="flex items-center gap-1 border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400"
        >
          <CheckCircle2 className="size-3.5" />
          <span>Completed</span>
        </Badge>
      );
    case "In Progress":
      return (
        <Badge
          variant="outline"
          className="flex items-center gap-1 border-amber-400/40 bg-amber-400/10 px-2.5 py-0.5 text-xs font-semibold text-amber-400"
        >
          <Clock className="size-3.5" />
          <span>In Progress</span>
        </Badge>
      );
    case "Not Completed":
      return (
        <Badge
          variant="outline"
          className="flex items-center gap-1 border-[#E94560]/40 bg-[#E94560]/10 px-2.5 py-0.5 text-xs font-semibold text-[#E94560]"
        >
          <XCircle className="size-3.5" />
          <span>Not Completed</span>
        </Badge>
      );
    default:
      return (
        <Badge
          variant="outline"
          className="flex items-center gap-1 border-[#0F3460] bg-[#0F3460]/40 px-2.5 py-0.5 text-xs font-semibold text-[#F9F9F9]/70"
        >
          <AlertCircle className="size-3.5 text-[#E94560]" />
          <span>Promised</span>
        </Badge>
      );
  }
}

export default async function AllPromisesPage({ params }: Props) {
  const { id } = await params;
  const data = await ElectionPromise.find({
    politician:id
  })

  if (!data) {
    notFound();
  }

  // Handle both array directly or nested on the politician object
  const promiseList: AllPromise[] = Array.isArray(data)
    ? data
    : data.promises || [];

  if (promiseList.length === 0) {
    return (
      <div className="flex h-52 flex-col items-center justify-center rounded-2xl border border-[#0F3460]/80 bg-[#16213E]/60 p-6 text-center backdrop-blur-md">
        <ScrollText className="size-8 text-[#E94560] mb-2 opacity-80" />
        <p className="text-sm font-semibold text-[#F9F9F9]">
          No Manifesto Promises Found
        </p>
        <p className="text-xs text-[#F9F9F9]/50">
          No tracked election commitments have been documented yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-lg border border-[#0F3460] bg-[#0F3460]/60 text-[#E94560]">
          <ScrollText className="size-4" />
        </div>
        <div>
          <h2 className="text-base font-bold text-[#F9F9F9]">
            Manifesto Commitments & Tracking
          </h2>
          <p className="text-xs text-[#F9F9F9]/50">
            Audit of declared promises vs implementation milestones
          </p>
        </div>
      </div>

      {/* Stacked List of Cards */}
      <div className="flex flex-col space-y-4">
        {promiseList.map((promise) => {
          const promisedDate = formatDate(promise.date);
          const completedDate = formatDate(promise.completionDate);

          return (
            <Card
              key={promise._id}
              className="group rounded-2xl border border-[#0F3460]/80 bg-[#16213E]/80 backdrop-blur-md transition-all duration-200 hover:border-[#E94560]/50 hover:shadow-lg hover:shadow-black/20"
            >
              <CardHeader className="flex flex-row items-start justify-between gap-4 pb-2">
                <CardTitle className="text-base font-bold text-[#F9F9F9] transition-colors group-hover:text-[#E94560]">
                  {promise.title}
                </CardTitle>
                <div className="shrink-0">{getStatusBadge(promise.status)}</div>
              </CardHeader>

              <CardContent className="space-y-3 pt-0">
                {promise.description && (
                  <p className="text-xs leading-relaxed text-[#F9F9F9]/70">
                    {promise.description}
                  </p>
                )}

                {/* Timeline and Verification Links */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1 text-xs text-[#F9F9F9]/60">
                  {/* Promised Date */}
                  {promisedDate && (
                    <div className="flex items-center gap-1.5">
                      <Calendar className="size-3.5 text-[#E94560]" />
                      <span>
                        Promised:{" "}
                        <span className="font-medium text-[#F9F9F9]">
                          {promisedDate}
                        </span>
                      </span>
                    </div>
                  )}

                  {/* Completed Date */}
                  {completedDate && (
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5 text-emerald-400" />
                      <span>
                        Completed:{" "}
                        <span className="font-medium text-[#F9F9F9]">
                          {completedDate}
                        </span>
                      </span>
                    </div>
                  )}

                  {/* Verification Source Link */}
                  {promise.source && (
                    <a
                      href={
                        promise.source.startsWith("http")
                          ? promise.source
                          : `https://${promise.source}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-[#E94560] transition-colors hover:underline hover:text-[#E94560]/80 ml-auto"
                    >
                      <span>
                        Source:{" "}
                        {promise.source
                          .replace(/^https?:\/\//, "")
                          .split("/")[0]}
                      </span>
                      <ExternalLink className="size-3" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}