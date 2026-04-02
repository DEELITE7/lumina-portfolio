import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "FinanceFlow",
    description: "A modern fintech dashboard with real-time analytics, transaction tracking, and AI-powered insights.",
    tags: ["React", "TypeScript", "D3.js", "Node.js"],
    color: "from-primary/20 to-accent/20",
    icon: "📊",
  },
  {
    title: "DevCollab",
    description: "Real-time collaborative code editor with video chat, live cursors, and integrated terminal.",
    tags: ["Next.js", "WebSocket", "WebRTC", "PostgreSQL"],
    color: "from-accent/20 to-primary/20",
    icon: "💻",
  },
  {
    title: "EcoTrack",
    description: "Sustainability tracking platform helping companies measure and reduce their carbon footprint.",
    tags: ["React", "Python", "TensorFlow", "AWS"],
    color: "from-primary/20 to-green-500/20",
    icon: "🌱",
  },
  {
    title: "SoundWave",
    description: "Music streaming app with social features, playlist sharing, and AI-curated recommendations.",
    tags: ["React Native", "GraphQL", "Redis", "Spotify API"],
    color: "from-purple-500/20 to-primary/20",
    icon: "🎵",
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hovered, setHovered] = useState(false);

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
      {/* Gradient background */}
      <div className={`h-48 bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden`}>
        <motion.span
          className="text-6xl"
          animate={hovered ? { scale: 1.2, rotate: 10 } : { scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {project.icon}
        </motion.span>
        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-background/80 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground"
          >
            <Github size={18} />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground"
          >
            <ExternalLink size={18} />
          </motion.div>
        </motion.div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-display font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Glow on hover */}
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

  return (
    <section id="projects" className="py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary font-medium mb-2 tracking-widest uppercase text-sm">Work</p>
          <h2 className="text-4xl sm:text-5xl font-display font-bold">
            Featured <span className="gradient-text">projects</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
