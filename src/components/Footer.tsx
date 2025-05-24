import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.footer
      className="py-12 bg-background relative overflow-hidden border-t border-border/20"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-5 bg-gradient-to-br from-primary to-purple-500 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full opacity-5 bg-gradient-to-tr from-primary to-blue-500 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-center gap-6"
        >
          {/* Left: Copyright */}
          <div className="text-center md:text-left">
            <p className="text-muted-foreground text-sm flex items-center justify-center md:justify-start gap-1 flex-wrap">
              <span>
                &copy; {currentYear} Sri Krishna Chaithanya Raj Masimukku.
              </span>
              <span className="flex items-center gap-1">
                Built with
                <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              </span>
            </p>
          </div>

          {/* Center: Navigation */}
          <nav className="hidden lg:flex gap-6">
            {[
              { href: "#about", label: "About" },
              { href: "#skills", label: "Skills" },
              { href: "#certifications", label: "Certifications" },
              { href: "#projects", label: "Projects" },
              { href: "#contact", label: "Contact" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-105 transform"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Socials */}
          <div className="flex justify-center md:justify-end gap-4">
            {[
              {
                href: "https://github.com/mskchaithanyaraj",
                icon: FaGithub,
                label: "GitHub",
                hoverColor: "hover:text-gray-900 dark:hover:text-white",
              },
              {
                href: "https://www.linkedin.com/in/mskchaithanyaraj/",
                icon: FaLinkedin,
                label: "LinkedIn",
                hoverColor: "hover:text-[#0077b5]",
              },
              {
                href: "https://x.com/mskchaithanya",
                icon: FaTwitter,
                label: "Twitter",
                hoverColor: "hover:text-[#1da1f2]",
              },
            ].map((social) => (
              <motion.a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-muted-foreground ${social.hoverColor} transition-all duration-300 transform hover:scale-110 group`}
                aria-label={social.label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-primary/20 scale-0 group-hover:scale-100 transition-transform duration-300" />
                  <social.icon className="h-5 w-5 relative z-10 p-0.5" />
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
