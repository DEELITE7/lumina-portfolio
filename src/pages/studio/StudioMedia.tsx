import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload, Image, Copy } from "lucide-react";
import { motion } from "framer-motion";

const StudioMedia = () => {
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);
  const { toast } = useToast();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("media").upload(fileName, file);
    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    } else {
      const { data } = supabase.storage.from("media").getPublicUrl(fileName);
      setFiles((prev) => [{ name: file.name, url: data.publicUrl }, ...prev]);
      toast({ title: "Uploaded!" });
    }
    setUploading(false);
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({ title: "URL copied!" });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-3xl font-display font-bold">Media</h1><p className="text-muted-foreground mt-1">Upload and manage images</p></div>
        <label>
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          <Button asChild disabled={uploading} className="gap-2 cursor-pointer">
            <span><Upload size={16} /> {uploading ? "Uploading..." : "Upload"}</span>
          </Button>
        </label>
      </div>

      {files.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((f, i) => (
            <motion.div key={f.url} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} className="glass rounded-xl overflow-hidden group">
              <div className="aspect-square bg-muted/30 flex items-center justify-center">
                <img src={f.url} alt={f.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-3 flex items-center justify-between">
                <span className="text-xs truncate text-muted-foreground">{f.name}</span>
                <button onClick={() => copyUrl(f.url)} className="p-1 rounded hover:bg-muted text-muted-foreground"><Copy size={12} /></button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground">
          <Image size={48} className="mx-auto mb-4 opacity-30" />
          <p>No files uploaded yet in this session.</p>
          <p className="text-xs mt-1">Upload images to use in your projects and blog posts.</p>
        </div>
      )}
    </div>
  );
};

export default StudioMedia;
