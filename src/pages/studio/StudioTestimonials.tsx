import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Star, StarOff, ArrowLeft, Save } from "lucide-react";

const Editor = ({ item, onSave, onCancel }: any) => {
  const isNew = !item;
  const [form, setForm] = useState({ name: item?.name || "", role: item?.role || "", company: item?.company || "", content: item?.content || "", featured: item?.featured || false });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const save = async () => {
    setSaving(true);
    const { error } = isNew ? await supabase.from("testimonials").insert(form) : await supabase.from("testimonials").update(form).eq("id", item.id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: isNew ? "Created!" : "Updated!" }); onSave(); }
    setSaving(false);
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3"><button onClick={onCancel} className="p-2 rounded-lg hover:bg-muted text-muted-foreground"><ArrowLeft size={18} /></button><h1 className="text-2xl font-display font-bold">{isNew ? "New Testimonial" : "Edit Testimonial"}</h1></div>
        <Button onClick={save} disabled={saving} className="gap-2"><Save size={16} /> Save</Button>
      </div>
      <div className="glass rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div><label className="text-sm font-medium text-muted-foreground mb-1.5 block">Name</label><Input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} className="bg-background/50" /></div>
          <div><label className="text-sm font-medium text-muted-foreground mb-1.5 block">Role</label><Input value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))} className="bg-background/50" /></div>
          <div><label className="text-sm font-medium text-muted-foreground mb-1.5 block">Company</label><Input value={form.company} onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))} className="bg-background/50" /></div>
        </div>
        <div><label className="text-sm font-medium text-muted-foreground mb-1.5 block">Content</label><textarea value={form.content} onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))} className="w-full rounded-lg border border-border/50 bg-background/50 px-3 py-2 text-sm min-h-[120px]" /></div>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.featured} onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))} className="accent-primary" /> Featured</label>
      </div>
    </div>
  );
};

const StudioTestimonials = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any>(null);
  const [creating, setCreating] = useState(false);
  const { toast } = useToast();
  const fetch_ = async () => { const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false }); setItems(data || []); setLoading(false); };
  useEffect(() => { fetch_(); }, []);
  const del = async (id: string) => { if (!confirm("Delete?")) return; await supabase.from("testimonials").delete().eq("id", id); fetch_(); toast({ title: "Deleted" }); };
  const toggleFeat = async (id: string, f: boolean) => { await supabase.from("testimonials").update({ featured: !f }).eq("id", id); fetch_(); };

  if (editing || creating) return <Editor item={editing} onSave={() => { setEditing(null); setCreating(false); fetch_(); }} onCancel={() => { setEditing(null); setCreating(false); }} />;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-3xl font-display font-bold">Testimonials</h1><p className="text-muted-foreground mt-1">{items.length} testimonials</p></div>
        <Button onClick={() => setCreating(true)} className="gap-2"><Plus size={16} /> Add</Button>
      </div>
      <div className="space-y-3">
        {loading ? [1, 2].map((i) => <div key={i} className="h-20 rounded-xl bg-muted/30 animate-pulse" />) :
          items.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div><p className="font-semibold text-sm">{t.name}</p><p className="text-xs text-muted-foreground">{t.role} at {t.company}</p></div>
                <div className="flex gap-1">
                  <button onClick={() => toggleFeat(t.id, t.featured)} className="p-2 rounded-lg hover:bg-muted text-muted-foreground">{t.featured ? <Star size={16} className="fill-primary text-primary" /> : <StarOff size={16} />}</button>
                  <button onClick={() => setEditing(t)} className="p-2 rounded-lg hover:bg-muted text-muted-foreground">✏️</button>
                  <button onClick={() => del(t.id)} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-destructive"><Trash2 size={16} /></button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{t.content}</p>
            </motion.div>
          ))
        }
      </div>
    </div>
  );
};

export default StudioTestimonials;
