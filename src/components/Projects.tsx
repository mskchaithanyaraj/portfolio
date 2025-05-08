import { motion } from "framer-motion";
import { projects, type Project } from "../data/projects";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-foreground mb-8">
          My Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="group">
            <Link to="/detailed-projects">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1.045 }}
      className="h-full"
    >
      <Card className="flex flex-col h-full">
        <CardContent className="p-0 flex flex-col h-full">
          <img
            src={project.image || "/placeholder.png"}
            alt={project.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="p-6 flex flex-col flex-grow">
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
            <div className="mb-4 flex-grow">
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Key Learnings:
              </h4>
              <ul className="list-disc list-inside text-muted-foreground">
                {project.keyLearnings.map((learning, index) => (
                  <li key={index}>{learning}</li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between mt-auto">
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
