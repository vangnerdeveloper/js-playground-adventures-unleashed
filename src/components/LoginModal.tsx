
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { LogIn, User, Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (userName: string) => void;
}

export const LoginModal = ({ isOpen, onClose, onLogin }: LoginModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name to continue",
        variant: "destructive",
      });
      return;
    }

    onLogin(name);
    onClose();
    setName("");
    setEmail("");
    
    toast({
      title: "🎉 Welcome to JS Quest!",
      description: `Great to have you aboard, ${name}!`,
      duration: 3000,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
              <LogIn className="h-5 w-5 text-white" />
            </div>
            Join JS Quest
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">🚀 Start Your Journey</h4>
            <p className="text-sm text-blue-800">
              Create your account to track progress, earn achievements, and unlock advanced features!
            </p>
            <div className="flex gap-2 mt-3">
              <Badge variant="outline" className="text-xs">
                🏆 Progress Tracking
              </Badge>
              <Badge variant="outline" className="text-xs">
                🎖️ Achievements
              </Badge>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email (optional)
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Continue as Guest
            </Button>
            <Button onClick={handleLogin} className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600">
              Start Learning
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
