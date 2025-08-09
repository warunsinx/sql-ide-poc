import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ResultsTableProps = {
  columns: string[];
  rows: Array<Record<string, unknown>>;
};

function ResultsTable({
  columns,
  rows,
}: ResultsTableProps): React.ReactElement {
  if (!rows || rows.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <p>No results to display. Run a query to see results here.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column}>{column}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, index) => (
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
  );
}

export default ResultsTable;
