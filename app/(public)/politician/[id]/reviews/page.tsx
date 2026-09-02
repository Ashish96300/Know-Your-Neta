import { getPolitician } from "@/lib/data/politician/politician";
import Review from "@/lib/models/Review";
import dbConnect from "@/lib/db/connectDB";
import { notFound } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Star, MessageSquare, PieChart as PieChartIcon, ShieldCheck } from "lucide-react";
import ReviewBreakdownPie from "./reviewChart";
import { Types } from "mongoose";
import CreateReviewDialog from "./createReview";

interface PoliticianReviewSummary {
  _id: Types.ObjectId | string;
  averageRating: number;
  reviewCount: number;
}

interface ReviewUser {
  _id: Types.ObjectId | string;
  name?: string;
  firstName?: string;
  lastName?: string;
}

interface ReviewDocument {
  _id: Types.ObjectId | string;
  politician: Types.ObjectId | string;
  user?: ReviewUser;
  overallRating: number;
  developmentRating: number;
  accessibilityRating: number;
  transparencyRating: number;
  infrastructureRating: number;
  comment?: string;
  createdAt?: Date | string;
}

interface Props {
  params: Promise<{
    id: string;
  }>;
}

// Converts "Ashish Sen" -> "Ashish S." or handles firstName + lastName
function formatCitizenName(user?: ReviewUser): string {
  if (!user) return "Verified Citizen";

  if (user.firstName) {
    const lastInitial = user.lastName ? ` ${user.lastName.charAt(0).toUpperCase()}.` : "";
    return `${user.firstName}${lastInitial}`;
  }

  if (user.name) {
    const parts = user.name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0];
    const first = parts[0];
    const lastInitial = parts[parts.length - 1].charAt(0).toUpperCase();
    return `${first} ${lastInitial}.`;
  }

  return "Verified Citizen";
}

export default async function Reviews({ params }: Props) {
  const { id } = await params;
  await dbConnect();

  const politician = (await getPolitician(id)) as PoliticianReviewSummary | null;

  if (!politician) {
    notFound();
  }

  // Populate user name fields
  const reviews = await Review.find({ politician: id })
    .populate("user", "name firstName lastName")
    .sort({ createdAt: -1 })
    .lean<ReviewDocument[]>();

  const totalReviews = reviews.length;
  const averages =
    totalReviews > 0
      ? {
          development:
            reviews.reduce((acc, r) => acc + (r.developmentRating ?? 0), 0) / totalReviews,
          accessibility:
            reviews.reduce((acc, r) => acc + (r.accessibilityRating ?? 0), 0) / totalReviews,
          transparency:
            reviews.reduce((acc, r) => acc + (r.transparencyRating ?? 0), 0) / totalReviews,
          infrastructure:
            reviews.reduce((acc, r) => acc + (r.infrastructureRating ?? 0), 0) / totalReviews,
        }
      : { development: 0, accessibility: 0, transparency: 0, infrastructure: 0 };

  return (
    <div className="space-y-6">
      {/* Top Review Metrics + Pie Chart */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="flex flex-col gap-4">
          <Card className="rounded-2xl border border-[#0F3460]/80 bg-[#16213E]/80 p-5 shadow-lg backdrop-blur-md">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#F9F9F9]/50">
              Average Citizen Rating
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <Star className="size-6 fill-amber-400 text-amber-400" />
              <span className="text-3xl font-bold tracking-tight text-[#F9F9F9]">
                {politician.averageRating ? politician.averageRating.toFixed(1) : "0.0"}
              </span>
              <span className="text-xs text-[#F9F9F9]/50">/ 5.0</span>
            </div>
          </Card>

          <Card className="rounded-2xl border border-[#0F3460]/80 bg-[#16213E]/80 p-5 shadow-lg backdrop-blur-md">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#F9F9F9]/50">
              Total Verified Reviews
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-[#E94560]">
                {politician.reviewCount ?? reviews.length}
              </span>
              <span className="text-xs text-[#F9F9F9]/50">submissions</span>
            </div>
          </Card>
        </div>

        <Card className="rounded-2xl border border-[#0F3460]/80 bg-[#16213E]/80 p-5 shadow-lg backdrop-blur-md md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between border-b border-[#0F3460]/60 p-0 pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-bold text-[#F9F9F9]">
              <PieChartIcon className="size-4 text-[#E94560]" />
              Sector Performance Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 pt-4">
            {reviews.length > 0 ? (
              <ReviewBreakdownPie averages={averages} />
            ) : (
              <p className="py-8 text-center text-xs text-[#F9F9F9]/40">
                Not enough category data for pie chart.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Stacked Individual Reviews Feed */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-lg border border-[#0F3460] bg-[#0F3460]/60 text-[#E94560]">
            <MessageSquare className="size-3.5" />
          </div>
          <h3 className="text-sm font-bold text-[#F9F9F9]">Public Reviews & Comments</h3>
        </div>
        <CreateReviewDialog politicianId={id} />
        {reviews.length === 0 ? (
          <div className="flex h-36 flex-col items-center justify-center rounded-2xl border border-[#0F3460]/80 bg-[#16213E]/60 text-center backdrop-blur-md">
            <p className="text-xs text-[#F9F9F9]/50">No reviews submitted yet for this representative.</p>
          </div>
        ) : (
          <div className="flex flex-col space-y-3">
            {reviews.map((review) => {
              const displayName = formatCitizenName(review.user);
              const initial = displayName.charAt(0).toUpperCase();

              return (
                <Card
                  key={review._id.toString()}
                  className="rounded-2xl border border-[#0F3460]/80 bg-[#16213E]/80 p-4 backdrop-blur-md transition-colors hover:border-[#0F3460]"
                >
                  {/* Top Bar: User Info & Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Avatar Circle with Initial */}
                      <div className="flex size-8 items-center justify-center rounded-full border border-[#0F3460] bg-[#0F3460]/60 text-xs font-bold text-[#E94560]">
                        {initial}
                      </div>

                      {/* Display Name + Verified Badge */}
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-[#F9F9F9]">
                            {displayName}
                          </span>
                          <ShieldCheck className="size-3.5 text-emerald-400" />
                        </div>
                        {review.createdAt && (
                          <span className="text-[10px] text-[#F9F9F9]/40">
                            {new Date(review.createdAt).toLocaleDateString("en-IN", {
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Score Tag */}
                    <div className="flex items-center gap-1 rounded-lg border border-[#0F3460] bg-[#1A1A2E]/80 px-2 py-0.5 text-xs font-bold text-amber-400">
                      <Star className="size-3 fill-amber-400" />
                      <span>{review.overallRating}/5</span>
                    </div>
                  </div>

                  {/* Review Text */}
                  {review.comment && (
                    <p className="mt-3 text-xs leading-relaxed text-[#F9F9F9]/80 pl-11">
                      {review.comment}
                    </p>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}