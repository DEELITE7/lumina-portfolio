import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit2, Eye, EyeOff, Search, ArrowLeft, Save } from "lucide-react";

const BlogEditor = ({ post, onSave, onCancel }: { post: any; onSave: () => void; onCancel: () => void }) => {
  const isNew = !post;
  const [form, setForm] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    content: post?.content || "",
    excerpt: post?.excerpt || "",
    tags: post?.tags?.join(", ") || "",
    published: post?.published || false,
    read_time: post?.read_time || 5,
  });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const update = (k: string, v: any) => {
    setForm((p) => ({ ...p, [k]: v }));
    if (k === "title" && isNew) setForm((p) => ({ ...p, slug: v.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") }));
  };

  const save = async () => {
    setSaving(true);
    const payload = { ...form, tags: form.tags.split(",").map((s: string) => s.trim()).filter(Boolean) };
    const { error } = isNew
      ? await supabase.from("blog_posts").insert(payload)
      : await supabase.from("blog_posts").update(payload).eq("id", post.id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: isNew ? "Post created!" : "Post updated!" }); onSave(); }
    setSaving(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button onClick={onCancel} className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"><ArrowLeft size={18} /></button>
          <h1 className="text-2xl font-display font-bold">{isNew ? "New Post" : `Edit: ${post.title}`}</h1>
        </div>
        <Button onClick={save} disabled={saving} className="gap-2"><Save size={16} /> {saving ? "Saving..." : "Save"}</Button>
      </div>
      <div className="glass rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="text-sm font-medium text-muted-foreground mb-1.5 block">Title</label><Input value={form.title} onChange={(e) => update("title", e.target.value)} className="bg-background/50" /></div>
          <div><label className="text-sm font-medium text-muted-foreground mb-1.5 block">Slug</label><Input value={form.slug} onChange={(e) => update("slug", e.target.value)} className="bg-background/50" /></div>
        </div>
        <div><label className="text-sm font-medium text-muted-foreground mb-1.5 block">Excerpt</label><textarea value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} className="w-full rounded-lg border border-border/50 bg-background/50 px-3 py-2 text-sm min-h-[80px]" /></div>
        <div><label className="text-sm font-medium text-muted-foreground mb-1.5 block">Content (Markdown)</label><textarea value={form.content} onChange={(e) => update("content", e.target.value)} className="w-full rounded-lg border border-border/50 bg-background/50 px-3 py-2 text-sm min-h-[300px] font-mono text-xs" /></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div><label className="text-sm font-medium text-muted-foreground mb-1.5 block">Tags</label><Input value={form.tags} onChange={(e) => update("tags", e.target.value)} className="bg-background/50" placeholder="react, typescript" /></div>
          <div><label className="text-sm font-medium text-muted-foreground mb-1.5 block">Read Time (min)</label><Input type="number" value={form.read_time} onChange={(e) => update("read_time", parseInt(e.target.value) || 5)} className="bg-background/50" /></div>
          <div className="flex items-end"><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.published} onChange={(e) => update("published", e.target.checked)} className="accent-primary" /> Published</label></div>
        </div>
      </div>
    </div>
  );
};

const StudioBlog = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<any>(null);
  const [creating, setCreating] = useState(false);
  const { toast } = useToast();

  const fetch_ = async () => { const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false }); setPosts(data || []); setLoading(false); };
  useEffect(() => { fetch_(); }, []);

  const togglePublished = async (id: string, pub: boolean) => { await supabase.from("blog_posts").update({ published: !pub }).eq("id", id); fetch_(); };
  const deletePost = async (id: string) => { if (!confirm("Delete?")) return; await supabase.from("blog_posts").delete().eq("id", id); fetch_(); toast({ title: "Post deleted" }); };

  if (editing || creating) return <BlogEditor post={editing} onSave={() => { setEditing(null); setCreating(false); fetch_(); }} onCancel={() => { setEditing(null); setCreating(false); }} />;

  const filtered = posts.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-3xl font-display font-bold">Blog Posts</h1><p className="text-muted-foreground mt-1">{posts.length} posts</p></div>
        <Button onClick={() => setCreating(true)} className="gap-2"><Plus size={16} /> New Post</Button>
      </div>
      <div className="relative mb-6"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-background/50" /></div>
      <div className="space-y-3">
        {loading ? [1, 2].map((i) => <div key={i} className="h-16 rounded-xl bg-muted/30 animate-pulse" />) :
          filtered.map((post, i) => (
            <motion.div key={post.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-4 flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm truncate">{post.title}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${post.published ? "bg-green-500/10 text-green-500" : "bg-muted text-muted-foreground"}`}>{post.published ? "Published" : "Draft"}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 truncate">{post.excerpt}</p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => togglePublished(post.id, post.published)} className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground">{post.published ? <Eye size={16} /> : <EyeOff size={16} />}</button>
                <button onClick={() => setEditing(post)} className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"><Edit2 size={16} /></button>
                <button onClick={() => deletePost(post.id)} className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-destructive"><Trash2 size={16} /></button>
              </div>
            </motion.div>
          ))
        }
      </div>
    </div>
  );
};

export default StudioBlog;
