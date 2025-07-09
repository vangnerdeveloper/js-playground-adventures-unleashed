
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Gamepad2, Target, Zap, Trophy, RefreshCw, Brain, Code2, Puzzle } from "lucide-react";
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
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

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
    },
    {
      code: `let isTrue = true;
let isFalse = false;
console.log(isTrue && isFalse);`,
      question: "What will this code output?",
      answer: "false",
      explanation: "true AND false = false"
    },
    {
      code: `let arr = [1, 2, 3];
arr.push(4);
console.log(arr.length);`,
      question: "What will this code output?",
      answer: "4",
      explanation: "Array had 3 elements, push() added 1 more, so length is 4"
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
          setSelectedGame(null);
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

  const startGame = (gameType: string) => {
    setSelectedGame(gameType);
    setGameStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswer("");
  };

  const resetGame = () => {
    setGameStarted(false);
    setSelectedGame(null);
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswer("");
  };

  if (!gameStarted) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Code Detective Game */}
        <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-purple-200 hover:border-purple-400 hover:-translate-y-2">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl group-hover:scale-110 transition-transform">
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
              <Button onClick={() => startGame('detective')} className="w-full bg-purple-600 hover:bg-purple-700 hover:scale-105 transition-all">
                <Gamepad2 className="h-4 w-4 mr-2" />
                Start Code Detective
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Syntax Speedrun */}
        <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-blue-200 hover:border-blue-400 hover:-translate-y-2">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-xl group-hover:scale-110 transition-transform">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Syntax Speedrun</CardTitle>
                <CardDescription>Fix JavaScript syntax errors as fast as you can!</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">⚡ Coming Soon:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Fix syntax errors quickly</li>
                  <li>• Race against the clock</li>
                  <li>• Multiple difficulty levels</li>
                  <li>• Earn speed bonuses</li>
                </ul>
              </div>
              <Button disabled className="w-full" variant="outline">
                <Zap className="h-4 w-4 mr-2" />
                Coming Soon!
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Logic Puzzle */}
        <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-green-200 hover:border-green-400 hover:-translate-y-2">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl group-hover:scale-110 transition-transform">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Logic Puzzles</CardTitle>
                <CardDescription>Solve programming logic challenges!</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">🧩 Coming Soon:</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Algorithm challenges</li>
                  <li>• Logic gate problems</li>
                  <li>• Pattern recognition</li>
                  <li>• Step-by-step solutions</li>
                </ul>
              </div>
              <Button disabled className="w-full" variant="outline">
                <Puzzle className="h-4 w-4 mr-2" />
                Coming Soon!
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Code Builder */}
        <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-orange-200 hover:border-orange-400 hover:-translate-y-2">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-xl group-hover:scale-110 transition-transform">
                <Code2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Code Builder</CardTitle>
                <CardDescription>Build code from visual blocks!</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-900 mb-2">🏗️ Coming Soon:</h4>
                <ul className="text-sm text-orange-800 space-y-1">
                  <li>• Drag & drop coding</li>
                  <li>• Visual programming</li>
                  <li>• Block-based challenges</li>
                  <li>• Code visualization</li>
                </ul>
              </div>
              <Button disabled className="w-full" variant="outline">
                <Code2 className="h-4 w-4 mr-2" />
                Coming Soon!
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Trivia Challenge */}
        <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-indigo-200 hover:border-indigo-400 hover:-translate-y-2">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-3 rounded-xl group-hover:scale-110 transition-transform">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">JS Trivia</CardTitle>
                <CardDescription>Test your JavaScript knowledge!</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="font-semibold text-indigo-900 mb-2">🧠 Coming Soon:</h4>
                <ul className="text-sm text-indigo-800 space-y-1">
                  <li>• Multiple choice questions</li>
                  <li>• Timed challenges</li>
                  <li>• Different categories</li>
                  <li>• Global leaderboard</li>
                </ul>
              </div>
              <Button disabled className="w-full" variant="outline">
                <Trophy className="h-4 w-4 mr-2" />
                Coming Soon!
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Memory Game */}
        <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-pink-200 hover:border-pink-400 hover:-translate-y-2">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-3 rounded-xl group-hover:scale-110 transition-transform">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Memory Match</CardTitle>
                <CardDescription>Match JavaScript concepts and syntax!</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-pink-50 p-4 rounded-lg">
                <h4 className="font-semibold text-pink-900 mb-2">🧩 Coming Soon:</h4>
                <ul className="text-sm text-pink-800 space-y-1">
                  <li>• Match code to concepts</li>
                  <li>• Memory training</li>
                  <li>• Progressive difficulty</li>
                  <li>• Streak bonuses</li>
                </ul>
              </div>
              <Button disabled className="w-full" variant="outline">
                <Brain className="h-4 w-4 mr-2" />
                Coming Soon!
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (selectedGame === 'detective') {
    const currentQ = codeQuestions[currentQuestion];

    return (
      <Card className="max-w-4xl mx-auto border-2 border-purple-400 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg animate-pulse">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle>Code Detective - Question {currentQuestion + 1}/{codeQuestions.length}</CardTitle>
                <CardDescription>What will this code output?</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-sm animate-bounce">
                Score: {score} points
              </Badge>
              <Button variant="outline" size="sm" onClick={resetGame} className="hover:scale-105 transition-transform">
                <RefreshCw className="h-4 w-4 mr-1" />
                Reset
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Code Display */}
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto hover:shadow-lg transition-shadow">
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
                className="bg-purple-600 hover:bg-purple-700 hover:scale-105 transition-all"
              >
                Submit
              </Button>
            </div>
          </div>

          {/* Progress */}
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500 animate-pulse"
              style={{ width: `${((currentQuestion + 1) / codeQuestions.length) * 100}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};
