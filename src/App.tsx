import "./App.css";
import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import HeaderBar from "@/components/layout/HeaderBar";
import SqlEditor from "@/components/editor/SqlEditor";
import ResultsTable from "@/components/results/ResultsTable";
import { runQuery } from "@/services/db";

function App() {
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);

  const handleRunQuery = async () => {
    try {
      const result = await runQuery(query);
      if (result.length > 0) {
        const firstRow = result[0] as Record<string, unknown>;
        const cols = Object.keys(firstRow);
        setColumns(cols);
        setQueryResults(result);
      } else {
        setColumns([]);
        setQueryResults([]);
      }
    } catch (error) {
      console.log(error);
      setColumns([]);
      setQueryResults([]);
    }
  };

  return (
    <div className="h-screen w-full flex">
      <Sidebar />
      <div className="w-5/6 h-full">
        <HeaderBar onRunQuery={handleRunQuery} />
        <SqlEditor value={query} onChange={(val) => setQuery(val)} />
        <div className="h-[400px] border-t-2 p-4 overflow-auto">
          <ResultsTable columns={columns} rows={queryResults} />
        </div>
      </div>
    </div>
  );
}

export default App;
