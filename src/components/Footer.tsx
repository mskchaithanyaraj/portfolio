import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaCode } from "react-icons/fa";
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
      className="py-12 bg-surface-0 relative overflow-hidden border-t border-surface-30"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-center gap-6"
        >
          {/* Left: Copyright */}
          <div className="text-center md:text-left">
            <p className="text-primary-30 text-sm flex items-center justify-center md:justify-start gap-1 flex-wrap">
              <span>
                &copy; {currentYear} Sri Krishna Chaithanya Raj Masimukku.
              </span>
              <span className="flex items-center gap-1">
                Built with
                <Heart className="h-4 w-4 text-red-500" />
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
                className="text-sm text-primary-30 hover:text-primary-0 transition-all duration-normal"
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
              },
              {
                href: "https://www.linkedin.com/in/mskchaithanyaraj/",
                icon: FaLinkedin,
                label: "LinkedIn",
              },
              {
                href: "https://leetcode.com/u/mskchaithanyaraj/",
                icon: FaCode,
                label: "LeetCode",
              },
              {
                href: "https://x.com/mskchaithanya",
                icon: FaTwitter,
                label: "Twitter",
              },
            ].map((social) => (
              <motion.a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-0 hover:text-primary-20 transition-all duration-normal"
                aria-label={social.label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
