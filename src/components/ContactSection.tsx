import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Github, Linkedin, Twitter, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ sender_name: "", email: "", message: "", project_type: "" });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const { error } = await supabase.from("messages").insert(form);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setSubmitted(true);
    }
    setSending(false);
  };

  return (
    <section id="contact" className="py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-16 text-center">
          <p className="text-primary font-medium mb-2 tracking-widest uppercase text-sm">Get in Touch</p>
          <h2 className="text-4xl sm:text-5xl font-display font-bold">Let's <span className="gradient-text">connect</span></h2>
        </motion.div>

        <div className="max-w-xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-8 space-y-6 relative overflow-hidden"
          >
            {submitted && (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-0 bg-card/95 backdrop-blur-xl flex flex-col items-center justify-center z-10 rounded-2xl">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, delay: 0.1 }}>
                  <CheckCircle size={48} className="text-primary mb-4" />
                </motion.div>
                <p className="text-lg font-display font-semibold text-foreground">Message sent!</p>
                <p className="text-sm text-muted-foreground">I'll get back to you soon.</p>
                <button onClick={() => { setSubmitted(false); setForm({ sender_name: "", email: "", message: "", project_type: "" }); }} className="mt-4 text-sm text-primary hover:underline">Send another</button>
              </motion.div>
            )}

            <input type="text" placeholder="Name" required value={form.sender_name} onChange={(e) => setForm({ ...form, sender_name: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm" />
            <input type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm" />
            <select value={form.project_type} onChange={(e) => setForm({ ...form, project_type: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground text-sm">
              <option value="">Project type (optional)</option>
              <option value="internship">Internship</option>
              <option value="freelance">Freelance</option>
              <option value="collaboration">Collaboration</option>
              <option value="other">Other</option>
            </select>
            <textarea placeholder="Message" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm resize-none" />

            <motion.button type="submit" disabled={sending} className="w-full py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 glow-primary disabled:opacity-50" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              {sending ? "Sending..." : "Send Message"} <Send size={16} />
            </motion.button>
          </motion.form>

          <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }} className="flex justify-center gap-4 mt-8">
            {[
              { icon: Github, href: "https://github.com/MANNYTECH01", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/iseoluwa-emmanuel-7503a234b/", label: "LinkedIn" },
              { icon: Twitter, href: "https://x.com/Manny__tech", label: "Twitter" },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="w-12 h-12 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-primary transition-colors" whileHover={{ y: -4, scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
