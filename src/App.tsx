import "./App.css";
import Editor from "@monaco-editor/react";
import { Button } from "./components/ui/button";
import { useState } from "react";
import Database from "@tauri-apps/plugin-sql";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";

function App() {
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);

  const handleRunQuery = async () => {
    try {
      const db = await Database.load(import.meta.env.VITE_DATABASE_URL);
      const result = await db.select(query);

      if (result && Array.isArray(result) && result.length > 0) {
        const firstRow = result[0];
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
      <div className="w-1/6 h-full border-r-2">
        <div className="w-full h-[100px] border-b-2 flex justify-center items-center">
          <p className="font-bold text-2xl text-gray-700 select-none">
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
        <div className="h-[400px] border-t-2 p-4 overflow-auto">
          {queryResults.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column) => (
                    <TableHead key={column}>{column}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {queryResults.map((row, index) => (
                  <TableRow key={index}>
                    {columns.map((column) => (
                      <TableCell key={column}>
                        {row[column] !== null && row[column] !== undefined
                          ? String(row[column])
                          : ""}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>No results to display. Run a query to see results here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
