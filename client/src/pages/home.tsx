import { useState, useEffect } from "react";
import { Calculator, Printer, Download, Search, Lightbulb, Trophy, Star, Zap, BookOpen, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [highlightedCell, setHighlightedCell] = useState<string | null>(null);
  const [selectedEquation, setSelectedEquation] = useState<{row: number, col: number, result: number} | null>(null);
  const [showTips, setShowTips] = useState(false);
  const [completedTables, setCompletedTables] = useState<Set<number>>(new Set());
  const [currentStreak, setCurrentStreak] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);

  // Generate column headers (multipliers 1-10 for basic table)
  const columnHeaders = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  // Generate row headers (multiplicands 1-50)
  const rowHeaders = Array.from({ length: 50 }, (_, i) => i + 1);

  const handleCellClick = (row: number, col: number) => {
    const cellKey = `${row}-${col}`;
    const result = getCellValue(row, col);
    
    setHighlightedCell(highlightedCell === cellKey ? null : cellKey);
    setSelectedEquation({ row, col, result });
    setTotalClicks(prev => prev + 1);
    
    // Track completed tables (when user clicks all multipliers 1-10 for a row)
    const rowClicks = Array.from({length: 10}, (_, i) => `${row}-${i + 1}`);
    const currentRowComplete = rowClicks.every(key => 
      key === cellKey || completedTables.has(parseInt(key.split('-')[0]))
    );
    
    if (currentRowComplete && !completedTables.has(row)) {
      setCompletedTables(prev => new Set(prev).add(row));
      setCurrentStreak(prev => prev + 1);
    }
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    const numValue = parseInt(value);
    if (numValue >= 1 && numValue <= 50) {
      setHighlightedCell(`${numValue}-highlight`);
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

  const getFactorization = (num: number) => {
    const factors = [];
    for (let i = 1; i <= num; i++) {
      if (num % i === 0) factors.push(i);
    }
    return factors;
  };

  const getMathFact = (row: number, col: number, result: number) => {
    const facts = [
      `${row} × ${col} = ${result}`,
      `This equals ${result} units in total`,
      `You can think of it as ${row} groups of ${col}`,
      `Or ${col} groups of ${row}`,
      result % 2 === 0 ? `${result} is an even number` : `${result} is an odd number`,
      result > 100 ? `${result} is greater than 100!` : `${result} is less than 100`,
    ];
    return facts;
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
              {/* Stats Display */}
              <div className="hidden sm:flex items-center space-x-4 mr-4">
                <div className="flex items-center space-x-2">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                    {completedTables.size} Tables
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-blue-500" />
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {totalClicks} Clicks
                  </Badge>
                </div>
              </div>
              
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
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowTips(!showTips)}
                className="text-gray-400 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                <Lightbulb className="h-4 w-4" />
              </Button>
              
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
        
        {/* Tips Panel */}
        {showTips && (
          <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="text-white h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    💡 Learning Tips & Tricks
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700 dark:text-blue-300">
                    <div>
                      <p>🎯 <strong>Pattern Recognition:</strong> Look for patterns in the 5s (always end in 0 or 5) and 9s (digits add up to 9)!</p>
                    </div>
                    <div>
                      <p>🔢 <strong>Quick Tips:</strong> For 11s table, just repeat the digit (11×3=33, 11×4=44)</p>
                    </div>
                    <div>
                      <p>⚡ <strong>Squares:</strong> Same number × same number = perfect square (5×5=25)</p>
                    </div>
                    <div>
                      <p>🎨 <strong>Visual Learning:</strong> Click cells to see detailed breakdowns and fun facts!</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Equation Details Panel */}
        {selectedEquation && (
          <Card className="mb-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                    <Target className="text-white h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-green-800 dark:text-green-200">
                      {selectedEquation.row} × {selectedEquation.col} = {selectedEquation.result}
                    </h3>
                    <p className="text-green-600 dark:text-green-400">
                      Selected Multiplication
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-lg px-4 py-2">
                  Result: {selectedEquation.result}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-green-200 dark:border-green-700">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-blue-500" />
                    Math Facts
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    {getMathFact(selectedEquation.row, selectedEquation.col, selectedEquation.result).slice(0, 3).map((fact, idx) => (
                      <li key={idx}>• {fact}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-green-200 dark:border-green-700">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center">
                    <Star className="h-4 w-4 mr-2 text-yellow-500" />
                    Visual Breakdown
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <span className="w-4 h-4 bg-blue-500 rounded mr-2"></span>
                      <span>{selectedEquation.row} groups</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="w-4 h-4 bg-green-500 rounded mr-2"></span>
                      <span>{selectedEquation.col} items each</span>
                    </div>
                    <div className="flex items-center text-sm font-semibold">
                      <span className="w-4 h-4 bg-purple-500 rounded mr-2"></span>
                      <span>{selectedEquation.result} total items</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-green-200 dark:border-green-700">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center">
                    <Calculator className="h-4 w-4 mr-2 text-purple-500" />
                    Properties
                  </h4>
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <p>Factors: {getFactorization(selectedEquation.result).slice(0, 6).join(', ')}</p>
                    <p>Prime: {getFactorization(selectedEquation.result).length === 2 ? 'Yes' : 'No'}</p>
                    <p>Even/Odd: {selectedEquation.result % 2 === 0 ? 'Even' : 'Odd'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="shadow-soft">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="text-center flex-1">
                <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  MULTIPLICATION CHART 1-50
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  Click any cell to highlight • Search to find specific tables
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Progress value={(completedTables.size / 50) * 100} className="w-20" />
                <span className="text-xs text-gray-500">{Math.round((completedTables.size / 50) * 100)}%</span>
              </div>
            </div>
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
                          const isTableCompleted = completedTables.has(row);
                          const isSquare = row === col;
                          const isPerfectSquare = Math.sqrt(value) % 1 === 0;
                          
                          return (
                            <td
                              key={`${row}-${col}`}
                              className={`
                                w-16 h-12 text-center text-sm font-medium border border-gray-300 dark:border-gray-600 cursor-pointer transition-all duration-300 transform hover:scale-110 relative
                                ${isHighlighted 
                                  ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold shadow-lg scale-110 z-10" 
                                  : isTableCompleted
                                    ? "bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-700 text-green-800 dark:text-green-200 border-green-300 dark:border-green-600"
                                    : isSquare
                                      ? "bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-800 dark:to-orange-800 text-orange-800 dark:text-orange-200 border-orange-300 dark:border-orange-600"
                                      : isPerfectSquare
                                        ? "bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-800 dark:to-pink-800 text-purple-800 dark:text-purple-200 border-purple-300 dark:border-purple-600"
                                        : row % 2 === 0 
                                          ? "bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900" 
                                          : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900"
                                }
                                hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 group
                              `}
                              onClick={() => handleCellClick(row, col)}
                            >
                              <span className="relative z-10">{value}</span>
                              
                              {/* Special indicators */}
                              {isSquare && (
                                <div className="absolute top-0 right-0 w-2 h-2 bg-yellow-500 rounded-full transform translate-x-1 -translate-y-1"></div>
                              )}
                              {isPerfectSquare && !isSquare && (
                                <div className="absolute top-0 right-0 w-2 h-2 bg-purple-500 rounded-full transform translate-x-1 -translate-y-1"></div>
                              )}
                              {isTableCompleted && (
                                <div className="absolute top-0 left-0 w-3 h-3 bg-green-500 rounded-full transform -translate-x-1 -translate-y-1 flex items-center justify-center">
                                  <Star className="w-2 h-2 text-white" />
                                </div>
                              )}
                              
                              {/* Hover tooltip effect */}
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
                                {row} × {col} = {value}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>

            {/* Enhanced Legend */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-center">🎨 Color Legend & Special Features</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded border relative">
                    <div className="absolute inset-0 animate-pulse bg-white opacity-20 rounded"></div>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Selected Cell</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gradient-to-br from-green-100 to-green-200 rounded border border-green-300 relative">
                    <Star className="w-2 h-2 text-green-600 absolute -top-1 -left-1" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Completed Tables</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gradient-to-br from-yellow-100 to-orange-100 rounded border border-orange-300 relative">
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Perfect Squares</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded border border-purple-300 relative">
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Square Numbers</span>
                </div>
              </div>
            </div>

            {/* Enhanced Instructions */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border-blue-200 dark:border-blue-700">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="text-white h-6 w-6" />
                  </div>
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Interactive Learning</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Click any cell to see detailed math facts, visual breakdowns, and number properties!
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border-green-200 dark:border-green-700">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Trophy className="text-white h-6 w-6" />
                  </div>
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Progress Tracking</h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Complete tables get special green highlighting and star indicators. Track your progress!
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 border-purple-200 dark:border-purple-700">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Lightbulb className="text-white h-6 w-6" />
                  </div>
                  <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Smart Features</h4>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    Perfect squares are highlighted in special colors. Hover over cells for quick tooltips!
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            {/* Stats Section */}
            <div className="text-center">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center justify-center">
                <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                Your Progress
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Tables Completed:</span>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    {completedTables.size}/50
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Clicks:</span>
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {totalClicks}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Progress:</span>
                  <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                    {Math.round((completedTables.size / 50) * 100)}%
                  </span>
                </div>
              </div>
            </div>
            
            {/* Fun Facts */}
            <div className="text-center">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center justify-center">
                <Star className="h-5 w-5 text-purple-500 mr-2" />
                Fun Math Facts
              </h4>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p>🎯 There are 500 total multiplication facts in this chart!</p>
                <p>⚡ Perfect squares: 1, 4, 9, 16, 25, 36, 49...</p>
                <p>🌟 The largest result is 50 × 10 = 500</p>
              </div>
            </div>
            
            {/* Learning Tips */}
            <div className="text-center">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center justify-center">
                <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
                Quick Learning Tips
              </h4>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p>🔢 Start with easier tables (2, 5, 10)</p>
                <p>🎨 Use the color coding to spot patterns</p>
                <p>📈 Track your progress with the completion badges</p>
              </div>
            </div>
          </div>
          
          <div className="text-center pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">
              Interactive Multiplication Chart • Tables 1-50 × 1-10 • 
              <span className="text-blue-600 dark:text-blue-400"> Enhanced Learning Experience</span>
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
              Click cells to explore, hover for quick facts, and track your learning progress!
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
