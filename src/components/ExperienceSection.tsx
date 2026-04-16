import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    role: "Cloud Engineer (Trainee)",
    company: "NexEdge Technologies",
    period: "2025 — Present",
    description:
      "Provisioned and managed GCP infrastructure using Terraform (IaC). Configured VPC networks, managed VMs via Console and CLI, and implemented IAM roles. Built CI/CD pipelines with GitHub Actions, deployed containerized applications on GKE, and managed Docker containers integrated with GCP Artifact Registry.",
  },
  {
    role: "Computer Operator",
    company: "Wasma Cybercafé",
    period: "2022 — 2024",
    description:
      "Facilitated online payments, prepared and filed legal documents with the High Court and Magistrate Court, assisted customers with digital applications and registrations, and provided document processing and internet support services.",
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary font-medium mb-2 tracking-widest uppercase text-sm">Career</p>
          <h2 className="text-4xl sm:text-5xl font-display font-bold">
            My <span className="gradient-text">experience</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative flex items-start gap-8 md:flex-row"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-primary -translate-x-1.5 mt-6 glow-primary z-10" />

                {/* Card */}
                <div className="ml-16 md:ml-0 md:w-[calc(50%-2rem)] md:pr-4">
                  <motion.div
                    className="glass rounded-xl p-6 group"
                    whileHover={{ y: -4, boxShadow: "0 0 30px -10px hsl(187 80% 55% / 0.2)" }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <Briefcase size={16} />
                      </div>
                      <span className="text-xs text-muted-foreground font-medium">{exp.period}</span>
                    </div>
                    <h3 className="text-lg font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-primary/80 mb-3">{exp.company}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
