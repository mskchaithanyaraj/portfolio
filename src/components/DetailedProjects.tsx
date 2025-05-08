import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { detailedProjects } from "../data/detailedProjects";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Github,
  Calendar,
  Code,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useTheme } from "@/contexts/ThemeContext";

const DetailedProjects = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [expandedProjects, setExpandedProjects] = useState<
    Record<string, boolean>
  >({});
  const { theme } = useTheme();

  const toggleProjectDetails = (projectId: string) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  // Sort projects by year and month (latest first)
  const sortedProjects = [...detailedProjects].sort((a, b) => {
    const yearDiff = b.date.year - a.date.year;
    if (yearDiff !== 0) return yearDiff; // Sort by year first
    return (
      new Date(`${b.date.month} 1, ${b.date.year}`).getMonth() -
      new Date(`${a.date.month} 1, ${a.date.year}`).getMonth()
    );
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background text-foreground"
    >
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/"
          className="inline-flex items-center text-primary hover:text-primary/80 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Portfolio
        </Link>

        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-12 bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Project Timeline
        </motion.h1>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary/80 via-purple-500/80 to-pink-500/80 rounded-full"></div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {sortedProjects.map((project, index) => {
              const isExpanded = expandedProjects[project.id] || false;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className={`relative mb-16 pl-8 ${
                    isEven
                      ? "md:pr-[calc(50%+2rem)] md:pl-0"
                      : "md:pl-[calc(50%+2rem)] md:pr-0"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute top-0 left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary z-10 shadow-lg shadow-primary/30"></div>

                  {/* Date marker */}
                  <div
                    className={`absolute top-0 left-4 md:left-1/2 transform -translate-x-1/2 ${
                      isEven
                        ? "translate-x-8 md:translate-x-12"
                        : "translate-x-8 md:-translate-x-40"
                    }`}
                  >
                    <span className="text-sm font-medium text-white bg-gradient-to-r from-primary to-purple-600 px-3 py-1 rounded-full shadow-md flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {project.date.month} {project.date.year}
                    </span>
                  </div>

                  <motion.div
                    className={`p-1 rounded-xl shadow-xl w-full ml-2 md:ml-0 overflow-hidden ${
                      theme === "dark"
                        ? "bg-gradient-to-br from-primary/20 to-purple-500/20"
                        : "bg-gradient-to-br from-primary/10 to-purple-500/10"
                    }`}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-card/80 backdrop-blur-sm p-6 rounded-lg">
                      <div className="mb-4 mt-4 md:mt-0">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-transparent bg-clip-text">
                          {project.name}
                        </h3>
                      </div>

                      <div className="relative overflow-hidden rounded-lg mb-4 group">
                        <img
                          src={project.imageUrl || "placeholder.png"}
                          alt={project.name}
                          className="w-full h-48 object-cover rounded-lg transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      <p className="text-foreground/80 mb-4 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="mb-4">
                        <h4 className="font-semibold text-primary mb-2 flex items-center">
                          <Code className="w-4 h-4 mr-2" />
                          Tech Stack:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="mb-4 p-4 rounded-lg bg-background/50">
                              <h4 className="font-semibold text-primary mb-2 flex items-center">
                                <AlertTriangle className="w-4 h-4 mr-2" />
                                Challenges:
                              </h4>
                              <ul className="space-y-2 text-foreground/80">
                                {project.challenges.map((challenge, i) => (
                                  <li key={i} className="flex items-start">
                                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                                    <span>{challenge}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="mb-4 p-4 rounded-lg bg-background/50">
                              <h4 className="font-semibold text-primary mb-2 flex items-center">
                                <Lightbulb className="w-4 h-4 mr-2" />
                                Solutions:
                              </h4>
                              <ul className="space-y-2 text-foreground/80">
                                {project.solutions.map((solution, i) => (
                                  <li key={i} className="flex items-start">
                                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                                    <span>{solution}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="mb-4 p-4 rounded-lg bg-background/50">
                              <h4 className="font-semibold text-primary mb-2 flex items-center">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Outcomes:
                              </h4>
                              <ul className="space-y-2 text-foreground/80">
                                {project.outcomes.map((outcome, i) => (
                                  <li key={i} className="flex items-start">
                                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                                    <span>{outcome}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="flex flex-col sm:flex-row gap-4 mt-6">
                        <Button
                          onClick={() => toggleProjectDetails(project.id)}
                          className={`px-4 py-2 rounded-lg flex items-center justify-center transition-colors ${
                            isExpanded
                              ? "bg-primary/20 text-primary hover:bg-primary/30"
                              : "bg-primary/10 text-primary hover:bg-primary/20"
                          }`}
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="w-4 h-4 mr-2" />
                              Hide Details
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4 mr-2" />
                              View Complete Details
                            </>
                          )}
                        </Button>

                        <div className="flex flex-col sm:flex-row gap-4 sm:ml-auto">
                          {project.githubLink && (
                            <a
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 text-white rounded-lg bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 flex items-center justify-center shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all"
                            >
                              <Github className="w-4 h-4 mr-2" />
                              GitHub
                            </a>
                          )}
                          {project.demoLink && (
                            <a
                              href={project.demoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors flex items-center justify-center"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Live Demo
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Helper Button component for the DetailedProjects component
const Button = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default DetailedProjects;
