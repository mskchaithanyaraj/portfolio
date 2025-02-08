import { motion } from "framer-motion";
import { skills, Skill } from "../data/skills";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SkillSet = () => {
  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-foreground mb-8">
          My Skill Set
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
};

const SkillCard = ({ skill }: { skill: Skill }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Card>
        <CardContent className="p-4 flex flex-col items-center">
          <img
            src={skill.logo || "/placeholder.svg"}
            alt={skill.name}
            className="w-16 h-16 mb-4"
          />
          <h3 className="text-lg font-semibold text-foreground">
            {skill.name}
          </h3>
          <Badge variant="secondary" className="mt-2">
            {skill.level}
          </Badge>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SkillSet;
