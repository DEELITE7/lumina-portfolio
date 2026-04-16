import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, ExternalLink, ArrowDown, Mail } from "lucide-react";

const HeroSection = () => {
  const firstName = "Elebiemayo";
  const lastName = "Iseoluwa";
  const title = "Backend & Cloud Developer";
  const tagline = "I build reliable, scalable backend systems and cloud infrastructure that power real-world applications.";

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Spotlight gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/8 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/6 blur-[120px] rounded-full" />
      </div>

      {/* Floating animated orbs */}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-primary/40"
        animate={{ y: [0, -80, 0], x: [0, 30, 0], opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "30%", left: "15%" }}
      />
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full bg-accent/40"
        animate={{ y: [0, 60, 0], x: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{ top: "20%", right: "20%" }}
      />
      <motion.div
        className="absolute w-1 h-1 rounded-full bg-primary/60"
        animate={{ y: [0, -40, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{ bottom: "30%", left: "40%" }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-border/50 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-xs text-muted-foreground font-medium">Open to opportunities</span>
        </motion.div>

        {/* Name */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            className="text-5xl sm:text-7xl lg:text-[5.5rem] font-display font-bold tracking-tight leading-none"
          >
            {firstName}{" "}
            <span className="gradient-text">{lastName}</span>
          </motion.h1>
        </div>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-lg sm:text-xl text-primary font-medium mb-4 tracking-wide"
        >
          {title}
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto mb-10 leading-relaxed"
        >
          {tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-12"
        >
          <motion.button
            onClick={() => scrollTo("#projects")}
            className="group px-7 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm glow-primary flex items-center justify-center gap-2"
            whileHover={{ scale: 1.04, boxShadow: "0 0 50px -10px hsl(187 80% 55% / 0.6)" }}
            whileTap={{ scale: 0.97 }}
          >
            View Projects
            <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
          </motion.button>
          <motion.button
            onClick={() => scrollTo("#contact")}
            className="px-7 py-3 rounded-xl glass font-semibold text-sm text-foreground gradient-border flex items-center justify-center gap-2"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <Mail size={14} />
            Contact Me
          </motion.button>
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3 rounded-xl border border-border/50 font-medium text-sm text-muted-foreground hover:text-foreground hover:border-border transition-colors flex items-center justify-center gap-2"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <ExternalLink size={14} />
            Resume
          </motion.a>
        </motion.div>

        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex justify-center gap-3"
        >
          {[
            { icon: Github, href: "https://github.com/MANNYTECH01", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/iseoluwa-emmanuel-7503a234b/", label: "LinkedIn" },
            { icon: Twitter, href: "https://x.com/Manny__tech", label: "Twitter" },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-lg border border-border/40 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={17} />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-muted-foreground/50 uppercase tracking-[0.2em]">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-muted-foreground/20 flex justify-center pt-1.5">
            <motion.div
              className="w-0.5 h-1.5 rounded-full bg-primary"
              animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
