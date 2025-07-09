
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Play, RotateCcw, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CodeEditorProps {
  initialCode?: string;
  onRunSuccess?: () => void;
}

export const CodeEditor = ({ initialCode = "", onRunSuccess }: CodeEditorProps) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    setOutput([]);
    
    // Create a custom console.log to capture output
    const capturedLogs: string[] = [];
    const originalConsole = console.log;
    
    console.log = (...args) => {
      const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ');
      capturedLogs.push(message);
    };

    try {
      // Use Function constructor to execute code safely
      const func = new Function(code);
      func();
      
      setOutput(capturedLogs);
      
      if (capturedLogs.length > 0) {
        toast({
          title: "✨ Code executed successfully!",
          description: "Check the output below.",
          duration: 2000,
        });
        onRunSuccess?.();
      } else {
        toast({
          title: "Code ran without output",
          description: "Try adding console.log() statements to see results.",
          variant: "outline",
          duration: 2000,
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setOutput([`❌ Error: ${errorMessage}`]);
      toast({
        title: "Oops! There's an error",
        description: errorMessage,
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      // Restore original console.log
      console.log = originalConsole;
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput([]);
    toast({
      title: "Code reset",
      description: "Starting fresh with the original code.",
      duration: 1500,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Code Input */}
      <Card className="border-2 border-blue-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="ml-2 text-sm font-mono">script.js</span>
            </CardTitle>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetCode}
                disabled={isRunning}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button 
                onClick={runCode} 
                disabled={isRunning || !code.trim()}
                size="sm"
                className="bg-green-600 hover:bg-green-700"
              >
                <Play className="h-4 w-4 mr-1" />
                {isRunning ? "Running..." : "Run"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Write your JavaScript code here..."
            className="min-h-[300px] font-mono text-sm border-0 focus:ring-0 resize-none"
            style={{ backgroundColor: '#1e1e1e', color: '#d4d4d4' }}
          />
        </CardContent>
      </Card>

      {/* Output */}
      <Card className="border-2 border-green-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-mono">Console Output</span>
            {output.length > 0 && !output[0].startsWith('❌') && (
              <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm min-h-[300px] overflow-auto">
            {output.length === 0 ? (
              <div className="text-gray-500 italic">
                📟 Console output will appear here when you run your code...
              </div>
            ) : (
              <div className="space-y-1">
                {output.map((line, index) => (
                  <div key={index} className={line.startsWith('❌') ? 'text-red-400' : 'text-green-400'}>
                    <span className="text-gray-500 mr-2">&gt;</span>
                    {line}
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
