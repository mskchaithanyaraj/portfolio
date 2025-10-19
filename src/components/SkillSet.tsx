import { motion } from "framer-motion";
import { skills, type Skill } from "../data/skills";
import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";

const SkillSet = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Create seamless infinite scroll with proper duplication
  const duplicatedSkills = [...skills, ...skills, ...skills];
  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-10 bg-gradient-to-br from-primary to-purple-500 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full opacity-10 bg-gradient-to-tr from-primary to-blue-500 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="flex items-center justify-between mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-extrabold text-foreground flex items-center">
            <span className="mr-3">My Skill Set</span>
            <span className="h-px flex-grow bg-gradient-to-r from-primary/50 to-transparent" />
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="ml-4 text-sm text-primary hover:text-primary/80 underline decoration-dotted underline-offset-4 transition-colors"
          >
            View All Skills
          </button>
        </motion.div>

        {/* Infinite Scroll Container */}
        <div className="relative overflow-hidden py-4">
          {/* Subtle gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-4 md:gap-6"
            animate={{
              x: [0, "-33.333%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 15,
                ease: "linear",
              },
            }}
            style={{
              width: "300%", // Triple width for seamless loop
            }}
          >
            {duplicatedSkills.map((skill, index) => (
              <div key={`${skill.id}-${index}`} className="flex-shrink-0">
                <SkillCard skill={skill} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Skills Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            className="bg-background rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden border border-foreground/10"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-foreground/10">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-foreground">
                  All My Skills
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors p-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content with Custom Scrollbar */}
            <div className="relative">
              <div
                className="p-6 overflow-y-scroll scroll-smooth relative webkit-scrollbar-hide"
                style={{
                  maxHeight: "60vh",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  marginRight: "0px",
                  paddingRight: "23px",
                }}
                onScroll={(e) => {
                  const element = e.currentTarget;
                  const progress =
                    element.scrollTop /
                    (element.scrollHeight - element.clientHeight);
                  setScrollProgress(progress || 0);
                }}
              >
                {/* Skills Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-foreground/5 border border-foreground/10"
                    >
                      <img
                        src={skill.logo || "placeholder.png"}
                        alt={skill.name}
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          e.currentTarget.src = "placeholder.png";
                        }}
                      />
                      <div>
                        <h4 className="font-medium text-sm text-foreground">
                          {skill.name}
                        </h4>
                        <span className="text-xs text-muted-foreground">
                          {skill.level}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Proof of Work Section */}
                <div className="bg-gradient-to-r from-primary/5 via-purple-500/5 to-pink-500/5 border border-primary/20 rounded-xl p-4 mb-4">
                  <h4 className="font-semibold text-foreground mb-2">
                    Need proof of work?
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Well, I do have{" "}
                    <a
                      href="#certifications"
                      onClick={() => setIsModalOpen(false)}
                      className="text-primary hover:text-primary/80 underline decoration-dotted underline-offset-4 font-medium transition-colors"
                    >
                      certifications
                    </a>{" "}
                    (because who doesn't love a good certificate, right?), but
                    more than that, I have actual projects that you can check
                    out!
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href="#experience"
                      onClick={() => setIsModalOpen(false)}
                      className="inline-flex items-center px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors duration-300 text-xs font-medium"
                    >
                      Work Experience
                    </a>
                    <a
                      href="#projects"
                      onClick={() => setIsModalOpen(false)}
                      className="inline-flex items-center px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-500 rounded-lg transition-colors duration-300 text-xs font-medium"
                    >
                      All Projects
                    </a>
                  </div>
                </div>

                {/* Contact Message */}
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                  <h4 className="font-semibold text-foreground mb-2">
                    Looking for a specific skill?
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Don't see what you're looking for? I'm always happy to learn
                    new technologies and skills! As a quick learner, I can adapt
                    to new tools and frameworks based on project requirements.
                  </p>
                  <a
                    href="#contact"
                    onClick={() => setIsModalOpen(false)}
                    className="inline-flex items-center text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Get in touch →
                  </a>
                </div>
              </div>

              {/* Custom Scroll Indicator */}
              <div className="absolute right-2 top-2 bottom-2 w-1 bg-foreground/10 rounded-full pointer-events-none">
                <div
                  className="bg-primary rounded-full w-full transition-all duration-150"
                  style={{ height: `${Math.max(5, scrollProgress * 100)}%` }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

const SkillCard = ({ skill }: { skill: Skill }) => {
  const { theme } = useTheme();

  return (
    <div className="w-32 md:w-40 flex-shrink-0 group">
      <div
        className={`
        relative p-4 md:p-6 rounded-2xl transition-all duration-300
        ${
          theme === "dark"
            ? "bg-foreground/5 hover:bg-foreground/10 border border-foreground/10"
            : "bg-foreground/5 hover:bg-foreground/8 border border-foreground/10"
        }
      `}
      >
        {/* Logo */}
        <div className="flex justify-center mb-3 md:mb-4">
          <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
            <img
              src={skill.logo || "placeholder.png"}
              alt={skill.name}
              className="w-8 h-8 md:w-10 md:h-10 object-contain transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                e.currentTarget.src = "placeholder.png";
              }}
            />
          </div>
        </div>

        {/* Name */}
        <h3 className="text-sm md:text-base font-medium text-foreground text-center mb-2 leading-tight">
          {skill.name}
        </h3>

        {/* Level tag */}
        <div className="flex justify-center">
          <span
            className={`
            text-xs px-2 py-1 rounded-full border transition-colors duration-300
            ${
              theme === "dark"
                ? "bg-foreground/5 border-foreground/20 text-foreground/70"
                : "bg-foreground/5 border-foreground/20 text-foreground/70"
            }
          `}
          >
            {skill.level}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SkillSet;
