import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ExternalLink, Github } from "lucide-react";

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hovered, setHovered] = useState(false);

  const icons: Record<string, string> = {
    "full-stack": "💻", frontend: "🎨", backend: "⚙️", mobile: "📱", ai: "🤖", "open-source": "🌐", dsa: "🧩", cloud: "☁️",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-2xl glass overflow-hidden cursor-pointer"
    >
      {/* Project thumbnail or fallback gradient */}
      <div className="h-48 relative overflow-hidden">
        {project.thumbnail_url ? (
          <img
            src={project.thumbnail_url}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            width={800}
            height={512}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <span className="text-6xl">{icons[project.category] || "📊"}</span>
          </div>
        )}
        {/* Hover overlay with links */}
        <motion.div
          className="absolute inset-0 bg-background/80 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
        >
          {project.github_url && (
            <motion.a href={project.github_url} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1 }} className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground" onClick={(e) => e.stopPropagation()}>
              <Github size={18} />
            </motion.a>
          )}
          {project.live_url && (
            <motion.a href={project.live_url} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1 }} className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground" onClick={(e) => e.stopPropagation()}>
              <ExternalLink size={18} />
            </motion.a>
          )}
        </motion.div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-xl font-display font-semibold text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
          {project.status && project.status !== "draft" && (
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${project.status === "live" ? "bg-green-500/10 text-green-500" : "bg-muted text-muted-foreground"}`}>{project.status}</span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech_stack?.map((tag: string) => (
            <span key={tag} className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground">{tag}</span>
          ))}
        </div>
      </div>
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={hovered ? { boxShadow: "0 0 40px -10px hsl(187 80% 55% / 0.3)" } : { boxShadow: "0 0 0px 0px transparent" }}
      />
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetch_ = async () => {
      const { data } = await supabase.from("projects").select("*").eq("published", true).eq("featured", true).order("sort_order");
      setProjects(data || []);
    };
    fetch_();
  }, []);

  return (
    <section id="projects" className="py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-16">
          <p className="text-primary font-medium mb-2 tracking-widest uppercase text-sm">Work</p>
          <h2 className="text-4xl sm:text-5xl font-display font-bold">Featured <span className="gradient-text">projects</span></h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
        {projects.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-center text-muted-foreground py-16"
          >
            Projects loading...
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
