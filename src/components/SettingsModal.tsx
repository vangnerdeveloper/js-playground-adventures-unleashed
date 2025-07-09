
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Settings, Volume2, Palette, Monitor, Moon, Sun } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [volume, setVolume] = useState([75]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-gray-500 to-gray-700 p-2 rounded-lg">
              <Settings className="h-5 w-5 text-white" />
            </div>
            Settings
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Display Settings */}
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              Display
            </h4>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode" className="flex items-center gap-2 cursor-pointer">
                {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                Dark Mode
              </Label>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="animations" className="flex items-center gap-2 cursor-pointer">
                <Palette className="h-4 w-4" />
                Animations
              </Label>
              <Switch
                id="animations"
                checked={animationsEnabled}
                onCheckedChange={setAnimationsEnabled}
              />
            </div>
          </div>

          {/* Audio Settings */}
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <Volume2 className="h-4 w-4" />
              Audio
            </h4>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="sound" className="cursor-pointer">
                Sound Effects
              </Label>
              <Switch
                id="sound"
                checked={soundEnabled}
                onCheckedChange={setSoundEnabled}
              />
            </div>

            {soundEnabled && (
              <div className="space-y-2">
                <Label>Volume: {volume[0]}%</Label>
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={onClose} className="flex-1">
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
