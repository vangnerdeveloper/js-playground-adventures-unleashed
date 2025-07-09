
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Zap } from "lucide-react";

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  const getProgressMessage = (progress: number) => {
    if (progress === 0) return "Ready to start your JavaScript journey!";
    if (progress < 25) return "Getting started - great job!";
    if (progress < 50) return "Making good progress!";
    if (progress < 75) return "You're becoming a JS wizard!";
    if (progress < 100) return "Almost there, coding master!";
    return "Congratulations! You've mastered the basics!";
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            <span className="font-semibold text-gray-700">Learning Progress</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-600">{progress}% Complete</span>
          </div>
        </div>
        <Progress value={progress} className="h-3 mb-2" />
        <p className="text-sm text-gray-600 text-center">
          {getProgressMessage(progress)}
        </p>
      </CardContent>
    </Card>
  );
};
