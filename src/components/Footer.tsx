import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.p
            className="text-sm text-muted-foreground flex items-center gap-1"
            whileHover={{ color: "hsl(187 80% 55%)" }}
          >
            © {new Date().getFullYear()} Elebiemayo Iseoluwa.
            <Heart size={14} className="text-primary" /> and React
          </motion.p>

          <div className="flex items-center gap-4">
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
                className="text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ y: -2 }}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
