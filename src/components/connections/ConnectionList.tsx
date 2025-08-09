import { useConnectionsStore } from "@/stores/useConnectionsStore";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { LucideDatabase } from "lucide-react";
import { cn } from "@/lib/utils";
import AddConnectionBtn from "./AddConnectionBtn";

export default function ConnectionList() {
  const { connections, activeConnectionId, setActiveConnection } =
    useConnectionsStore();

  return (
    <SidebarGroup>
      <AddConnectionBtn />
      <SidebarGroupLabel>Connections</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {connections.map((connection) => (
            <SidebarMenuItem key={connection.id}>
              <SidebarMenuButton
                disabled={activeConnectionId === connection.id}
                className={cn(
                  activeConnectionId === connection.id &&
                    "bg-amber-100 rounded-md hover:bg-amber-100 cursor-default",
                  "select-none"
                )}
                asChild
                onClick={() => setActiveConnection(connection.id)}
              >
                <div>
                  <LucideDatabase className="w-4 h-4 mr-2" />
                  <span>{connection.name}</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
