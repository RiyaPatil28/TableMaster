import { useState } from "react";
import { Calculator, Printer, Download, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [highlightedCell, setHighlightedCell] = useState<string | null>(null);

  // Generate column headers (multipliers 1-10 for basic table)
  const columnHeaders = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  // Generate row headers (multiplicands 1-50)
  const rowHeaders = Array.from({ length: 50 }, (_, i) => i + 1);

  const handleCellClick = (row: number, col: number) => {
    const cellKey = `${row}-${col}`;
    setHighlightedCell(highlightedCell === cellKey ? null : cellKey);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    const numValue = parseInt(value);
    if (numValue >= 1 && numValue <= 50) {
      // Highlight the row
      setHighlightedCell(`${numValue}-highlight`);
      // Scroll to the row
      const element = document.getElementById(`row-${numValue}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const getCellValue = (row: number, col: number) => row * col;

  const isCellHighlighted = (row: number, col: number) => {
    const cellKey = `${row}-${col}`;
    const rowHighlight = `${row}-highlight`;
    return highlightedCell === cellKey || highlightedCell === rowHighlight;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-soft border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Calculator className="text-white text-lg" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Multiplication Chart</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Tables 1-50 Complete Grid</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Input
                  type="number"
                  placeholder="Find table (1-50)"
                  min="1"
                  max="50"
                  value={searchValue}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 w-40 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100">
                <Printer className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="shadow-soft">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
              MULTIPLICATION CHART 1-50
            </CardTitle>
            <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
              Click any cell to highlight • Search to find specific tables
            </p>
          </CardHeader>
          <CardContent className="p-6">
            {/* Multiplication Table Grid */}
            <div className="overflow-auto max-h-[600px]">
              <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                {/* Header Row */}
                <thead className="sticky top-0 z-10">
                  <tr>
                    <th className="w-16 h-12 bg-gray-800 dark:bg-gray-700 text-white font-bold text-sm border border-gray-300 dark:border-gray-600">
                      ×
                    </th>
                    {columnHeaders.map((col) => (
                      <th
                        key={col}
                        className="w-16 h-12 bg-gray-800 dark:bg-gray-700 text-white font-bold text-sm border border-gray-300 dark:border-gray-600"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                
                {/* Table Body */}
                <tbody>
                  {rowHeaders.map((row) => (
                    <tr key={row} id={`row-${row}`}>
                      {/* Row Header */}
                      <th className="w-16 h-12 bg-gray-800 dark:bg-gray-700 text-white font-bold text-sm border border-gray-300 dark:border-gray-600">
                        {row}
                      </th>
                        
                        {/* Data Cells */}
                        {columnHeaders.map((col) => {
                          const value = getCellValue(row, col);
                          const isHighlighted = isCellHighlighted(row, col);
                          
                          return (
                            <td
                              key={`${row}-${col}`}
                              className={`
                                w-16 h-12 text-center text-sm font-medium border border-gray-300 dark:border-gray-600 cursor-pointer transition-all duration-200
                                ${isHighlighted 
                                  ? "bg-blue-500 text-white font-bold shadow-md transform scale-105" 
                                  : row % 2 === 0 
                                    ? "bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900" 
                                    : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900"
                                }
                              `}
                              onClick={() => handleCellClick(row, col)}
                            >
                              {value}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>

            {/* Legend */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-800 dark:bg-gray-700 rounded border"></div>
                  <span className="text-gray-700 dark:text-gray-300">Row/Column Headers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded border"></div>
                  <span className="text-gray-700 dark:text-gray-300">Selected Cell</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-50 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600"></div>
                  <span className="text-gray-700 dark:text-gray-300">Even Rows</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600"></div>
                  <span className="text-gray-700 dark:text-gray-300">Odd Rows</span>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-4 text-center text-gray-600 dark:text-gray-400 text-sm">
              <p>
                <strong>How to use:</strong> Click any cell to highlight it, or use the search box to find a specific table row.
                Each cell shows the result of multiplying the row number by the column number.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400">
              Complete Multiplication Chart • Tables 1-50 × Selected Multipliers • 
              <span className="text-blue-600 dark:text-blue-400"> Professional Mathematical Tool</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
