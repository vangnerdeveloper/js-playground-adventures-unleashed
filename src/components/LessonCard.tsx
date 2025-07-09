
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CodeEditor } from "./CodeEditor";
import { Play, CheckCircle, Clock, BookOpen } from "lucide-react";

interface Lesson {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  completed: boolean;
  code: string;
}

interface LessonCardProps {
  lesson: Lesson;
  onComplete: (id: number) => void;
}

export const LessonCard = ({ lesson, onComplete }: LessonCardProps) => {
  const [isCompleted, setIsCompleted] = useState(lesson.completed);
  const [isOpen, setIsOpen] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleComplete = () => {
    setIsCompleted(true);
    onComplete(lesson.id);
    setIsOpen(false);
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-blue-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2 group-hover:text-blue-600 transition-colors">
              {lesson.title}
            </CardTitle>
            <CardDescription className="text-sm">
              {lesson.description}
            </CardDescription>
          </div>
          {isCompleted && (
            <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 ml-2" />
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-4">
          <Badge className={`text-xs px-2 py-1 ${getDifficultyColor(lesson.difficulty)}`}>
            {lesson.difficulty}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            <span>5-10 min</span>
          </div>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button 
              className="w-full group-hover:bg-blue-600 transition-colors" 
              variant={isCompleted ? "outline" : "default"}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              {isCompleted ? "Review Lesson" : "Start Learning"}
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Play className="h-5 w-5 text-blue-500" />
                {lesson.title}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <p className="text-gray-600">{lesson.description}</p>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">📝 Your Mission:</h4>
                <p className="text-blue-800 text-sm">
                  Run the code below to see how it works, then try modifying it to experiment 
                  with different values and see what happens!
                </p>
              </div>

              <CodeEditor 
                initialCode={lesson.code}
                onRunSuccess={() => {
                  // Auto-complete lesson when code runs successfully
                  if (!isCompleted) {
                    setTimeout(() => {
                      handleComplete();
                    }, 1000);
                  }
                }}
              />

              {!isCompleted && (
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                    Continue Later
                  </Button>
                  <Button onClick={handleComplete} className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark Complete
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
