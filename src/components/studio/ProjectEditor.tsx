import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save } from "lucide-react";

interface Props {
  project: any | null;
  onSave: () => void;
  onCancel: () => void;
}

const ProjectEditor = ({ project, onSave, onCancel }: Props) => {
  const isNew = !project;
  const [form, setForm] = useState({
    title: project?.title || "",
    slug: project?.slug || "",
    description: project?.description || "",
    summary: project?.summary || "",
    tech_stack: project?.tech_stack?.join(", ") || "",
    tags: project?.tags?.join(", ") || "",
    category: project?.category || "full-stack",
    status: project?.status || "draft",
    featured: project?.featured || false,
    published: project?.published || false,
    live_url: project?.live_url || "",
    github_url: project?.github_url || "",
    thumbnail_url: project?.thumbnail_url || "",
    problem: project?.problem || "",
    solution: project?.solution || "",
    my_role: project?.my_role || "",
    features: project?.features || "",
    challenges: project?.challenges || "",
    lessons: project?.lessons || "",
    architecture_notes: project?.architecture_notes || "",
  });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const update = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key === "title" && isNew) {
      setForm((prev) => ({ ...prev, slug: value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") }));
    }
  };

  const handleSave = async () => {
    if (!form.title || !form.slug) {
      toast({ title: "Title and slug are required", variant: "destructive" });
      return;
    }
    setSaving(true);
    const payload = {
      ...form,
      tech_stack: form.tech_stack.split(",").map((s: string) => s.trim()).filter(Boolean),
      tags: form.tags.split(",").map((s: string) => s.trim()).filter(Boolean),
    };

    if (isNew) {
      const { error } = await supabase.from("projects").insert(payload);
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Project created!" });
        onSave();
      }
    } else {
      const { error } = await supabase.from("projects").update(payload).eq("id", project.id);
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Project updated!" });
        onSave();
      }
    }
    setSaving(false);
  };

  const Field = ({ label, field, textarea, placeholder }: { label: string; field: string; textarea?: boolean; placeholder?: string }) => (
    <div>
      <label className="text-sm font-medium text-muted-foreground mb-1.5 block">{label}</label>
      {textarea ? (
        <textarea
          value={(form as any)[field]}
          onChange={(e) => update(field, e.target.value)}
          className="w-full rounded-lg border border-border/50 bg-background/50 px-3 py-2 text-sm min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder={placeholder}
        />
      ) : (
        <Input
          value={(form as any)[field]}
          onChange={(e) => update(field, e.target.value)}
          className="bg-background/50 border-border/50"
          placeholder={placeholder}
        />
      )}
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button onClick={onCancel} className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-2xl font-display font-bold">{isNew ? "New Project" : `Edit: ${project.title}`}</h1>
        </div>
        <Button onClick={handleSave} disabled={saving} className="gap-2">
          <Save size={16} /> {saving ? "Saving..." : "Save"}
        </Button>
      </div>

      <div className="space-y-8">
        {/* Basic info */}
        <div className="glass rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-display font-semibold">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Title" field="title" placeholder="Project name" />
            <Field label="Slug" field="slug" placeholder="project-slug" />
          </div>
          <Field label="Short Description" field="description" textarea placeholder="One-line description..." />
          <Field label="Summary" field="summary" textarea placeholder="Detailed portfolio summary..." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Tech Stack (comma-separated)" field="tech_stack" placeholder="React, TypeScript, Node.js" />
            <Field label="Tags (comma-separated)" field="tags" placeholder="frontend, backend, ai" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Category</label>
              <select
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                className="w-full rounded-lg border border-border/50 bg-background/50 px-3 py-2 text-sm"
              >
                {["frontend", "backend", "full-stack", "mobile", "ai", "dsa", "open-source", "cloud"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Status</label>
              <select
                value={form.status}
                onChange={(e) => update("status", e.target.value)}
                className="w-full rounded-lg border border-border/50 bg-background/50 px-3 py-2 text-sm"
              >
                {["draft", "live", "in-progress", "private", "open-source", "archived"].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.featured} onChange={(e) => update("featured", e.target.checked)} className="accent-primary" />
                Featured
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.published} onChange={(e) => update("published", e.target.checked)} className="accent-primary" />
                Published
              </label>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="glass rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-display font-semibold">Links & Media</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Live URL" field="live_url" placeholder="https://..." />
            <Field label="GitHub URL" field="github_url" placeholder="https://github.com/..." />
          </div>
          <Field label="Thumbnail URL" field="thumbnail_url" placeholder="/project-covers/my-project.jpg or https://..." />
        </div>

        {/* Case study */}
        <div className="glass rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-display font-semibold">Case Study</h2>
          <Field label="Problem" field="problem" textarea placeholder="What problem does this solve?" />
          <Field label="Solution" field="solution" textarea placeholder="How did you solve it?" />
          <Field label="My Role" field="my_role" textarea placeholder="What was your role?" />
          <Field label="Features" field="features" textarea placeholder="Key features..." />
          <Field label="Challenges" field="challenges" textarea placeholder="What challenges did you face?" />
          <Field label="Lessons Learned" field="lessons" textarea placeholder="What did you learn?" />
          <Field label="Architecture Notes" field="architecture_notes" textarea placeholder="Technical architecture details..." />
        </div>
      </div>
    </div>
  );
};

export default ProjectEditor;
