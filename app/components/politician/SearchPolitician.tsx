import { Search, Sparkles, TrendingUp, ShieldCheck, ArrowRight } from "lucide-react";

export default function SearchPolitician(){


    return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans bg-[#1A1A2E] text-white">
        <div className="relative z-10 mt-8 max-w-xl">
        <div className="relative flex items-center">
          <Search className="absolute left-4 size-5 text-[#F9F9F9]/50" />
          <input
            type="text"
            placeholder="Search by politician name, party, or constituency..."
            className="w-full rounded-xl border border-[#0F3460] bg-[#1A1A2E]/90 py-3.5 pl-12 pr-28 text-sm text-[#F9F9F9] placeholder-[#F9F9F9]/40 outline-none transition-all focus:border-[#E94560] focus:ring-2 focus:ring-[#E94560]/20"
          />
        </div>
        </div> 
    </div>
    )
}