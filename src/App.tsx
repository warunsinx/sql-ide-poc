import "./App.css";
import Editor from "@monaco-editor/react";
import { Button } from "./components/ui/button";
import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");

  const handleRunQuery = () => {
    console.log(query);
  };

  return (
    <div className="h-screen w-full flex">
      <div className="w-1/6 h-full border-r-2">
        <div className="w-full h-[100px] border-b-2 flex justify-center items-center">
          <p className="font-bold text-4xl text-gray-700 select-none">
            SHEETA.AI
          </p>
        </div>
      </div>
      <div className="w-5/6 h-full">
        <div className="h-[50px] w-full border-b-2 flex items-center justify-end px-5">
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={handleRunQuery}
          >
            <p className="text-gray-700">Run Query</p>
          </Button>
        </div>
        <div className="h-[calc(100vh-450px)]">
          <Editor
            theme="light"
            defaultLanguage="sql"
            defaultValue=""
            onChange={(value) => setQuery(value || "")}
            value={query}
          />
        </div>
        <div className="h-[400px] border-t-2"></div>
      </div>
    </div>
  );
}

export default App;
