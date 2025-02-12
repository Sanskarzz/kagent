import { useState, useRef, useEffect } from "react";
import { FunctionCall, FunctionExecutionResult } from "@/types/datamodel";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { FunctionSquare, CheckCircle, Clock, Code, ChevronUp, ChevronDown, Loader2, Text } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ToolDisplayProps {
  call: FunctionCall;
  result?: FunctionExecutionResult;
}
const ToolDisplay = ({ call, result }: ToolDisplayProps) => {
  const [areArgumentsExpanded, setAreArgumentsExpanded] = useState(false);
  const [areResultsExpanded, setAreResultsExpanded] = useState(false);

  const hasResult = result !== undefined;
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [result]);

  return (
    <Card className="w-full mx-auto my-1 bg-neutral-800 border-none rounded-none min-w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs text-white/70 flex space-x-5">
          <div className="flex items-center font-medium">
            <FunctionSquare className="w-4 h-4 mr-2" />
            {call.name}
          </div>
          <div className="font-light">{call.id}</div>
        </CardTitle>
        <div className="flex justify-center items-center text-white/50 text-xs">
          {hasResult ? (
            <>
              <CheckCircle className="w-3 h-3 inline-block mr-2 text-green-500" />
              Call completed
            </>
          ) : (
            <>
              <Clock className="w-3 h-3 inline-block mr-2 text-yellow-500" />
              Pending
            </>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div ref={contentRef} className="space-y-2 mt-4">
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto text-white/70 hover:bg-neutral-800 hover:text-white/90 justify-start"
              onClick={() => setAreArgumentsExpanded(!areArgumentsExpanded)}
            >
              <Code className="w-4 h-4 mr-2" />
              <span className="mr-2">Arguments</span>
              {areArgumentsExpanded ? <ChevronUp className="w-4 h-4 ml-auto" /> : <ChevronDown className="w-4 h-4 ml-auto" />}
            </Button>
            {areArgumentsExpanded && (
              <ScrollArea className="mt-2 p-4 bg-white/10 w-full" style={{ maxHeight: `calc(80vh - ${contentHeight}px)` }}>
                <pre className="text-xs text-white/70 whitespace-pre-wrap break-words">{call.arguments}</pre>
              </ScrollArea>
            )}
 
        </div>
        <div className="mt-4 w-full">
          {!hasResult && (
            <div className="flex items-center gap-2 text-white/50 py-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Executing...</span>
            </div>
          )}
          {hasResult && (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-auto text-white/70 hover:bg-neutral-800 hover:text-white/90 justify-start"
                onClick={() => setAreResultsExpanded(!areResultsExpanded)}
                >
                <Text className="w-4 h-4 mr-2" />
                <span className="mr-2">Results</span>
                {areResultsExpanded ? <ChevronUp className="w-4 h-4 ml-auto" /> : <ChevronDown className="w-4 h-4 ml-auto" />}
              </Button>
              {areResultsExpanded && (
                <ScrollArea className="max-h-96 overflow-y-auto p-4 bg-white/10 w-full mt-2">
                  <pre className="text-sm text-white/70 whitespace-pre-wrap break-words">{result.content}</pre>
                </ScrollArea>
              )}
              </>
        
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolDisplay;