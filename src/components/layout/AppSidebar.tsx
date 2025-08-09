import * as React from "react";
import ConnectionList from "../connections/ConnectionList";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

function AppSidebar(): React.ReactElement {
  return (
    <Sidebar>
      <SidebarContent>
        <div className="w-full h-[100px] border-b-2 flex justify-center items-center">
          <p className="font-bold text-2xl text-gray-700 select-none">
            SHEETA.AI
          </p>
        </div>
        <ConnectionList />
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
