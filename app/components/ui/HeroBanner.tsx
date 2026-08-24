import { Search, Sparkles, TrendingUp, ShieldCheck, ArrowRight } from "lucide-react";

export function HeroBanner() {
  return (
    <div className="relative mb-8 overflow-hidden rounded-2xl border border-[#0F3460]/80 bg-gradient-to-br from-[#16213E] via-[#16213E]/90 to-[#1A1A2E] p-8 shadow-2xl backdrop-blur-md md:p-10">
      {/* Subtle Ambient Radial Glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-[#E94560]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 size-72 rounded-full bg-[#0F3460]/40 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Main Text Content */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0F3460] bg-[#1A1A2E]/80 px-3.5 py-1 text-xs font-medium text-[#E94560] shadow-sm backdrop-blur-sm">
            <Sparkles className="size-3.5 animate-pulse" />
            <span>Empowering Citizen Accountability</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-[#F9F9F9] sm:text-4xl lg:text-5xl lg:leading-tight">
            Know your <span className="text-[#E94560]">representatives.</span> <br className="hidden sm:inline" />
            Understand their <span className="underline decoration-[#0F3460] decoration-wavy underline-offset-8">work.</span>
          </h1>

          <p className="text-sm text-[#F9F9F9]/70 sm:text-base leading-relaxed">
            Track track records, review performance ratings, and explore voting histories across all constituencies in real time.
          </p>
        </div>

        {/* Action & Stats Card */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
          {/* <div className="flex items-center gap-4 rounded-xl border border-[#0F3460]/70 bg-[#1A1A2E]/70 p-4 backdrop-blur-sm">
            <div className="flex size-10 items-center justify-center rounded-lg bg-[#0F3460]/50 text-[#E94560]">
              <TrendingUp className="size-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-[#F9F9F9]">543+</div>
              <div className="text-xs text-[#F9F9F9]/60">Monitored Leaders</div>
            </div>
          </div> */}

          {/* <div className="flex items-center gap-4 rounded-xl border border-[#0F3460]/70 bg-[#1A1A2E]/70 p-4 backdrop-blur-sm">
            <div className="flex size-10 items-center justify-center rounded-lg bg-[#0F3460]/50 text-[#E94560]">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-[#F9F9F9]">100%</div>
              <div className="text-xs text-[#F9F9F9]/60">Verified Records</div>
            </div>
          </div> */}
        </div>
      </div>

      {/* Quick Search Bar */}
      {/* <div className="relative z-10 mt-8 max-w-xl">
        <div className="relative flex items-center">
          <Search className="absolute left-4 size-5 text-[#F9F9F9]/50" />
          <input
            type="text"
            placeholder="Search by politician name, party, or constituency..."
            className="w-full rounded-xl border border-[#0F3460] bg-[#1A1A2E]/90 py-3.5 pl-12 pr-28 text-sm text-[#F9F9F9] placeholder-[#F9F9F9]/40 outline-none transition-all focus:border-[#E94560] focus:ring-2 focus:ring-[#E94560]/20"
          />
          <button className="absolute right-2 inline-flex items-center gap-1.5 rounded-lg bg-[#E94560] px-4 py-2 text-xs font-semibold text-[#F9F9F9] shadow-md transition-all hover:bg-[#E94560]/90 active:scale-95">
            <span>Explore</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      </div> */}
    </div>
  );
}