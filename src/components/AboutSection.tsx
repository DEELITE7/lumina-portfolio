import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  { name: "React / Next.js", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Node.js", level: 85 },
  { name: "UI/UX Design", level: 88 },
  { name: "Python", level: 75 },
  { name: "DevOps / Cloud", level: 70 },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary font-medium mb-2 tracking-widest uppercase text-sm">About Me</p>
          <h2 className="text-4xl sm:text-5xl font-display font-bold">
            Crafting digital <span className="gradient-text">experiences</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Avatar */}
            <div className="relative w-24 h-24 mb-8">
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-display font-bold text-primary-foreground">
                A
              </div>
              <motion.div
                className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 -z-10 blur-sm"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              I'm a passionate full-stack developer with 5+ years of experience building
              modern web applications. I specialize in creating performant, accessible,
              and visually stunning digital products.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies,
              contributing to open-source projects, or designing interfaces that push
              creative boundaries. I believe great software is where engineering
              excellence meets beautiful design.
            </p>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {skills.map((skill, i) => (
              <div key={skill.name}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-foreground">{skill.name}</span>
                  <span className="text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
