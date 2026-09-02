"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star, PlusCircle, Loader2 } from "lucide-react";

interface CreateReviewDialogProps {
  politicianId: string;
}

interface RatingsState {
  overallRating: number;
  developmentRating: number;
  accessibilityRating: number;
  transparencyRating: number;
  infrastructureRating: number;
}

interface StarRatingInputProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
}

// Declared OUTSIDE of CreateReviewDialog so React doesn't recreate it on every render
function StarRatingInput({ label, value, onChange }: StarRatingInputProps) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-xs font-medium text-[#F9F9F9]/80">{label}</span>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="p-1 transition-transform hover:scale-110 focus:outline-none"
          >
            <Star
              className={`size-4 ${
                star <= value
                  ? "fill-amber-400 text-amber-400"
                  : "text-[#0F3460] hover:text-amber-400/50"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function CreateReviewDialog({
  politicianId,
}: CreateReviewDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [ratings, setRatings] = useState<RatingsState>({
    overallRating: 5,
    developmentRating: 5,
    accessibilityRating: 5,
    transparencyRating: 5,
    infrastructureRating: 5,
  });

  const [comment, setComment] = useState("");

  const handleRatingChange = (key: keyof RatingsState, value: number) => {
    setRatings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post(
        "http://localhost:3000/api/review",
        {
          politician: politicianId,
          ...ratings,
          comment: comment.trim() || undefined,
        },
        { withCredentials: true }
      );

      setOpen(false);
      setComment("");
      router.refresh();
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to submit review";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Notice: Button directly passed into DialogTrigger with no asChild type conflict */}
      <DialogTrigger asChild>
        <Button
          type="button"
          className="flex items-center gap-2 rounded-xl bg-[#E94560] px-4 py-2 text-xs font-semibold text-[#F9F9F9] shadow-md shadow-[#E94560]/20 transition-all hover:bg-[#E94560]/90"
        >
          <PlusCircle className="size-4" />
          <span>Write a Review</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="border border-[#0F3460] bg-[#16213E] text-[#F9F9F9] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-[#F9F9F9]">
            Submit Citizen Assessment
          </DialogTitle>
          <DialogDescription className="text-xs text-[#F9F9F9]/50">
            Rate this politician transparently across key governance metrics.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {error && (
            <div className="rounded-lg border border-[#E94560]/40 bg-[#E94560]/10 p-2.5 text-xs text-[#E94560]">
              {error}
            </div>
          )}

          {/* Metric Categories */}
          <div className="space-y-2 rounded-xl border border-[#0F3460]/60 bg-[#1A1A2E]/60 p-3">
            <StarRatingInput
              label="Overall Score"
              value={ratings.overallRating}
              onChange={(val) => handleRatingChange("overallRating", val)}
            />
            <StarRatingInput
              label="Infrastructure Delivery"
              value={ratings.infrastructureRating}
              onChange={(val) =>
                handleRatingChange("infrastructureRating", val)
              }
            />
            <StarRatingInput
              label="Regional Development"
              value={ratings.developmentRating}
              onChange={(val) => handleRatingChange("developmentRating", val)}
            />
            <StarRatingInput
              label="Public Accessibility"
              value={ratings.accessibilityRating}
              onChange={(val) =>
                handleRatingChange("accessibilityRating", val)
              }
            />
            <StarRatingInput
              label="Policy Transparency"
              value={ratings.transparencyRating}
              onChange={(val) => handleRatingChange("transparencyRating", val)}
            />
          </div>

          {/* Citizen Comment */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#F9F9F9]/70">
              Comment or Feedback (Optional)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              placeholder="Provide constructive feedback regarding constituency works..."
              className="w-full rounded-xl border border-[#0F3460] bg-[#1A1A2E]/80 p-3 text-xs text-[#F9F9F9] placeholder:text-[#F9F9F9]/30 focus:border-[#E94560] focus:outline-none focus:ring-1 focus:ring-[#E94560]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-[#0F3460] bg-transparent text-xs text-[#F9F9F9]/70 hover:bg-[#0F3460]/40 hover:text-[#F9F9F9]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-[#E94560] text-xs font-semibold text-[#F9F9F9] hover:bg-[#E94560]/90"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 size-3.5 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Post Review"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}