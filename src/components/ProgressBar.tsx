
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Zap, Trophy, Target } from "lucide-react";

interface ProgressBarProps {
  progress: number;
  completedLessons: number;
  totalLessons: number;
}

export const ProgressBar = ({ progress, completedLessons, totalLessons }: ProgressBarProps) => {
  const getProgressMessage = (progress: number) => {
    if (progress === 0) return "Ready to start your JavaScript journey!";
    if (progress < 25) return "Getting started - great job!";
    if (progress < 50) return "Making good progress!";
    if (progress < 75) return "You're becoming a JS wizard!";
    if (progress < 100) return "Almost there, coding master!";
    return "Congratulations! You've mastered the basics!";
  };

  const getProgressIcon = (progress: number) => {
    if (progress === 0) return <Target className="h-5 w-5 text-gray-500" />;
    if (progress < 50) return <Zap className="h-5 w-5 text-yellow-500 animate-pulse" />;
    if (progress < 100) return <Star className="h-5 w-5 text-blue-500 animate-bounce" />;
    return <Trophy className="h-5 w-5 text-gold-500 animate-pulse" />;
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 hover:shadow-lg transition-all duration-300">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {getProgressIcon(progress)}
            <span className="font-semibold text-gray-700">Learning Progress</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-600 bg-white/50 px-2 py-1 rounded-full">
              {completedLessons}/{totalLessons} Lessons
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-600">{progress}% Complete</span>
            </div>
          </div>
        </div>
        
        <Progress value={progress} className="h-3 mb-2" />
        
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {getProgressMessage(progress)}
          </p>
          
          {progress > 0 && (
            <div className="flex gap-1">
              {progress >= 25 && <div className="w-2 h-2 bg-green-400 rounded-full animate-ping" />}
              {progress >= 50 && <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping" />}
              {progress >= 75 && <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping" />}
              {progress === 100 && <div className="w-2 h-2 bg-gold-400 rounded-full animate-ping" />}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
