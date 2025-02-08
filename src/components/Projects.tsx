import { motion } from "framer-motion";
import { projects, Project } from "../data/projects";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Projects = () => {
  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-foreground mb-8">
          My Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.045 }}>
      <Card>
        <CardContent className="p-0">
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {project.name}
            </h3>
            <p className="text-muted-foreground mb-4">{project.description}</p>
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Tech Stack:
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, index) => (
                  <Badge key={index} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Key Learnings:
              </h4>
              <ul className="list-disc list-inside text-muted-foreground">
                {project.keyLearnings.map((learning, index) => (
                  <li key={index}>{learning}</li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between">
              <Button asChild>
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </Button>
              {project.demoLink && (
                <Button asChild variant="outline">
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Projects;
