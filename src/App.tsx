import "./App.css";
import Sidebar from "@/components/layout/Sidebar";
import HeaderBar from "@/components/layout/HeaderBar";
import SqlEditor from "@/components/editor/SqlEditor";
import ResultsTable from "@/components/results/ResultsTable";
import { useQueryStore } from "@/stores/useQueryStore";

function App() {
  const { query, setQuery, rows, columns, runQuery } = useQueryStore();

  return (
    <div className="h-screen w-full flex">
      <Sidebar />
      <div className="w-5/6 h-full">
        <HeaderBar onRunQuery={runQuery} />
        <SqlEditor value={query} onChange={(val) => setQuery(val)} />
        <div className="h-[400px] border-t-2 p-4 overflow-auto">
          <ResultsTable columns={columns} rows={rows} />
        </div>
      </div>
    </div>
  );
}

export default App;
