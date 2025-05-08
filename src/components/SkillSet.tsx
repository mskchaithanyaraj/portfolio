import { motion } from "framer-motion";
import { skills, type Skill } from "../data/skills";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/contexts/ThemeContext";

const SkillSet = () => {
  const { theme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-10 bg-gradient-to-br from-primary to-purple-500 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full opacity-10 bg-gradient-to-tr from-primary to-blue-500 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          className="text-3xl font-extrabold text-foreground mb-8 flex items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="mr-3">My Skill Set</span>
          <span className="h-px flex-grow bg-gradient-to-r from-primary/50 to-transparent" />
        </motion.h2>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const SkillCard = ({ skill }: { skill: Skill }) => {
  const { theme } = useTheme();

  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
    >
      <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/80 backdrop-blur-sm">
        <CardContent className="p-4 flex flex-col items-center">
          <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
            {/* Subtle glow effect behind the logo */}
            <div
              className={`absolute inset-0 rounded-full ${
                theme === "dark" ? "bg-primary/10" : "bg-primary/5"
              } blur-sm`}
            ></div>
            <img
              src={skill.logo || "placeholder.png"}
              alt={skill.name}
              className="w-12 h-12 relative z-10"
            />
          </div>
          <h3 className="text-lg font-semibold text-foreground text-center">
            {skill.name}
          </h3>
          <Badge
            variant="secondary"
            className={`mt-2 ${
              theme === "dark"
                ? "bg-primary/10 text-primary border-primary/20"
                : "bg-primary/10 text-primary border-primary/20"
            }`}
          >
            {skill.level}
          </Badge>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SkillSet;
