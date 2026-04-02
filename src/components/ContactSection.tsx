import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Github, Linkedin, Twitter, CheckCircle } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <section id="contact" className="py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-primary font-medium mb-2 tracking-widest uppercase text-sm">Get in Touch</p>
          <h2 className="text-4xl sm:text-5xl font-display font-bold">
            Let's <span className="gradient-text">connect</span>
          </h2>
        </motion.div>

        <div className="max-w-xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-8 space-y-6 relative overflow-hidden"
          >
            {/* Success overlay */}
            {submitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 bg-card/95 backdrop-blur-xl flex flex-col items-center justify-center z-10 rounded-2xl"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                >
                  <CheckCircle size={48} className="text-primary mb-4" />
                </motion.div>
                <p className="text-lg font-display font-semibold text-foreground">Message sent!</p>
                <p className="text-sm text-muted-foreground">I'll get back to you soon.</p>
              </motion.div>
            )}

            {[
              { name: "name", label: "Name", type: "text" },
              { name: "email", label: "Email", type: "email" },
            ].map((field) => (
              <div key={field.name} className="relative">
                <input
                  type={field.type}
                  placeholder={field.label}
                  required
                  value={form[field.name as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
                />
              </div>
            ))}

            <textarea
              placeholder="Message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm resize-none"
            />

            <motion.button
              type="submit"
              className="w-full py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 glow-primary"
              whileHover={{ scale: 1.02, boxShadow: "0 0 50px -10px hsl(187 80% 55% / 0.6)" }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message <Send size={16} />
            </motion.button>
          </motion.form>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="flex justify-center gap-4 mt-8"
          >
            {[
              { icon: Github, href: "#", label: "GitHub" },
              { icon: Linkedin, href: "#", label: "LinkedIn" },
              { icon: Twitter, href: "#", label: "Twitter" },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                className="w-12 h-12 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
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
