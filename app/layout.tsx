import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import DashboardSidebar from "@/app/components/layout/Sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Know Your Neta | Political Insights",
  description: "Track track records, review performance ratings, and explore voting histories.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body className="min-h-full bg-[#1A1A2E] text-[#F9F9F9]">
        <SidebarProvider defaultOpen={true}>
          <div className="flex min-h-screen w-full">

            <DashboardSidebar />

            <SidebarInset className="flex min-w-0 flex-1 flex-col bg-[#1A1A2E]">

              {/* <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-[#0F3460]/60 bg-[#1A1A2E]/80 px-4 backdrop-blur-md sm:px-6">
                <SidebarTrigger className="text-[#F9F9F9] hover:bg-[#0F3460]/50 hover:text-[#E94560]" />
                <div className="h-4 w-[1px] bg-[#0F3460]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#F9F9F9]/70">
                  Know Your Neta
                </span>
              </header> */}

              <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                {children}
              </main>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}