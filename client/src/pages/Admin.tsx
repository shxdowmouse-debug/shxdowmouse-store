import { useState, useEffect } from "react";
import { AdminLogin } from "@/components/AdminLogin";
import { AdminDashboard } from "@/components/AdminDashboard";

export default function AdminPage() {
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set page title
    document.title = "Admin Dashboard - shxdowmouse";
    
    // Check if admin token exists in localStorage
    const savedToken = localStorage.getItem("adminToken");
    if (savedToken) {
      setAdminToken(savedToken);
    }
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return adminToken ? (
    <AdminDashboard adminToken={adminToken} />
  ) : (
    <AdminLogin onLogin={setAdminToken} />
  );
}
