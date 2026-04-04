import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Star, StarOff, Trash2, Edit2, ExternalLink, Github, Search, Eye, EyeOff } from "lucide-react";
import ProjectEditor from "@/components/studio/ProjectEditor";

const StudioProjects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<any | null>(null);
  const [creating, setCreating] = useState(false);
  const { toast } = useToast();

  const fetchProjects = async () => {
    const { data } = await supabase.from("projects").select("*").order("sort_order");
    setProjects(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  const toggleFeatured = async (id: string, featured: boolean) => {
    await supabase.from("projects").update({ featured: !featured }).eq("id", id);
    fetchProjects();
  };

  const togglePublished = async (id: string, published: boolean) => {
    await supabase.from("projects").update({ published: !published }).eq("id", id);
    fetchProjects();
    toast({ title: published ? "Project unpublished" : "Project published" });
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await supabase.from("projects").delete().eq("id", id);
    fetchProjects();
    toast({ title: "Project deleted" });
  };

  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  if (editing || creating) {
    return (
      <ProjectEditor
        project={editing}
        onSave={() => { setEditing(null); setCreating(false); fetchProjects(); }}
        onCancel={() => { setEditing(null); setCreating(false); }}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold">Projects</h1>
          <p className="text-muted-foreground mt-1">{projects.length} total projects</p>
        </div>
        <Button onClick={() => setCreating(true)} className="gap-2">
          <Plus size={16} /> New Project
        </Button>
      </div>

      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-background/50"
        />
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 rounded-xl bg-muted/30 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-xl p-4 flex items-center justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold truncate">{project.title}</h3>
                    {project.featured && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">Featured</span>
                    )}
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      project.published ? "bg-green-500/10 text-green-500" : "bg-muted text-muted-foreground"
                    }`}>
                      {project.published ? "Published" : "Draft"}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate mt-1">{project.description}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => toggleFeatured(project.id, project.featured)} className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-primary">
                    {project.featured ? <Star size={16} className="fill-primary text-primary" /> : <StarOff size={16} />}
                  </button>
                  <button onClick={() => togglePublished(project.id, project.published)} className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
                    {project.published ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                  <button onClick={() => setEditing(project)} className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => deleteProject(project.id)} className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-destructive">
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No projects found. Create your first project!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudioProjects;
