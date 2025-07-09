
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Gamepad2, Target, Zap, Trophy, RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface GameSectionProps {
  onScoreUpdate: (score: number) => void;
}

export const GameSection = ({ onScoreUpdate }: GameSectionProps) => {
  // Code Guessing Game State
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const codeQuestions = [
    {
      code: `let x = 5;
let y = 3;
console.log(x + y);`,
      question: "What will this code output?",
      answer: "8",
      explanation: "x (5) + y (3) = 8"
    },
    {
      code: `let name = "JavaScript";
console.log(name.length);`,
      question: "What will this code output?",
      answer: "10",
      explanation: "The string 'JavaScript' has 10 characters"
    },
    {
      code: `let numbers = [1, 2, 3, 4, 5];
console.log(numbers[2]);`,
      question: "What will this code output?",
      answer: "3",
      explanation: "Array index 2 contains the value 3 (arrays start at index 0)"
    },
    {
      code: `function greet(name) {
  return "Hello, " + name + "!";
}
console.log(greet("World"));`,
      question: "What will this code output?",
      answer: "Hello, World!",
      explanation: "The function concatenates 'Hello, ' + 'World' + '!' = 'Hello, World!'"
    }
  ];

  const checkAnswer = () => {
    const currentQ = codeQuestions[currentQuestion];
    const isCorrect = userAnswer.toLowerCase().trim() === currentQ.answer.toLowerCase();
    
    if (isCorrect) {
      const points = 5;
      setScore(prev => prev + points);
      onScoreUpdate(points);
      toast({
        title: "🎉 Correct!",
        description: currentQ.explanation,
        duration: 3000,
      });
      
      if (currentQuestion < codeQuestions.length - 1) {
        setTimeout(() => {
          setCurrentQuestion(prev => prev + 1);
          setUserAnswer("");
        }, 2000);
      } else {
        setTimeout(() => {
          toast({
            title: "🏆 Game Complete!",
            description: `Fantastic job! You scored ${score + points} points!`,
            duration: 4000,
          });
          setGameStarted(false);
        }, 2000);
      }
    } else {
      toast({
        title: "❌ Not quite right",
        description: `The correct answer is: ${currentQ.answer}. ${currentQ.explanation}`,
        variant: "destructive",
        duration: 4000,
      });
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswer("");
  };

  const resetGame = () => {
    setGameStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswer("");
  };

  if (!gameStarted) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Code Guessing Game */}
        <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-purple-200 hover:border-purple-400">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Code Detective</CardTitle>
                <CardDescription>Guess what the JavaScript code will output!</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">🕵️ How to Play:</h4>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• Look at the JavaScript code</li>
                  <li>• Predict what it will output</li>
                  <li>• Type your answer and submit</li>
                  <li>• Earn points for correct answers!</li>
                </ul>
              </div>
              <Button onClick={startGame} className="w-full bg-purple-600 hover:bg-purple-700">
                <Gamepad2 className="h-4 w-4 mr-2" />
                Start Code Detective
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* JS Trivia Game */}
        <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-blue-200 hover:border-blue-400">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-xl">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">JS Quick Quiz</CardTitle>
                <CardDescription>Test your JavaScript knowledge with rapid-fire questions!</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">⚡ Coming Soon:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Multiple choice questions</li>
                  <li>• Timed challenges</li>
                  <li>• Different difficulty levels</li>
                  <li>• Leaderboard competition</li>
                </ul>
              </div>
              <Button disabled className="w-full" variant="outline">
                <Trophy className="h-4 w-4 mr-2" />
                Coming Soon!
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQ = codeQuestions[currentQuestion];

  return (
    <Card className="max-w-4xl mx-auto border-2 border-purple-400 shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
              <Target className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle>Code Detective - Question {currentQuestion + 1}/{codeQuestions.length}</CardTitle>
              <CardDescription>What will this code output?</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-sm">
              Score: {score} points
            </Badge>
            <Button variant="outline" size="sm" onClick={resetGame}>
              <RefreshCw className="h-4 w-4 mr-1" />
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Code Display */}
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <pre className="whitespace-pre-wrap">{currentQ.code}</pre>
        </div>

        {/* Question */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold text-purple-900 mb-3">{currentQ.question}</h3>
          <div className="flex gap-3">
            <Input
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className="flex-1"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && userAnswer.trim()) {
                  checkAnswer();
                }
              }}
            />
            <Button 
              onClick={checkAnswer}
              disabled={!userAnswer.trim()}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Submit
            </Button>
          </div>
        </div>

        {/* Progress */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / codeQuestions.length) * 100}%` }}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
};
