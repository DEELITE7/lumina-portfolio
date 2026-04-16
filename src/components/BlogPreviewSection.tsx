import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Clock } from "lucide-react";

const BlogPreviewSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetch_ = async () => {
      const { data } = await supabase.from("blog_posts").select("*").eq("published", true).order("created_at", { ascending: false }).limit(3);
      setPosts(data || []);
    };
    fetch_();
  }, []);

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="py-28 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-14">
          <p className="text-primary font-medium mb-2 tracking-widest uppercase text-sm">Blog</p>
          <h2 className="text-4xl sm:text-5xl font-display font-bold">Engineering <span className="gradient-text">notes</span></h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group glass rounded-2xl overflow-hidden cursor-pointer hover:border-primary/20 transition-colors"
            >
              {post.cover_image && (
                <div className="aspect-video overflow-hidden">
                  <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <Calendar size={12} />
                  <span>{new Date(post.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
                  <span className="text-border">•</span>
                  <Clock size={12} />
                  <span>{post.read_time} min</span>
                </div>
                <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors mb-2 leading-snug">{post.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex flex-wrap gap-1.5">
                  {post.tags?.map((tag: string) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
