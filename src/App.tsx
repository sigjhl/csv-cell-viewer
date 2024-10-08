import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Plus, Minus } from 'lucide-react';

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => (
  <button
    {...props}
    className={`px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 ${className}`}
  >
    {children}
  </button>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input
    {...props}
    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${props.className}`}
  />
);

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
  <textarea
    {...props}
    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${props.className}`}
  />
);

const Alert: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-r-lg" role="alert">
    {children}
  </div>
);

interface CellPosition {
  row: number;
  col: number;
}

const App: React.FC = () => {
  const [csvData, setCsvData] = useState<string[][]>([]);
  const [currentCell, setCurrentCell] = useState<CellPosition>({ row: 0, col: 0 });
  const [fontSize, setFontSize] = useState<number>(16);
  const [error, setError] = useState<string | null>(null);

  const parseCSV = (text: string): string[][] => {
    const lines = text.split('\n');
    const result: string[][] = [];
    let currentRow: string[] = [];
    let inQuotes = false;
    let currentCell = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          currentRow.push(currentCell.trim());
          currentCell = '';
        } else {
          currentCell += char;
        }
      }

      if (!inQuotes) {
        currentRow.push(currentCell.trim());
        result.push(currentRow);
        currentRow = [];
        currentCell = '';
      } else {
        currentCell += '\n';
      }
    }

    if (currentRow.length > 0 || currentCell.length > 0) {
      currentRow.push(currentCell.trim());
      result.push(currentRow);
    }

    return result;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setError('No file selected');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result;
        if (typeof content === 'string') {
          const parsedData = parseCSV(content);
          setCsvData(parsedData);
          setError(null);
        } else {
          throw new Error('Invalid file content');
        }
      } catch (err) {
        console.error('Error parsing CSV:', err);
        setError('Error parsing CSV file');
      }
    };
    reader.onerror = (e) => {
      console.error('File reading error:', e);
      setError('Error reading file');
    };
    reader.readAsText(file);
  };

  const navigate = useCallback((rowDelta: number, colDelta: number) => {
    setCurrentCell(prev => ({
      row: Math.max(0, Math.min(prev.row + rowDelta, csvData.length - 1)),
      col: Math.max(0, Math.min(prev.col + colDelta, (csvData[prev.row] || []).length - 1))
    }));
  }, [csvData]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
        e.preventDefault(); // Prevent default scrolling behavior
        break;
    }

    switch (e.key) {
      case 'ArrowUp': navigate(-1, 0); break;
      case 'ArrowDown': navigate(1, 0); break;
      case 'ArrowLeft': navigate(0, -1); break;
      case 'ArrowRight': navigate(0, 1); break;
    }
  }, [navigate]);
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const changeFontSize = (delta: number) => {
    setFontSize(prev => Math.max(8, Math.min(prev + delta, 32)));
  };

  const getExcelColumnName = (columnIndex: number): string => {
    let columnName = '';
    let index = columnIndex;
    while (index >= 0) {
      columnName = String.fromCharCode(65 + (index % 26)) + columnName;
      index = Math.floor(index / 26) - 1;
    }
    return columnName;
  };

  const currentCellAddress = `${getExcelColumnName(currentCell.col)}${currentCell.row + 1}`;

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">CSV Viewer</h1>
            
            <Input type="file" accept=".csv" onChange={handleFileUpload} className="mb-6" />
            
            {error && (
              <Alert>
                <p>{error}</p>
              </Alert>
            )}

            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center space-x-4">
                <Button onClick={() => changeFontSize(-2)}><Minus size={16} /></Button>
                <span className="text-gray-700 font-medium">Font Size: {fontSize}px</span>
                <Button onClick={() => changeFontSize(2)}><Plus size={16} /></Button>
              </div>
            </div>

            <div className="flex justify-center space-x-4 mb-6">
              <Button onClick={() => navigate(0, -1)}><ChevronLeft size={24} /></Button>
              <Button onClick={() => navigate(-1, 0)}><ChevronUp size={24} /></Button>
              <Button onClick={() => navigate(1, 0)}><ChevronDown size={24} /></Button>
              <Button onClick={() => navigate(0, 1)}><ChevronRight size={24} /></Button>
            </div>

            {csvData.length > 0 && (
              <div>
                <p className="mb-2 text-lg font-semibold text-gray-700">Current Cell: {currentCellAddress}</p>
                <Textarea
                  value={csvData[currentCell.row]?.[currentCell.col] || ''}
                  readOnly
                  className="w-full h-64 mb-4"
                  style={{ fontSize: `${fontSize}px` }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;