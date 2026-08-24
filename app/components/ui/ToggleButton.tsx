import { useSidebar } from "@/components/ui/sidebar";
import { ToggleLeft, ToggleRight } from "lucide-react";

export function CustomTrigger() {
  const { toggleSidebar, open } = useSidebar();

  return (
    <button
      type="button"
      onClick={toggleSidebar}
      className="p-2 rounded-md hover:bg-accent transition-colors inline-flex items-center justify-center"
      aria-label="Toggle Sidebar"
    >
      {open ? <ToggleLeft className="h-5 w-5" /> : <ToggleRight className="h-5 w-5" />}
    </button>
  );
}
