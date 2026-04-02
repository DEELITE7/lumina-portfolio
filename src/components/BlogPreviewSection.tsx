import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Calendar } from "lucide-react";

const posts = [
  {
    title: "Building a Real-Time Collaborative Editor",
    excerpt: "How I implemented WebSocket-based real-time collaboration with conflict resolution using CRDTs.",
    date: "Mar 2026",
    tags: ["WebSocket", "Architecture"],
    readTime: "8 min",
  },
  {
    title: "Why I Switched from REST to GraphQL",
    excerpt: "A practical comparison after migrating a production API, with real performance metrics.",
    date: "Feb 2026",
    tags: ["Backend", "GraphQL"],
    readTime: "6 min",
  },
  {
    title: "Designing for Accessibility First",
    excerpt: "Lessons learned from making our SaaS product fully WCAG 2.1 AA compliant.",
    date: "Jan 2026",
    tags: ["Design", "A11y"],
    readTime: "5 min",
  },
];

const BlogPreviewSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="blog" className="py-28 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-14"
        >
          <div>
            <p className="text-primary font-medium mb-2 tracking-widest uppercase text-sm">Blog</p>
            <h2 className="text-4xl sm:text-5xl font-display font-bold">
              Engineering <span className="gradient-text">notes</span>
            </h2>
          </div>
          <motion.a
            href="#"
            className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
            whileHover={{ x: 3 }}
          >
            View all <ArrowUpRight size={14} />
          </motion.a>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group glass rounded-2xl p-6 cursor-pointer hover:border-primary/20 transition-colors"
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                <Calendar size={12} />
                <span>{post.date}</span>
                <span className="text-border">•</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors mb-2 leading-snug">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
