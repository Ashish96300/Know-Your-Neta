import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users2,
  Flag,
  MapPin,
  Vote,
  ChevronsUpDown,
  User,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: "Politicians",
    url: "/politician",
    icon: Users2,
  },
  {
    title: "Parties",
    url: "/parties",
    icon: Flag,
  },
  {
    title: "Constituencies",
    url: "/constituencies",
    icon: MapPin,
  },
];

export default function DashboardSidebar() {
  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-[#0F3460]/80 bg-[#16213E]/80 text-[#F9F9F9] backdrop-blur-md"
    >
      {/* App Branding */}
      <SidebarHeader className="flex h-16 justify-center border-b border-[#0F3460]/60">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="hover:bg-transparent">
              <div className="flex aspect-square size-9 items-center justify-center rounded-lg bg-[#E94560] text-[#F9F9F9] shadow-sm">
                <Vote className="size-5" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold tracking-tight text-[#F9F9F9]">
                  Know Your Neta
                </span>
                <span className="truncate text-xs text-[#F9F9F9]/60">
                  Political Insights
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Navigation Content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium uppercase tracking-wider text-[#F9F9F9]/50">
            Overview
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="hover:bg-[#0F3460]/60 text-[#F9F9F9]">
                    <Link
                      href={item.url}
                      className="flex h-8 w-full items-center gap-3 rounded-md px-2 text-sm font-medium text-[#F9F9F9] transition-colors hover:text-[#E94560]"
                    >
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator className="bg-[#0F3460]/60" />

      {/* User Footer Profile */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="hover:bg-[#0F3460]/60 transition-colors"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-full border border-[#0F3460] bg-[#0F3460] text-[#F9F9F9]">
                <User className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="flex items-center gap-1.5 truncate font-medium text-[#F9F9F9]">
                  Ashish Sen
                  <ShieldCheck className="size-3.5 text-[#E94560]" />
                </span>
                <span className="truncate text-xs text-[#F9F9F9]/60">
                  ashish@kyn.dev
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-[#F9F9F9]/50" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      {/* Drag / Hover Collapsible Rail */}
      <SidebarRail />
    </Sidebar>
  );
}