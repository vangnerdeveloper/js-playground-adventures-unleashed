
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Settings, Volume2, Palette, Monitor, Moon, Sun } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [volume, setVolume] = useState([75]);
  const { toast } = useToast();

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('jsquest-settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setSoundEnabled(settings.soundEnabled ?? true);
      setAnimationsEnabled(settings.animationsEnabled ?? true);
      setDarkMode(settings.darkMode ?? false);
      setVolume([settings.volume ?? 75]);
    }

    // Apply dark mode on load
    const isDark = localStorage.getItem('jsquest-settings') ? 
      JSON.parse(localStorage.getItem('jsquest-settings')!).darkMode : false;
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Play sound effect function
  const playSound = (frequency: number = 800, duration: number = 200) => {
    if (!soundEnabled) return;
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime((volume[0] / 100) * 0.1, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch (error) {
      console.log('Audio not supported in this environment');
    }
  };

  const handleSoundToggle = (enabled: boolean) => {
    setSoundEnabled(enabled);
    if (enabled) {
      playSound(600, 150);
      toast({
        title: "Sound Effects Enabled",
        description: "You'll now hear audio feedback for interactions",
      });
    } else {
      toast({
        title: "Sound Effects Disabled",
        description: "Audio feedback has been turned off",
      });
    }
  };

  const handleAnimationsToggle = (enabled: boolean) => {
    setAnimationsEnabled(enabled);
    playSound(500, 100);
    
    // Add/remove animation disable class to body
    if (!enabled) {
      document.body.classList.add('animations-disabled');
    } else {
      document.body.classList.remove('animations-disabled');
    }
    
    toast({
      title: enabled ? "Animations Enabled" : "Animations Disabled",
      description: enabled ? "Smooth animations are now active" : "Animations have been reduced",
    });
  };

  const handleDarkModeToggle = (enabled: boolean) => {
    setDarkMode(enabled);
    playSound(enabled ? 400 : 800, 150);
    
    // Toggle dark mode class on document
    if (enabled) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    toast({
      title: enabled ? "Dark Mode Enabled" : "Light Mode Enabled",
      description: enabled ? "Switched to dark theme" : "Switched to light theme",
    });
  };

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume);
    playSound(600 + (newVolume[0] * 2), 100);
  };

  const saveSettings = () => {
    const settings = {
      soundEnabled,
      animationsEnabled,
      darkMode,
      volume: volume[0]
    };
    
    localStorage.setItem('jsquest-settings', JSON.stringify(settings));
    playSound(800, 200);
    
    toast({
      title: "Settings Saved",
      description: "Your preferences have been saved successfully",
    });
    
    onClose();
  };

  const resetSettings = () => {
    setSoundEnabled(true);
    setAnimationsEnabled(true);
    setDarkMode(false);
    setVolume([75]);
    
    // Reset visual changes
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('animations-disabled');
    
    localStorage.removeItem('jsquest-settings');
    playSound(300, 300);
    
    toast({
      title: "Settings Reset",
      description: "All settings have been restored to defaults",
    });
  };

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
                onCheckedChange={handleDarkModeToggle}
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
                onCheckedChange={handleAnimationsToggle}
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
                onCheckedChange={handleSoundToggle}
              />
            </div>

            {soundEnabled && (
              <div className="space-y-2">
                <Label>Volume: {volume[0]}%</Label>
                <Slider
                  value={volume}
                  onValueChange={handleVolumeChange}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" onClick={resetSettings} className="flex-1">
              Reset to Defaults
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={saveSettings} className="flex-1">
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
