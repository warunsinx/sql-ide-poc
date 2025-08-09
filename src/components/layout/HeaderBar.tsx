import * as React from "react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

type HeaderBarProps = {
  onRunQuery: () => void | Promise<void>;
};

function HeaderBar({ onRunQuery }: HeaderBarProps): React.ReactElement {
  return (
    <div className="h-[50px] w-full border-b-2 flex items-center justify-between px-2">
      <SidebarTrigger />
      <Button className="cursor-pointer" variant="outline" onClick={onRunQuery}>
        <p className="text-gray-700">Run Query</p>
      </Button>
    </div>
  );
}

export default HeaderBar;
