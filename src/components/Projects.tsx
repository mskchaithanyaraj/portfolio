import { motion } from "framer-motion";
import { projects, type Project } from "../data/projects";
import { Link } from "react-router-dom";
import { ArrowRight, Github, ExternalLink } from "lucide-react";

const Projects = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section id="projects" className="py-10 bg-surface-0">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.h2
          className="text-3xl font-extrabold text-primary-0 mb-8 flex items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="mr-3">Projects</span>
          <span className="h-px flex-grow bg-surface-30" />
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            to="/detailed-projects"
            className="inline-flex items-center px-6 py-3 bg-primary-0 text-surface-0 rounded-md hover:bg-primary-20 transition-all duration-normal font-medium group"
          >
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      className="h-full"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
    >
      <div className="flex flex-col h-full overflow-hidden border border-surface-30 rounded-lg hover:border-primary-40 transition-all duration-normal bg-surface-0">
        <div className="p-0 flex flex-col h-full">
          <div className="relative overflow-hidden group">
            <img
              src={project.image || "placeholder.png"}
              alt={project.name}
              className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-surface-0/60 opacity-0 group-hover:opacity-100 transition-opacity duration-normal"></div>
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-semibold text-primary-0 mb-2">
              {project.name}
            </h3>
            <p className="text-primary-30 mb-4">{project.description}</p>
            <div className="mb-4">
              <h4 className="text-base font-semibold text-primary-0 mb-2">
                Tech Stack:
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs border border-surface-30 text-primary-0 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-4 flex-grow">
              <h4 className="text-base font-semibold text-primary-0 mb-2">
                Key Learnings:
              </h4>
              <ul className="list-disc list-inside text-primary-30 text-sm">
                {project.keyLearnings.map((learning, index) => (
                  <li key={index}>{learning}</li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between mt-auto gap-3">
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center flex-1 px-4 py-2 bg-primary-0 text-surface-0 rounded-md hover:bg-primary-20 transition-all duration-normal text-sm font-medium"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
              {project.demoLink && (
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center flex-1 px-4 py-2 border border-surface-30 text-primary-0 rounded-md hover:border-primary-0 transition-all duration-normal text-sm font-medium"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
