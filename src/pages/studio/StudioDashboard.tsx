import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { FolderKanban, FileText, MessageSquare, Quote, Eye, TrendingUp } from "lucide-react";

const StatCard = ({ icon: Icon, label, value, color, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="glass rounded-2xl p-6"
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
        <Icon size={18} />
      </div>
    </div>
    <p className="text-3xl font-display font-bold">{value}</p>
    <p className="text-sm text-muted-foreground mt-1">{label}</p>
  </motion.div>
);

const StudioDashboard = () => {
  const [stats, setStats] = useState({ projects: 0, posts: 0, messages: 0, testimonials: 0, unread: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [p, b, m, t] = await Promise.all([
        supabase.from("projects").select("id", { count: "exact", head: true }),
        supabase.from("blog_posts").select("id", { count: "exact", head: true }),
        supabase.from("messages").select("id, read", { count: "exact" }),
        supabase.from("testimonials").select("id", { count: "exact", head: true }),
      ]);
      const unread = (m.data as any[])?.filter((msg: any) => !msg.read).length || 0;
      setStats({
        projects: p.count || 0,
        posts: b.count || 0,
        messages: m.count || 0,
        testimonials: t.count || 0,
        unread,
      });
    };
    fetchStats();
  }, []);

  return (
    <div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
        <h1 className="text-3xl font-display font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome to your portfolio studio.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={FolderKanban} label="Projects" value={stats.projects} color="bg-primary/10 text-primary" delay={0.1} />
        <StatCard icon={FileText} label="Blog Posts" value={stats.posts} color="bg-accent/10 text-accent" delay={0.15} />
        <StatCard icon={MessageSquare} label={`Messages (${stats.unread} unread)`} value={stats.messages} color="bg-orange-500/10 text-orange-500" delay={0.2} />
        <StatCard icon={Quote} label="Testimonials" value={stats.testimonials} color="bg-green-500/10 text-green-500" delay={0.25} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 glass rounded-2xl p-6"
      >
        <h2 className="text-lg font-display font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: "Add New Project", href: "/studio/projects", icon: FolderKanban },
            { label: "Write Blog Post", href: "/studio/blog", icon: FileText },
            { label: "View Messages", href: "/studio/messages", icon: MessageSquare },
          ].map((action) => (
            <a
              key={action.label}
              href={action.href}
              className="flex items-center gap-3 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <action.icon size={18} className="text-primary" />
              <span className="text-sm font-medium">{action.label}</span>
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default StudioDashboard;
