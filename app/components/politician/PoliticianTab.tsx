"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = [
    { label: "Overview", href: "" },
    { label: "Constituency", href: "/constituency" },
    { label: "Accountability", href: "/accountability" },
    { label: "Promises", href: "/promises" },
    { label: "Reviews", href: "/reviews" },
];

export default function PoliticianTabs() {
    const pathname = usePathname();
    const { id } = useParams<{ id: string }>();

    const base = `/politician/${id}`;

    return (
        <div className="flex overflow-x-auto border-b border-white/10">
            {tabs.map((tab) => {
                const href = base + tab.href;
                const isActive = pathname === href;

                return (
                    <Link
                        key={tab.label}
                        href={href}
                        className={cn(
                            "whitespace-nowrap border-b-2 px-4 py-2 text-sm font-medium",
                            isActive
                                ? "border-[#E94560] text-[#F9F9F9]"
                                : "border-transparent text-[#F9F9F9]/50 hover:text-[#F9F9F9]/80"
                        )}
                    >
                        {tab.label}
                    </Link>
                );
            })}
        </div>
    );
}