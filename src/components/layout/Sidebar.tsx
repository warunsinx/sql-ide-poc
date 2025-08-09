import * as React from "react";
import AddConnectionBtn from "../connections/AddConnectionBtn";

function Sidebar(): React.ReactElement {
  return (
    <div className="w-1/6 h-full border-r-2">
      <div className="w-full h-[100px] border-b-2 flex justify-center items-center">
        <p className="font-bold text-2xl text-gray-700 select-none">
          SHEETA.AI
        </p>
      </div>
      <div className="w-full h-[100px] border-b-2 flex justify-center items-center">
        <AddConnectionBtn />
      </div>
    </div>
  );
}

export default Sidebar;
