import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { Maximize2, Calendar, Github, ExternalLink } from "lucide-react";
import { hobbyProjects } from "../data/hobbyProjects";
// Type definitions for props
import type { FC } from "react";

const HobbyProjects = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  // Sort by year and month (latest first)
  const sortedProjects = [...hobbyProjects].sort((a, b) => {
    const yearDiff = b.date.year - a.date.year;
    if (yearDiff !== 0) return yearDiff;
    return (
      new Date(`${b.date.month} 1, ${b.date.year}`).getMonth() -
      new Date(`${a.date.month} 1, ${a.date.year}`).getMonth()
    );
  });

  const [previewImg, setPreviewImg] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
    >
      <Navbar />

      {/* Single Image Preview Modal */}
      {previewImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setPreviewImg(null)}
        >
          <button
            className="absolute top-6 right-6 text-white bg-black/70 hover:bg-black/90 rounded-full p-3 transition-all duration-200 z-10"
            onClick={() => setPreviewImg(null)}
            aria-label="Close preview"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <img
            src={previewImg}
            alt="Project Preview"
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-12 transition-colors font-medium"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Portfolio
        </Link>

        {/* Page Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Project Timeline
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A chronological journey through my hobby projects and learning
            experiences
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-blue-600"></div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-16"
          >
            {sortedProjects.map((project, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 top-6 w-4 h-4 rounded-full bg-blue-500 border-4 border-white dark:border-gray-900 shadow-lg z-10"></div>

                  {/* Desktop Layout */}
                  <div className="hidden md:grid md:grid-cols-2 md:gap-8 md:items-start">
                    {!isEven ? (
                      <>
                        {/* Left side - Date */}
                        <div className="flex justify-end pr-8 pt-4">
                          <div className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">
                            <Calendar className="w-4 h-4 mr-2" />
                            {project.date.month} {project.date.year}
                          </div>
                        </div>
                        {/* Right side - Card */}
                        <div className="pl-8">
                          <ProjectCard
                            project={project}
                            setPreviewImg={setPreviewImg}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Left side - Card */}
                        <div className="pr-8">
                          <ProjectCard
                            project={project}
                            setPreviewImg={setPreviewImg}
                          />
                        </div>
                        {/* Right side - Date */}
                        <div className="flex justify-start pl-8 pt-4">
                          <div className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">
                            <Calendar className="w-4 h-4 mr-2" />
                            {project.date.month} {project.date.year}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Mobile Layout */}
                  <div className="md:hidden pl-20">
                    {/* Date badge */}
                    <div className="mb-4">
                      <div className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md w-fit">
                        <Calendar className="w-4 h-4 mr-2" />
                        {project.date.month} {project.date.year}
                      </div>
                    </div>
                    {/* Project card */}
                    <ProjectCard
                      project={project}
                      setPreviewImg={setPreviewImg}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
          {/* End of timeline message */}
          <div className="flex flex-col items-center justify-center mt-10 mb-4">
            <div className="text-lg md:text-xl font-semibold text-blue-700 dark:text-blue-300 mb-2 text-center">
              That's all, more projects coming soon ;)
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 text-center max-w-md">
              Make sure to try the above projects.
              <br />
              If you find any issues, please raise them on{" "}
              <a
                href="https://github.com/mskchaithanyaraj"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-500 hover:text-blue-700"
              >
                GitHub
              </a>
              !
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

type HobbyProject = {
  id: string;
  name: string;
  description: string;
  date: { month: string; year: number };
  techStack: string[];
  imageUrl?: string;
  githubLink?: string;
  demoLink?: string;
};

type ProjectCardProps = {
  project: HobbyProject;
  setPreviewImg: (img: string) => void;
};

const ProjectCard: FC<ProjectCardProps> = ({ project, setPreviewImg }) => {
  return (
    <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Project image */}
        <div
          className="relative overflow-hidden cursor-pointer group"
          onClick={() => setPreviewImg(project.imageUrl || "/placeholder.png")}
        >
          <img
            src={project.imageUrl || "/placeholder.png"}
            alt={project.name}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
            <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        <div className="p-6">
          {/* Project title */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            {project.name}
          </h3>

          {/* Project description */}
          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-2 bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                <Github className="w-4 h-4 mr-2" />
                View Code
              </a>
            )}
            {project.demoLink && project.demoLink !== "" && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-2 border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900 rounded-lg transition-all duration-200 font-medium"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HobbyProjects;
