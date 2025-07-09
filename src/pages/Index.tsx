
import { useState } from "react";
import { CodeEditor } from "@/components/CodeEditor";
import { LessonCard } from "@/components/LessonCard";
import { GameSection } from "@/components/GameSection";
import { Navigation } from "@/components/Navigation";
import { ProgressBar } from "@/components/ProgressBar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Code, Trophy, BookOpen, Zap } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("learn");
  const [userProgress, setUserProgress] = useState(0);

  const lessons = [
    {
      id: 1,
      title: "Variables & Data Types",
      description: "Learn about let, const, and var declarations",
      difficulty: "Beginner",
      completed: false,
      code: `// Welcome to JavaScript Variables!
let playerName = "CodeWarrior";
const maxHealth = 100;
var score = 0;

console.log("Player:", playerName);
console.log("Health:", maxHealth);
console.log("Score:", score);`
    },
    {
      id: 2,
      title: "Functions & Methods",
      description: "Create reusable code blocks",
      difficulty: "Beginner",
      completed: false,
      code: `// Functions are like magic spells!
function castSpell(spellName, damage) {
  return \`✨ \${spellName} deals \${damage} damage!\`;
}

const fireball = castSpell("Fireball", 25);
console.log(fireball);

// Arrow functions are shorter spells
const heal = (amount) => \`❤️ Healed for \${amount} HP\`;
console.log(heal(15));`
    },
    {
      id: 3,
      title: "Arrays & Loops",
      description: "Handle collections of data",
      difficulty: "Intermediate",
      completed: false,
      code: `// Arrays are like treasure chests!
const treasures = ["💎", "🏆", "💰", "⭐", "🎁"];

// For loop - traditional way
for (let i = 0; i < treasures.length; i++) {
  console.log(\`Found treasure \${i + 1}: \${treasures[i]}\`);
}

// forEach - modern way
treasures.forEach((treasure, index) => {
  console.log(\`Treasure \${index + 1}: \${treasure}\`);
});`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl">
              <Code className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              JS Quest
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Embark on an epic coding adventure! Learn JavaScript through interactive games, 
            challenges, and hands-on coding experiences.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Badge variant="outline" className="text-sm px-3 py-1">
              <Play className="h-4 w-4 mr-1" />
              Interactive Learning
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              <Trophy className="h-4 w-4 mr-1" />
              Gamified Experience
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              <Zap className="h-4 w-4 mr-1" />
              Real-time Feedback
            </Badge>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-8">
          <ProgressBar progress={userProgress} />
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="learn" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Learn
            </TabsTrigger>
            <TabsTrigger value="practice" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              Practice
            </TabsTrigger>
            <TabsTrigger value="games" className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Games
            </TabsTrigger>
          </TabsList>

          <TabsContent value="learn" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lessons.map((lesson) => (
                <LessonCard 
                  key={lesson.id} 
                  lesson={lesson}
                  onComplete={(id) => {
                    console.log(`Lesson ${id} completed!`);
                    setUserProgress(prev => Math.min(prev + 10, 100));
                  }}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="practice" className="space-y-6">
            <Card className="border-2 border-dashed border-blue-200 hover:border-blue-400 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-blue-500" />
                  Interactive Code Editor
                </CardTitle>
                <CardDescription>
                  Write and run JavaScript code in real-time. See your code come to life!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CodeEditor 
                  initialCode={`// Welcome to the JavaScript playground!
// Try writing some code and hit "Run" to see the magic happen ✨

let greeting = "Hello, JavaScript World!";
console.log(greeting);

// Create a simple function
function celebrateSuccess() {
  return "🎉 You're coding like a pro! 🎉";
}

console.log(celebrateSuccess());

// Try changing the code above and see what happens!`}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="games" className="space-y-6">
            <GameSection onScoreUpdate={(score) => {
              setUserProgress(prev => Math.min(prev + score, 100));
            }} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
