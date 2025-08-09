import "./App.css";
import HeaderBar from "@/components/layout/HeaderBar";
import SqlEditor from "@/components/editor/SqlEditor";
import ResultsTable from "@/components/results/ResultsTable";
import { useSheetaStore } from "@/stores/useSheetaStore";
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

function App() {
  const { query, setQuery, rows, columns, runQuery } = useSheetaStore();

  return (
    <SidebarProvider>
      <div className="h-screen w-full flex">
        <Toaster />
        <AppSidebar />
        <main className="w-full overflow-hidden">
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={70}>
              <HeaderBar onRunQuery={runQuery} />
              <SqlEditor value={query} onChange={(val) => setQuery(val)} />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={35}>
              <ResultsTable columns={columns} rows={rows} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default App;
