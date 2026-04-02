import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Server, Database, Cloud, Brain, Globe } from "lucide-react";

const categories = [
  {
    title: "Frontend",
    icon: Code2,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vue.js"],
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Node.js", "Express", "Python", "FastAPI", "GraphQL", "REST APIs"],
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["PostgreSQL", "MongoDB", "Redis", "Supabase", "Prisma", "Firebase"],
  },
  {
    title: "DevOps & Cloud",
    icon: Cloud,
    skills: ["AWS", "Docker", "Vercel", "CI/CD", "Nginx", "Terraform"],
  },
  {
    title: "AI & ML",
    icon: Brain,
    skills: ["OpenAI API", "LangChain", "TensorFlow", "Python ML", "RAG", "Prompt Engineering"],
  },
  {
    title: "Languages",
    icon: Globe,
    skills: ["TypeScript", "JavaScript", "Python", "Go", "SQL", "Rust"],
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-28 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-primary font-medium mb-2 tracking-widest uppercase text-sm">Toolbox</p>
          <h2 className="text-4xl sm:text-5xl font-display font-bold">
            Skills & <span className="gradient-text">technologies</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group glass rounded-2xl p-6 hover:border-primary/20 transition-colors"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                    <Icon size={18} />
                  </div>
                  <h3 className="font-display font-semibold text-foreground">{cat.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, j) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: i * 0.1 + j * 0.05 + 0.3 }}
                      className="text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
