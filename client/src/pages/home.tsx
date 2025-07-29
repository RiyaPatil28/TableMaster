import { useState, useEffect } from "react";
import { Calculator, Search, ChevronLeft, ChevronRight, Printer, Share, Download, Lightbulb, HelpCircle, ShareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [selectedTable, setSelectedTable] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  // Generate array of numbers 1-50
  const tableNumbers = Array.from({ length: 50 }, (_, i) => i + 1);
  
  // Generate multiplication results for selected table
  const multiplicationResults = Array.from({ length: 10 }, (_, i) => ({
    multiplier: i + 1,
    result: selectedTable * (i + 1)
  }));

  const selectTable = (tableNumber: number) => {
    if (tableNumber < 1 || tableNumber > 50) return;
    setSelectedTable(tableNumber);
    setSearchValue(tableNumber.toString());
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    const numValue = parseInt(value);
    if (numValue >= 1 && numValue <= 50) {
      setSelectedTable(numValue);
    }
  };

  const handlePrevTable = () => {
    if (selectedTable > 1) {
      selectTable(selectedTable - 1);
    }
  };

  const handleNextTable = () => {
    if (selectedTable < 50) {
      selectTable(selectedTable + 1);
    }
  };

  useEffect(() => {
    setSearchValue(selectedTable.toString());
  }, [selectedTable]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-soft border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Calculator className="text-white text-lg" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-800">Multiplication Tables</h1>
                  <p className="text-sm text-gray-500">Tables 1-50 × 1-10</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                <Printer className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Table Selector */}
        <div className="mb-8">
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Select Multiplication Table</h2>
                  <p className="text-gray-500">Choose a number from 1 to 50 to view its multiplication table</p>
                </div>
                <div className="mt-4 sm:mt-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Quick jump:</span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200"
                      onClick={() => selectTable(5)}
                    >
                      5×
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200"
                      onClick={() => selectTable(10)}
                    >
                      10×
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200"
                      onClick={() => selectTable(25)}
                    >
                      25×
                    </Button>
                  </div>
                </div>
              </div>

              {/* Table Number Grid */}
              <div className="grid grid-cols-5 sm:grid-cols-10 lg:grid-cols-12 xl:grid-cols-15 gap-2 mb-6">
                {tableNumbers.map((num) => (
                  <Button
                    key={num}
                    variant={selectedTable === num ? "default" : "outline"}
                    className={`
                      aspect-square w-full font-medium transition-all duration-300 transform hover:scale-105
                      ${selectedTable === num 
                        ? "bg-blue-500 text-white hover:bg-blue-600" 
                        : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700 border-gray-200"
                      }
                    `}
                    onClick={() => selectTable(num)}
                  >
                    {num}
                  </Button>
                ))}
              </div>

              {/* Search Input */}
              <div className="max-w-md">
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="Enter table number (1-50)"
                    min="1"
                    max="50"
                    value={searchValue}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-10 pr-4 py-3 border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Multiplication Table Display */}
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  {selectedTable} × Times Table
                </h3>
                <p className="text-gray-500 mt-1">
                  Multiplication table for {selectedTable} from 1 to 10
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button className="bg-blue-500 text-white hover:bg-blue-600 flex items-center space-x-2">
                  <Printer className="h-4 w-4" />
                  <span className="hidden sm:inline">Printer</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Share className="h-4 w-4" />
                  <span className="hidden sm:inline">Share</span>
                </Button>
              </div>
            </div>

            {/* Multiplication Table Grid */}
            <div className="space-y-4">
              {multiplicationResults.map((row, index) => (
                <div
                  key={row.multiplier}
                  className={`
                    flex items-center justify-between p-4 rounded-lg border transition-all duration-300 group
                    ${index % 2 === 0 
                      ? "bg-gray-50 hover:bg-blue-50 border-gray-200 hover:border-blue-200" 
                      : "bg-white hover:bg-blue-50 border-gray-200 hover:border-blue-200"
                    }
                  `}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-blue-100 group-hover:bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-medium transition-colors duration-300">
                      {row.multiplier}
                    </div>
                    <div className="text-lg font-medium text-gray-700">
                      {selectedTable} × {row.multiplier}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                      {row.result}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Table Summary */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <Lightbulb className="text-white h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-blue-800">Quick Facts</h4>
                  <p className="text-blue-600 mt-1">
                    The multiplication table for {selectedTable} shows all products from {selectedTable} × 1 to {selectedTable} × 10.
                    Practice these regularly to improve your mental math skills!
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Controls */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <Button
            variant="outline"
            onClick={handlePrevTable}
            disabled={selectedTable <= 1}
            className="flex items-center space-x-2 px-6 py-3 shadow-soft disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous Table</span>
          </Button>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Navigate tables:</span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="w-8 h-8 p-0"
                onClick={() => selectTable(1)}
              >
                1
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-8 h-8 p-0"
                onClick={() => selectTable(5)}
              >
                5
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-8 h-8 p-0"
                onClick={() => selectTable(10)}
              >
                10
              </Button>
              <span className="text-gray-400">...</span>
              <Button
                variant="outline"
                size="sm"
                className="w-8 h-8 p-0"
                onClick={() => selectTable(50)}
              >
                50
              </Button>
            </div>
          </div>

          <Button
            onClick={handleNextTable}
            disabled={selectedTable >= 50}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white hover:bg-blue-600 shadow-soft disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Next Table</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-500">
              Multiplication Tables Application • Tables 1-50 × 1-10 • 
              <span className="text-blue-600"> Educational Tool</span>
            </p>
            <div className="mt-4 flex justify-center space-x-6">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-600">
                <HelpCircle className="h-4 w-4 mr-1" />
                Help
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-600">
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-600">
                <ShareIcon className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
