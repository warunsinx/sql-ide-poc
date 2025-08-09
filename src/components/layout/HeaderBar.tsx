import * as React from "react";
import { Button } from "@/components/ui/button";

type HeaderBarProps = {
  onRunQuery: () => void | Promise<void>;
};

function HeaderBar({ onRunQuery }: HeaderBarProps): React.ReactElement {
  return (
    <div className="h-[50px] w-full border-b-2 flex items-center justify-end px-5">
      <Button className="cursor-pointer" variant="outline" onClick={onRunQuery}>
        <p className="text-gray-700">Run Query</p>
      </Button>
    </div>
  );
}

export default HeaderBar;
