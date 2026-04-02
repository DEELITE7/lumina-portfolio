import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FolderOpen,
  User,
  Mail,
  FileText,
  Github,
  Linkedin,
  Twitter,
  Briefcase,
  Cpu,
  Sparkles,
  Command,
} from "lucide-react";

interface CommandItem {
  id: string;
  label: string;
  icon: React.ElementType;
  action: () => void;
  category: string;
  keywords?: string[];
}

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const scrollTo = useCallback((id: string) => {
    setOpen(false);
    setTimeout(() => {
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  }, []);

  const commands: CommandItem[] = [
    { id: "projects", label: "View Projects", icon: FolderOpen, action: () => scrollTo("#projects"), category: "Navigation", keywords: ["work", "portfolio"] },
    { id: "about", label: "About Me", icon: User, action: () => scrollTo("#about"), category: "Navigation" },
    { id: "skills", label: "Skills & Toolbox", icon: Cpu, action: () => scrollTo("#skills"), category: "Navigation", keywords: ["tech", "stack"] },
    { id: "experience", label: "Experience", icon: Briefcase, action: () => scrollTo("#experience"), category: "Navigation", keywords: ["career", "timeline"] },
    { id: "testimonials", label: "Testimonials", icon: Sparkles, action: () => scrollTo("#testimonials"), category: "Navigation" },
    { id: "contact", label: "Contact Me", icon: Mail, action: () => scrollTo("#contact"), category: "Navigation" },
    { id: "resume", label: "Download Resume", icon: FileText, action: () => window.open("#", "_blank"), category: "Actions" },
    { id: "github", label: "Open GitHub", icon: Github, action: () => window.open("https://github.com", "_blank"), category: "Links" },
    { id: "linkedin", label: "Open LinkedIn", icon: Linkedin, action: () => window.open("https://linkedin.com", "_blank"), category: "Links" },
    { id: "twitter", label: "Open Twitter", icon: Twitter, action: () => window.open("https://twitter.com", "_blank"), category: "Links" },
  ];

  const filtered = query
    ? commands.filter((c) => {
        const q = query.toLowerCase();
        return (
          c.label.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.keywords?.some((k) => k.includes(q))
        );
      })
    : commands;

  const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, cmd) => {
    (acc[cmd.category] ||= []).push(cmd);
    return acc;
  }, {});

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        setQuery("");
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && filtered[activeIndex]) {
        filtered[activeIndex].action();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, filtered, activeIndex]);

  let flatIndex = -1;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-background/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[81] w-[90vw] max-w-lg"
          >
            <div className="glass-strong rounded-2xl shadow-2xl shadow-background/80 overflow-hidden border border-border/50">
              {/* Search input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-border/50">
                <Search size={18} className="text-muted-foreground shrink-0" />
                <input
                  autoFocus
                  placeholder="Search commands…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                />
                <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] text-muted-foreground border border-border rounded px-1.5 py-0.5 font-mono">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-[300px] overflow-y-auto p-2">
                {Object.entries(grouped).map(([category, items]) => (
                  <div key={category} className="mb-2 last:mb-0">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 px-3 py-1.5 font-medium">
                      {category}
                    </p>
                    {items.map((cmd) => {
                      flatIndex++;
                      const idx = flatIndex;
                      const Icon = cmd.icon;
                      return (
                        <button
                          key={cmd.id}
                          onClick={cmd.action}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                            idx === activeIndex
                              ? "bg-primary/10 text-primary"
                              : "text-foreground hover:bg-muted"
                          }`}
                        >
                          <Icon size={16} className="shrink-0 opacity-60" />
                          <span>{cmd.label}</span>
                        </button>
                      );
                    })}
                  </div>
                ))}
                {filtered.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-8">No results found</p>
                )}
              </div>

              {/* Footer hint */}
              <div className="border-t border-border/50 px-5 py-2.5 flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground/50">Navigate with ↑↓ • Enter to select</span>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground/50">
                  <Command size={10} />
                  <span>K to toggle</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
