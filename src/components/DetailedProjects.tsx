"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { detailedProjects } from "../data/detailedProjects";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Github,
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

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20"></div>

          {sortedProjects.map((project, index) => {
            const isExpanded = expandedProjects[project.id] || false;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`relative mb-16 pl-8 ${
                  isEven
                    ? "md:pr-[calc(50%+2rem)] md:pl-0"
                    : "md:pl-[calc(50%+2rem)] md:pr-0"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute top-0 left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary z-10"></div>

                {/* Date marker */}
                <div
                  className={`absolute top-0 left-4 md:left-1/2 transform -translate-x-1/2 ${
                    isEven
                      ? "translate-x-2 md:translate-x-4"
                      : "translate-x-2 md:-translate-x-32"
                  }`}
                >
                  <span className="text-sm font-medium text-primary bg-background/80 px-2 py-1 rounded-full backdrop-blur-sm">
                    {project.date.month} {project.date.year}
                  </span>
                </div>

                <motion.div
                  className="glass p-6 rounded-xl shadow-lg w-full ml-2 md:ml-0"
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="mb-4 mt-4 md:mt-0">
                    <h3 className="text-2xl font-bold gradient-text mt-1">
                      {project.name}
                    </h3>
                  </div>

                  <img
                    src={project.imageUrl || "/placeholder.svg"}
                    alt={project.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />

                  <p className="text-foreground/80 mb-4">
                    {project.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-primary mb-2">
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
                        <div className="mb-4">
                          <h4 className="font-semibold text-primary mb-2">
                            Challenges:
                          </h4>
                          <ul className="list-disc list-inside text-foreground/80">
                            {project.challenges.map((challenge, i) => (
                              <li key={i}>{challenge}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="mb-4">
                          <h4 className="font-semibold text-primary mb-2">
                            Solutions:
                          </h4>
                          <ul className="list-disc list-inside text-foreground/80">
                            {project.solutions.map((solution, i) => (
                              <li key={i}>{solution}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="mb-4">
                          <h4 className="font-semibold text-primary mb-2">
                            Outcomes:
                          </h4>
                          <ul className="list-disc list-inside text-foreground/80">
                            {project.outcomes.map((outcome, i) => (
                              <li key={i}>{outcome}</li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <button
                      onClick={() => toggleProjectDetails(project.id)}
                      className="px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors flex items-center justify-center"
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
                          className="px-4 py-2 text-white rounded-lg bg-primary/80 flex items-center justify-center"
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
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default DetailedProjects;
