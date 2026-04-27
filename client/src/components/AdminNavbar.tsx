import { motion } from "framer-motion";
import { Menu, X, LogOut, Settings, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminNavbarProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onLogout: () => void;
}

export function AdminNavbar({ sidebarOpen, onToggleSidebar, onLogout }: AdminNavbarProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-40 border-b border-white/10 bg-background/95 backdrop-blur-xl"
    >
      <div className="px-4 md:px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors md:hidden"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <h1 className="text-xl font-bold text-white hidden sm:block">
                Shxdowmouse Admin
              </h1>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-white/70 hover:text-white hidden sm:flex"
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm">Settings</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10"
              onClick={onLogout}
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
