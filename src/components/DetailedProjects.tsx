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

const DetailedProjects = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [expandedProjects, setExpandedProjects] = useState<
    Record<string, boolean>
  >({});

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
      className="min-h-screen bg-surface-0 text-primary-0"
    >
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <Link
          to="/"
          className="inline-flex items-center text-primary-0 hover:opacity-80 mb-8 transition-opacity duration-fast"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Portfolio
        </Link>

        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-12 text-primary-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Project Timeline
        </motion.h1>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-surface-30"></div>

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
                  <div className="absolute top-0 left-4 md:left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-primary-0 z-10"></div>

                  {/* Date marker */}
                  <div
                    className={`absolute top-0 left-4 md:left-1/2 transform -translate-x-1/2 ${
                      isEven
                        ? "translate-x-8 md:translate-x-12"
                        : "translate-x-8 md:-translate-x-40"
                    }`}
                  >
                    <span className="text-sm font-medium text-surface-0 bg-primary-0 px-3 py-1 rounded-full flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {project.date.month} {project.date.year}
                    </span>
                  </div>
                  <div className="h-10 md:hidden"></div>

                  <motion.div
                    className="p-6 md:p-8 rounded-lg border border-surface-30 w-full ml-2 md:ml-0 overflow-hidden hover:border-primary-40 transition-all duration-normal bg-surface-0"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-4 mt-4 md:mt-0">
                      <h3 className="text-2xl font-bold text-primary-0">
                        {project.name}
                      </h3>
                    </div>
                    <div className="relative overflow-hidden rounded-lg mb-4 group">
                      <img
                        src={project.imageUrl || "placeholder.png"}
                        alt={project.name}
                        className="w-full h-48 object-cover rounded-lg transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-surface-0/60 opacity-0 group-hover:opacity-100 transition-opacity duration-normal"></div>
                    </div>
                    <p className="text-primary-30 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="mb-4">
                      <h4 className="font-semibold text-primary-0 mb-2 flex items-center">
                        <Code className="w-4 h-4 mr-2" />
                        Tech Stack:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-md border border-surface-30 text-primary-0 text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>{" "}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mb-4 p-4 rounded-lg border border-surface-30">
                            <h4 className="font-semibold text-primary-0 mb-2 flex items-center">
                              <AlertTriangle className="w-4 h-4 mr-2" />
                              Challenges:
                            </h4>
                            <ul className="space-y-2 text-primary-30">
                              {project.challenges.map((challenge, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-0 mt-2 mr-2"></span>
                                  <span>{challenge}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mb-4 p-4 rounded-lg border border-surface-30">
                            <h4 className="font-semibold text-primary-0 mb-2 flex items-center">
                              <Lightbulb className="w-4 h-4 mr-2" />
                              Solutions:
                            </h4>
                            <ul className="space-y-2 text-primary-30">
                              {project.solutions.map((solution, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-0 mt-2 mr-2"></span>
                                  <span>{solution}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mb-4 p-4 rounded-lg border border-surface-30">
                            <h4 className="font-semibold text-primary-0 mb-2 flex items-center">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Outcomes:
                            </h4>
                            <ul className="space-y-2 text-primary-30">
                              {project.outcomes.map((outcome, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-0 mt-2 mr-2"></span>
                                  <span>{outcome}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                      <button
                        onClick={() => toggleProjectDetails(project.id)}
                        className={`px-4 py-2 rounded-lg flex items-center justify-center transition-all duration-normal ${
                          isExpanded
                            ? "border border-primary-0 text-primary-0"
                            : "border border-surface-30 text-primary-0 hover:border-primary-0"
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
                      </button>

                      <div className="flex flex-col sm:flex-row gap-4 sm:ml-auto">
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 text-surface-0 rounded-lg bg-primary-0 hover:bg-primary-20 flex items-center justify-center transition-all duration-normal"
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
                            className="px-4 py-2 border border-surface-30 text-primary-0 rounded-lg hover:border-primary-0 transition-all duration-normal flex items-center justify-center"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </a>
                        )}
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

export default DetailedProjects;
