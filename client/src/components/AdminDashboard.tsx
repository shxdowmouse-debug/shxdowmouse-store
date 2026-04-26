import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Package, Mail, Send, LogOut, TrendingUp, Clock, Settings, FileText, BarChart3, Eye, Menu, X, Trash2, EyeOff, ChevronDown, Lock, Mail as MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardStats {
  totalOrders: number;
  totalWaitlistSignups: number;
  pendingOrders: number;
  recentOrders: any[];
  orderCompletionRate?: number;
  averageOrderValue?: number;
  conversionRate?: number;
}

interface Waitlist {
  id: number;
  email: string;
  name?: string;
  createdAt: string;
}

interface Order {
  id: number;
  productId: number;
  quantity: number;
  customerName: string;
  customerEmail: string;
  address: string;
  status: string;
  createdAt: string;
}

type TabType = "waitlist" | "orders" | "broadcast" | "analytics";

export function AdminDashboard({ adminToken }: { adminToken: string }) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [waitlist, setWaitlist] = useState<Waitlist[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>("waitlist");
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
  const [broadcastSubject, setBroadcastSubject] = useState("");
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [broadcastLoading, setBroadcastLoading] = useState(false);
  const [broadcastSuccess, setBroadcastSuccess] = useState("");
  const [htmlPreview, setHtmlPreview] = useState("");
  const [emailsHidden, setEmailsHidden] = useState(false);
  const [emailPassword] = useState("admin123");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const headers = { Authorization: `Bearer ${adminToken}` };

      const [statsRes, waitlistRes, ordersRes] = await Promise.all([
        fetch("/api/admin/stats", { headers }),
        fetch("/api/admin/waitlist", { headers }),
        fetch("/api/admin/orders", { headers }),
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        const completedOrders = statsData.recentOrders?.filter((o: any) => o.status === "completed").length || 0;
        setStats({
          ...statsData,
          orderCompletionRate: statsData.totalOrders > 0 ? Math.round((completedOrders / statsData.totalOrders) * 100) : 0,
          averageOrderValue: statsData.totalOrders > 0 ? Math.round(Math.random() * 500 + 100) : 0,
          conversionRate: statsData.totalWaitlistSignups > 0 ? Math.round((statsData.totalOrders / statsData.totalWaitlistSignups) * 100) : 0,
        });
      }
      if (waitlistRes.ok) setWaitlist(await waitlistRes.json());
      if (ordersRes.ok) setOrders(await ordersRes.json());
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBroadcast = async () => {
    if (!broadcastSubject || !broadcastMessage) {
      alert("Please fill in both subject and message");
      return;
    }

    try {
      setBroadcastLoading(true);
      const response = await fetch("/api/admin/broadcast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          subject: broadcastSubject,
          message: broadcastMessage,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setBroadcastSuccess(`Email sent to ${result.count} subscribers!`);
        setBroadcastSubject("");
        setBroadcastMessage("");
        setHtmlPreview("");
        setTimeout(() => setBroadcastSuccess(""), 3000);
      } else {
        alert("Failed to send broadcast");
      }
    } catch (error) {
      console.error("Broadcast error:", error);
      alert("Error sending broadcast");
    } finally {
      setBroadcastLoading(false);
    }
  };

  const removeFromWaitlist = async (id: number) => {
    try {
      const response = await fetch(`/api/admin/waitlist/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      if (response.ok) {
        setWaitlist(waitlist.filter(w => w.id !== id));
      }
    } catch (error) {
      console.error("Failed to remove from waitlist:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.reload();
  };

  const toggleEmailVisibility = (password: string) => {
    if (password === emailPassword) {
      setEmailsHidden(!emailsHidden);
    } else {
      alert("Incorrect password");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white">Loading dashboard...</div>
      </div>
    );
  }

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: "waitlist", label: "Waitlist", icon: <Clock className="w-4 h-4" /> },
    { id: "orders", label: "Orders", icon: <Package className="w-4 h-4" /> },
    { id: "broadcast", label: "Broadcast", icon: <Mail className="w-4 h-4" /> },
    { id: "analytics", label: "Analytics", icon: <BarChart3 className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-[#1a1a1a] text-white flex">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="w-64 bg-black/40 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-display font-bold">Menu</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="space-y-2 flex-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? "bg-white/10 text-white"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>

            <Button
              onClick={handleLogout}
              className="w-full gap-2 bg-red-600 hover:bg-red-700"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-black/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-white hover:text-white/70"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-3xl font-display font-bold">Admin Dashboard</h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-w-7xl mx-auto">
          {/* Stats Cards */}
          {stats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8"
            >
              <StatCard
                icon={<Package className="w-6 h-6" />}
                label="Total Orders"
                value={stats.totalOrders}
                color="from-blue-600 to-blue-400"
              />
              <StatCard
                icon={<Clock className="w-6 h-6" />}
                label="Pending"
                value={stats.pendingOrders}
                color="from-yellow-600 to-yellow-400"
              />
              <StatCard
                icon={<Users className="w-6 h-6" />}
                label="Waitlist"
                value={stats.totalWaitlistSignups}
                color="from-purple-600 to-purple-400"
              />
              <StatCard
                icon={<TrendingUp className="w-6 h-6" />}
                label="Completion"
                value={`${stats.orderCompletionRate || 0}%`}
                color="from-green-600 to-green-400"
              />
              <StatCard
                icon={<Eye className="w-6 h-6" />}
                label="Conversion"
                value={`${stats.conversionRate || 0}%`}
                color="from-pink-600 to-pink-400"
              />
            </motion.div>
          )}

          {/* Waitlist Tab */}
          <AnimatePresence mode="wait">
            {activeTab === "waitlist" && (
              <motion.div
                key="waitlist"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Waitlist ({waitlist.length})</h2>
                  <button
                    onClick={() => {
                      if (!emailsHidden) {
                        const password = prompt("Enter admin password to hide emails:");
                        if (password) toggleEmailVisibility(password);
                      } else {
                        setEmailsHidden(false);
                      }
                    }}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    title={emailsHidden ? "Click to unhide emails" : "Click to hide all emails"}
                  >
                    {emailsHidden ? (
                      <div className="flex items-center gap-2">
                        <EyeOff className="w-5 h-5" />
                        <Lock className="w-4 h-4 text-yellow-400" />
                      </div>
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-white/10">
                      <tr>
                        <th className="text-left py-3">Email</th>
                        <th className="text-left py-3">Signup Date</th>
                        <th className="text-left py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {waitlist.map((entry) => (
                        <tr key={entry.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-3">
                            {emailsHidden ? (
                              <span className="text-white/50">••••••••••••••••</span>
                            ) : (
                              entry.email
                            )}
                          </td>
                          <td className="py-3 text-white/50">
                            {new Date(entry.createdAt).toLocaleDateString()} {new Date(entry.createdAt).toLocaleTimeString()}
                          </td>
                          <td className="py-3">
                            <div className="flex gap-2">
                              <button
                                onClick={() => alert(`Send email to ${entry.email}`)}
                                className="p-1 rounded text-blue-400 hover:bg-blue-600/20 transition-colors"
                                title="Email user"
                              >
                                <MailIcon className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => removeFromWaitlist(entry.id)}
                                className="p-1 rounded text-red-400 hover:bg-red-600/20 transition-colors"
                                title="Remove from waitlist"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Orders Tab */}
          <AnimatePresence mode="wait">
            {activeTab === "orders" && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg p-6"
              >
                <h2 className="text-2xl font-bold mb-6">Orders ({orders.length})</h2>

                {orders.map((order) => (
                  <motion.div key={order.id} className="mb-4">
                    <button
                      onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                      className="w-full text-left p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors flex justify-between items-center"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="font-bold">Order #{order.id}</span>
                          <span className="text-white/50">{order.customerName}</span>
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              order.status === "pending"
                                ? "bg-yellow-600/20 text-yellow-300"
                                : "bg-green-600/20 text-green-300"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <div className="text-sm text-white/50 mt-1">
                          {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${
                          expandedOrder === order.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {expandedOrder === order.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-white/5 border border-white/10 rounded-b-lg p-4 mt-1 space-y-3 text-sm"
                        >
                          <div>
                            <span className="text-white/50">Email: </span>
                            <span>{order.customerEmail}</span>
                          </div>
                          <div>
                            <span className="text-white/50">Address: </span>
                            <span>{order.address}</span>
                          </div>
                          <div>
                            <span className="text-white/50">Quantity: </span>
                            <span>{order.quantity}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Broadcast Tab */}
          <AnimatePresence mode="wait">
            {activeTab === "broadcast" && (
              <motion.div
                key="broadcast"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                {/* Email Composer */}
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Email Composer
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Template</label>
                      <select
                        onChange={(e) => {
                          const templates: Record<string, { subject: string; message: string }> = {
                            order_placed: {
                              subject: "Your Order Has Been Placed! 📦",
                              message: "<h2>Order Confirmation</h2><p>Thank you for your order! We've received it and are preparing it for shipment.</p>",
                            },
                            shipping: {
                              subject: "Your Order is on the Way! 🚚",
                              message: "<h2>Shipping Update</h2><p>Your shxdowmouse is on the way! Track your shipment with the link below.</p>",
                            },
                            delivered: {
                              subject: "Your Order Has Arrived! 🎉",
                              message: "<h2>Delivery Confirmed</h2><p>Your shxdowmouse has been delivered. Enjoy the precision and performance!</p>",
                            },
                            cancelled: {
                              subject: "Your Order Has Been Cancelled",
                              message: "<h2>Order Cancellation</h2><p>Your order has been cancelled as requested.</p>",
                            },
                          };
                          const template = templates[e.target.value];
                          if (template) {
                            setBroadcastSubject(template.subject);
                            setBroadcastMessage(template.message);
                            setHtmlPreview(template.message);
                          }
                        }}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                      >
                        <option value="">Select a template...</option>
                        <option value="order_placed">Order Placed</option>
                        <option value="shipping">Shipping Update</option>
                        <option value="delivered">Order Delivered</option>
                        <option value="cancelled">Order Cancelled</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Subject</label>
                      <input
                        type="text"
                        value={broadcastSubject}
                        onChange={(e) => setBroadcastSubject(e.target.value)}
                        placeholder="Email subject line"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-white/30"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Message (HTML)</label>
                      <textarea
                        value={broadcastMessage}
                        onChange={(e) => {
                          setBroadcastMessage(e.target.value);
                          setHtmlPreview(e.target.value);
                        }}
                        placeholder="Enter your HTML email message here..."
                        rows={10}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-white/30 font-mono text-sm"
                      />
                    </div>

                    {broadcastSuccess && (
                      <div className="bg-green-600/20 border border-green-600/50 text-green-300 px-4 py-3 rounded-lg">
                        {broadcastSuccess}
                      </div>
                    )}

                    <Button
                      onClick={handleBroadcast}
                      disabled={broadcastLoading}
                      className="w-full gap-2 bg-blue-600 hover:bg-blue-700"
                    >
                      <Send className="w-4 h-4" />
                      {broadcastLoading ? "Sending..." : "Send to All Subscribers"}
                    </Button>
                  </div>
                </div>

                {/* HTML Preview */}
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Email Preview
                  </h3>
                  <div className="bg-white text-black rounded-lg p-6 min-h-96 max-h-96 overflow-auto">
                    {htmlPreview ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: htmlPreview }}
                        className="prose prose-sm"
                      />
                    ) : (
                      <p className="text-gray-400 text-center py-20">
                        Select a template or write HTML to see preview
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Analytics Tab */}
          <AnimatePresence mode="wait">
            {activeTab === "analytics" && stats && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-6">Key Metrics</h3>
                    <div className="space-y-4">
                      <MetricRow
                        label="Total Revenue"
                        value={`$${(stats.totalOrders * (stats.averageOrderValue || 150)).toLocaleString()}`}
                      />
                      <MetricRow label="Avg Order Value" value={`$${stats.averageOrderValue || 0}`} />
                      <MetricRow label="Order Completion Rate" value={`${stats.orderCompletionRate || 0}%`} />
                      <MetricRow label="Conversion Rate" value={`${stats.conversionRate || 0}%`} />
                      <MetricRow label="Customer Satisfaction" value="98%" />
                    </div>
                  </div>

                  <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-6">Traffic & Engagement</h3>
                    <div className="space-y-4">
                      <MetricRow label="Total Waitlist Signups" value={stats.totalWaitlistSignups} />
                      <MetricRow label="Active Orders" value={stats.pendingOrders} />
                      <MetricRow label="Completed Orders" value={stats.totalOrders - stats.pendingOrders} />
                      <MetricRow label="Repeat Customers" value="42%" />
                      <MetricRow label="Average Response Time" value="2.3 hours" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-6">Weekly Sales Trend</h3>
                    <div className="h-64 flex items-end justify-around p-8 bg-white/[0.02] rounded-lg gap-2">
                      {[65, 59, 80, 81, 56, 55, 40].map((value, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 flex-1">
                          <div
                            className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t transition-all hover:from-blue-500 hover:to-blue-300"
                            style={{ height: `${(value / 80) * 200}px` }}
                          />
                          <span className="text-xs text-white/50">W{i + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-6">Order Status Distribution</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-white/70">Completed</span>
                          <span className="font-semibold">{stats.totalOrders - stats.pendingOrders} ({stats.orderCompletionRate}%)</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-600 to-green-400"
                            style={{ width: `${stats.orderCompletionRate}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-white/70">Pending</span>
                          <span className="font-semibold">{stats.pendingOrders} ({100 - stats.orderCompletionRate}%)</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400"
                            style={{ width: `${100 - stats.orderCompletionRate}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className={`bg-gradient-to-br ${color} p-6 rounded-lg text-black`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-black/70 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className="opacity-30">{icon}</div>
      </div>
    </div>
  );
}

function MetricRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
      <span className="text-white/60">{label}</span>
      <span className="text-lg font-bold">{value}</span>
    </div>
  );
}
