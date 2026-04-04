import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Mail, MailOpen, Trash2, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StudioMessages = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);
  const { toast } = useToast();

  const fetchMessages = async () => {
    const { data } = await supabase.from("messages").select("*").order("created_at", { ascending: false });
    setMessages(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchMessages(); }, []);

  const markRead = async (id: string) => {
    await supabase.from("messages").update({ read: true }).eq("id", id);
    fetchMessages();
  };

  const deleteMessage = async (id: string) => {
    await supabase.from("messages").delete().eq("id", id);
    setSelected(null);
    fetchMessages();
    toast({ title: "Message deleted" });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold">Messages</h1>
        <p className="text-muted-foreground mt-1">{messages.filter((m) => !m.read).length} unread</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          {loading ? (
            [1, 2, 3].map((i) => <div key={i} className="h-20 rounded-xl bg-muted/30 animate-pulse" />)
          ) : messages.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">No messages yet.</div>
          ) : (
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => { setSelected(msg); if (!msg.read) markRead(msg.id); }}
                  className={`glass rounded-xl p-4 cursor-pointer transition-colors ${
                    selected?.id === msg.id ? "ring-1 ring-primary" : ""
                  } ${!msg.read ? "border-l-2 border-l-primary" : ""}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {msg.read ? <MailOpen size={14} className="text-muted-foreground" /> : <Mail size={14} className="text-primary" />}
                      <span className="font-medium text-sm">{msg.sender_name}</span>
                    </div>
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <Clock size={10} />
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{msg.email}</p>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{msg.message}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl p-6 h-fit sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-lg">{selected.sender_name}</h2>
              <button onClick={() => deleteMessage(selected.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mb-1">{selected.email}</p>
            {selected.project_type && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{selected.project_type}</span>
            )}
            <div className="mt-4 pt-4 border-t border-border/50">
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
            </div>
            <p className="text-[11px] text-muted-foreground mt-4">{new Date(selected.created_at).toLocaleString()}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default StudioMessages;
