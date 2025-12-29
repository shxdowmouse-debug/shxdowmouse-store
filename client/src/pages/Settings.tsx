import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Bell, Shield, Eye, Moon } from "lucide-react";

export default function Settings() {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container px-4 max-w-2xl mx-auto">
        <h1 className="text-4xl font-display font-bold text-white mb-2">Settings</h1>
        <p className="text-muted-foreground mb-8">Manage your preferences and site experience.</p>

        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-card border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-white">Notifications</h2>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base text-white">Product Updates</Label>
                  <p className="text-sm text-muted-foreground">Get notified about new releases</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base text-white">Newsletter</Label>
                  <p className="text-sm text-muted-foreground">Receive weekly digests</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className="bg-card border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-semibold text-white">Privacy</h2>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base text-white">Analytics</Label>
                  <p className="text-sm text-muted-foreground">Share anonymous usage data</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-card border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-semibold text-white">Appearance</h2>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between opacity-50 cursor-not-allowed">
                <div className="space-y-0.5">
                  <Label className="text-base text-white">Light Mode</Label>
                  <p className="text-sm text-muted-foreground">Toggle light appearance</p>
                </div>
                <Switch disabled />
              </div>
              <p className="text-xs text-muted-foreground">
                <Moon className="w-3 h-3 inline mr-1" />
                Shxdow is designed for the dark.
              </p>
            </div>
          </div>

          <div className="flex justify-end pt-4">
             <Button className="bg-primary hover:bg-primary/90 text-white font-semibold">
               Save Changes
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
