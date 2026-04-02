import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Engineering Manager at TechCorp",
    text: "Alex delivered an outstanding web application that exceeded our expectations. The attention to performance and UX detail was remarkable.",
    initials: "SC",
  },
  {
    name: "Marcus Rivera",
    role: "Founder, StartupLab",
    text: "One of the best developers I've worked with. They brought both technical expertise and a product mindset that made a real difference.",
    initials: "MR",
  },
  {
    name: "Dr. Priya Sharma",
    role: "Professor of CS, University",
    text: "An exceptional student who consistently went above and beyond. Their projects demonstrated real-world engineering maturity.",
    initials: "PS",
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="testimonials" className="py-28 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="text-primary font-medium mb-2 tracking-widest uppercase text-sm">Social Proof</p>
          <h2 className="text-4xl sm:text-5xl font-display font-bold">
            Kind <span className="gradient-text">words</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="glass rounded-2xl p-6 relative group hover:border-primary/20 transition-colors"
            >
              <Quote size={24} className="text-primary/20 mb-4" />
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-primary-foreground">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
