import { useEffect, useState } from "react";
import { useNavigate, Outlet, Link, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import {
  LayoutDashboard, FolderKanban, FileText, MessageSquare,
  Quote, Settings, LogOut, ChevronLeft, ChevronRight, Image,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/studio" },
  { label: "Projects", icon: FolderKanban, path: "/studio/projects" },
  { label: "Blog", icon: FileText, path: "/studio/blog" },
  { label: "Testimonials", icon: Quote, path: "/studio/testimonials" },
  { label: "Messages", icon: MessageSquare, path: "/studio/messages" },
  { label: "Media", icon: Image, path: "/studio/media" },
  { label: "Settings", icon: Settings, path: "/studio/settings" },
];

const StudioLayout = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (!session?.user) navigate("/auth");
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (!session?.user) navigate("/auth");
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 240 }}
        className="h-screen sticky top-0 border-r border-border/50 bg-card/50 backdrop-blur-xl flex flex-col"
      >
        <div className="p-4 flex items-center justify-between border-b border-border/50">
          {!collapsed && (
            <Link to="/" className="text-lg font-display font-bold gradient-text">
              Studio
            </Link>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <item.icon size={18} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-2 border-t border-border/50">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors w-full"
          >
            <LogOut size={18} />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main content */}
      <main className="flex-1 min-h-screen">
        <div className="p-6 lg:p-8 max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default StudioLayout;
