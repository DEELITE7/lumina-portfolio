import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";
import { motion } from "framer-motion";

const StudioSettings = () => {
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetch_ = async () => {
      const { data } = await supabase.from("site_settings").select("*");
      const map: Record<string, any> = {};
      data?.forEach((s: any) => { map[s.key] = typeof s.value === "string" ? JSON.parse(s.value) : s.value; });
      setSettings(map);
      setLoading(false);
    };
    fetch_();
  }, []);

  const update = (key: string, value: any) => setSettings((p) => ({ ...p, [key]: value }));

  const save = async () => {
    setSaving(true);
    for (const [key, value] of Object.entries(settings)) {
      await supabase.from("site_settings").upsert({ key, value: JSON.stringify(value) }, { onConflict: "key" });
    }
    toast({ title: "Settings saved!" });
    setSaving(false);
  };

  if (loading) return <div className="h-40 flex items-center justify-center"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-3xl font-display font-bold">Settings</h1><p className="text-muted-foreground mt-1">Manage your site content</p></div>
        <Button onClick={save} disabled={saving} className="gap-2"><Save size={16} /> {saving ? "Saving..." : "Save"}</Button>
      </div>

      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-display font-semibold">Hero Section</h2>
          <div><label className="text-sm font-medium text-muted-foreground mb-1.5 block">Name</label><Input value={settings.hero_title || ""} onChange={(e) => update("hero_title", e.target.value)} className="bg-background/50" /></div>
          <div><label className="text-sm font-medium text-muted-foreground mb-1.5 block">Subtitle</label><Input value={settings.hero_subtitle || ""} onChange={(e) => update("hero_subtitle", e.target.value)} className="bg-background/50" /></div>
          <div><label className="text-sm font-medium text-muted-foreground mb-1.5 block">Tagline</label><textarea value={settings.hero_tagline || ""} onChange={(e) => update("hero_tagline", e.target.value)} className="w-full rounded-lg border border-border/50 bg-background/50 px-3 py-2 text-sm min-h-[80px]" /></div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-display font-semibold">Availability</h2>
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Status</label>
            <select value={settings.availability || "open"} onChange={(e) => update("availability", e.target.value)} className="w-full rounded-lg border border-border/50 bg-background/50 px-3 py-2 text-sm">
              <option value="open">Open to opportunities</option>
              <option value="busy">Currently busy</option>
              <option value="unavailable">Not available</option>
            </select>
          </div>
          <div><label className="text-sm font-medium text-muted-foreground mb-1.5 block">Current Focus</label><Input value={settings.current_focus || ""} onChange={(e) => update("current_focus", e.target.value)} className="bg-background/50" /></div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudioSettings;
