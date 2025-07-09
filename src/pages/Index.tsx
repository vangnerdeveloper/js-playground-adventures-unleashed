
import { useState } from "react";
import { CodeEditor } from "@/components/CodeEditor";
import { LessonCard } from "@/components/LessonCard";
import { GameSection } from "@/components/GameSection";
import { Navigation } from "@/components/Navigation";
import { ProgressBar } from "@/components/ProgressBar";
import { LoginModal } from "@/components/LoginModal";
import { SettingsModal } from "@/components/SettingsModal";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Code, Trophy, BookOpen, Zap } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("learn");
  const [userProgress, setUserProgress] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const lessons = [
    {
      id: 1,
      title: "Variables & Data Types",
      description: "Learn about let, const, and var declarations",
      difficulty: "Beginner",
      completed: completedLessons.includes(1),
      code: `// Welcome to JavaScript Variables!
let playerName = "CodeWarrior";
const maxHealth = 100;
var score = 0;

console.log("Player:", playerName);
console.log("Health:", maxHealth);
console.log("Score:", score);

// Try changing the values and see what happens!`
    },
    {
      id: 2,
      title: "Functions & Methods",
      description: "Create reusable code blocks",
      difficulty: "Beginner",
      completed: completedLessons.includes(2),
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
      difficulty: "Beginner",
      completed: completedLessons.includes(3),
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
    },
    {
      id: 4,
      title: "Objects & Properties",
      description: "Work with JavaScript objects",
      difficulty: "Beginner",
      completed: completedLessons.includes(4),
      code: `// Objects are like character profiles!
const hero = {
  name: "JavaScript Warrior",
  level: 1,
  skills: ["coding", "debugging", "problem-solving"],
  equipment: {
    weapon: "Keyboard of Power",
    armor: "Shield of Syntax"
  }
};

console.log(\`Hero: \${hero.name}\`);
console.log(\`Level: \${hero.level}\`);
console.log(\`Weapon: \${hero.equipment.weapon}\`);

// Add new properties
hero.experience = 100;
console.log("Experience:", hero.experience);`
    },
    {
      id: 5,
      title: "Conditional Statements",
      description: "Make decisions with if/else",
      difficulty: "Beginner",
      completed: completedLessons.includes(5),
      code: `// Conditional logic for game decisions!
const playerHealth = 75;
const enemyPower = 30;

if (playerHealth > 50) {
  console.log("💪 You're feeling strong!");
} else if (playerHealth > 20) {
  console.log("⚠️ You're getting weak, be careful!");
} else {
  console.log("💀 Critical health! Find a potion!");
}

// Ternary operator - short form
const battleResult = playerHealth > enemyPower ? "Victory! 🏆" : "Retreat! 🏃";
console.log(battleResult);`
    },
    {
      id: 6,
      title: "DOM Manipulation",
      description: "Interact with web page elements",
      difficulty: "Intermediate",
      completed: completedLessons.includes(6),
      code: `// DOM manipulation - controlling the web page!
// Note: These would work in a real web page

// Find elements
// const button = document.getElementById('myButton');
// const title = document.querySelector('h1');

// Change content
// title.textContent = 'JavaScript Magic! ✨';

// Add event listeners
// button.addEventListener('click', function() {
//   console.log('Button clicked! 🖱️');
// });

// For demonstration, let's simulate:
console.log("🎭 DOM Manipulation Examples:");
console.log("- Change text content");
console.log("- Add event listeners"); 
console.log("- Create new elements");
console.log("- Modify styles");`
    },
    {
      id: 7,
      title: "Async Programming",
      description: "Handle asynchronous operations",
      difficulty: "Intermediate",
      completed: completedLessons.includes(7),
      code: `// Async programming - handling delayed operations!

// Promises - like waiting for a quest reward
const fetchTreasure = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("🏆 Legendary Sword obtained!");
    }, 2000);
  });
};

// Using async/await
async function goOnQuest() {
  console.log("🗺️ Starting quest...");
  console.log("⏳ Searching for treasure...");
  
  const treasure = await fetchTreasure();
  console.log(treasure);
  console.log("✅ Quest completed!");
}

goOnQuest();`
    },
    {
      id: 8,
      title: "Error Handling",
      description: "Handle errors gracefully",
      difficulty: "Intermediate",
      completed: completedLessons.includes(8),
      code: `// Error handling - surviving coding battles!

function divideNumbers(a, b) {
  try {
    if (b === 0) {
      throw new Error("⚠️ Cannot divide by zero!");
    }
    const result = a / b;
    console.log(\`\${a} ÷ \${b} = \${result}\`);
    return result;
  } catch (error) {
    console.log("💥 Error caught:", error.message);
    return null;
  } finally {
    console.log("🔄 Division operation completed");
  }
}

// Test the function
divideNumbers(10, 2);  // Works fine
divideNumbers(10, 0);  // Throws error but we handle it!`
    }
  ];

  const calculateProgress = () => {
    return Math.round((completedLessons.length / lessons.length) * 100);
  };

  const handleLessonComplete = (id: number) => {
    if (!completedLessons.includes(id)) {
      setCompletedLessons(prev => [...prev, id]);
      setUserProgress(calculateProgress());
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10">
        <Navigation 
          isLoggedIn={isLoggedIn}
          userName={userName}
          onLoginClick={() => setIsLoginOpen(true)}
          onSettingsClick={() => setIsSettingsOpen(true)}
        />
        
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl animate-pulse">
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
              <Badge variant="outline" className="text-sm px-3 py-1 hover:scale-105 transition-transform">
                <Play className="h-4 w-4 mr-1" />
                Interactive Learning
              </Badge>
              <Badge variant="outline" className="text-sm px-3 py-1 hover:scale-105 transition-transform">
                <Trophy className="h-4 w-4 mr-1" />
                Gamified Experience
              </Badge>
              <Badge variant="outline" className="text-sm px-3 py-1 hover:scale-105 transition-transform">
                <Zap className="h-4 w-4 mr-1" />
                Real-time Feedback
              </Badge>
            </div>
          </div>

          {/* Progress Section */}
          <div className="mb-8">
            <ProgressBar progress={calculateProgress()} completedLessons={completedLessons.length} totalLessons={lessons.length} />
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
                    onComplete={handleLessonComplete}
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

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)}
        onLogin={(name) => {
          setIsLoggedIn(true);
          setUserName(name);
        }}
      />
      
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </div>
  );
};

export default Index;
