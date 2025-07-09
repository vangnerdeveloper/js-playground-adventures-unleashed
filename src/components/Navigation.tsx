
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, User, Settings, LogIn } from "lucide-react";

interface NavigationProps {
  isLoggedIn: boolean;
  userName: string;
  onLoginClick: () => void;
  onSettingsClick: () => void;
}

export const Navigation = ({ isLoggedIn, userName, onLoginClick, onSettingsClick }: NavigationProps) => {
  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg animate-pulse">
                <Trophy className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                JS Quest
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="hidden sm:flex animate-bounce">
              Level 1 Beginner
            </Badge>
            
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Welcome, {userName}!
                </Badge>
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="sm" onClick={onLoginClick} className="hover:scale-105 transition-transform">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}
            
            <Button variant="ghost" size="sm" onClick={onSettingsClick} className="hover:scale-105 transition-transform">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
