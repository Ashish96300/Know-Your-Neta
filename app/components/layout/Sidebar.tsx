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
  SidebarProvider,
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

      <Sidebar collapsible="icon" className="bg-sidebar/20 backdrop-blur-md border-r border-sidebar-border">
        {/* App Branding */}
        <SidebarHeader className="h-16 flex justify-center border-b border-sidebar-border">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" className="hover:bg-transparent">
                <div className="flex aspect-square size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                  <Vote className="size-5" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold tracking-tight">Know Your Neta</span>
                  <span className="truncate text-xs text-muted-foreground">Political Insights</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        {/* Navigation Content */}
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
              Overview
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton>
                            <Link
                                href={item.url}
                                className="flex h-8 w-full items-center gap-3 rounded-md px-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
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

        <SidebarSeparator />

        {/* User Footer Profile */}
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground border border-border">
                  <User className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium flex items-center gap-1.5">
                    Ashish Sen
                    <ShieldCheck className="size-3.5 text-blue-500" />
                  </span>
                  <span className="truncate text-xs text-muted-foreground">ashish@kyn.dev</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        {/* Drag / Hover Collapsible Rail */}
        <SidebarRail />
      </Sidebar>
  );
}