import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import {
  Maximize2,
  Calendar,
  Github,
  ExternalLink,
  Sparkles,
} from "lucide-react";
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
      className="min-h-screen bg-surface-0"
    >
      <Navbar />

      {/* Single Image Preview Modal */}
      {previewImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-surface-0/90 p-4"
          onClick={() => setPreviewImg(null)}
        >
          <button
            className="absolute top-6 right-6 text-primary-0 bg-surface-0 hover:bg-surface-10 rounded-full p-3 transition-all duration-normal z-10"
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
          className="inline-flex items-center text-primary-0 hover:text-primary-20 mb-12 transition-all duration-normal font-medium"
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
          <h1 className="text-4xl md:text-5xl font-bold text-primary-0 mb-4">
            Project Timeline
          </h1>
          <p className="text-lg text-primary-30 max-w-2xl mx-auto">
            A chronological journey through my hobby projects and learning
            experiences
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-surface-30"></div>

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
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 top-6 w-4 h-4 rounded-full bg-primary-0 border-4 border-surface-0 z-10"></div>

                  {/* Desktop Layout */}
                  <div className="hidden md:grid md:grid-cols-2 md:gap-8 md:items-start">
                    {!isEven ? (
                      <>
                        {/* Left side - Date */}
                        <div className="flex justify-end pr-8 pt-4">
                          <div className="flex items-center bg-primary-0 text-surface-0 px-4 py-2 rounded-full text-sm font-medium">
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
                          <div className="flex items-center bg-primary-0 text-surface-0 px-4 py-2 rounded-full text-sm font-medium">
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
                      <div className="flex items-center bg-primary-0 text-surface-0 px-4 py-2 rounded-full text-sm font-medium w-fit">
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

          {/* Timeline End Indicator */}
          <motion.div
            className="relative flex justify-center mt-16"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            {/* End dot */}
            <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary-0 border-4 border-surface-0 z-10"></div>
          </motion.div>
        </div>

        {/* End Section - Separated from timeline */}
        <motion.div
          className="max-w-4xl mx-auto mt-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="rounded-2xl p-8 border border-surface-30">
            <div className="text-center">
              {/* Header with icon */}
              <motion.div
                className="flex items-center justify-center mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, duration: 0.4, type: "spring" }}
              >
                <div className="bg-primary-0 rounded-full p-3">
                  <Sparkles className="w-6 h-6 text-surface-0" />
                </div>
              </motion.div>

              {/* Main message */}
              <motion.h2
                className="text-xl md:text-2xl font-bold text-primary-0 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                That's all for now; more projects will be coming soon!
              </motion.h2>

              {/* Subtitle */}
              <motion.div
                className="text-primary-30 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.5 }}
              >
                <p className="text-lg mb-2">
                  Make sure to try the above projects.
                </p>
                <p className="text-base">
                  If you find any issues, please raise them on{" "}
                  <motion.a
                    href="https://github.com/mskchaithanyaraj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary-0 hover:text-primary-20 font-semibold transition-all duration-normal underline decoration-2 underline-offset-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-4 h-4 mr-1" />
                    GitHub
                  </motion.a>
                  !
                </p>
              </motion.div>

              {/* Call to action */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8, duration: 0.5 }}
              >
                <Link
                  to="/"
                  className="inline-flex items-center px-6 py-3 bg-primary-0 hover:bg-primary-20 text-surface-0 rounded-full font-semibold transition-all duration-normal"
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
              </motion.div>
            </div>
          </div>
        </motion.div>
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
      <div className="bg-surface-0 rounded-xl border border-surface-30 hover:border-primary-40 transition-all duration-normal overflow-hidden">
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
          <div className="absolute inset-0 bg-surface-0/0 group-hover:bg-surface-0/60 transition-all duration-normal flex items-center justify-center">
            <Maximize2 className="w-8 h-8 text-primary-0 opacity-0 group-hover:opacity-100 transition-opacity duration-normal" />
          </div>
        </div>

        <div className="p-6">
          {/* Project title */}
          <h3 className="text-xl font-bold text-primary-0 mb-3">
            {project.name}
          </h3>

          {/* Project description */}
          <p className="text-primary-30 mb-4 leading-relaxed">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="mb-6">
            <h4 className="font-semibold text-primary-0 mb-2">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1 text-primary-0 rounded-full text-sm font-medium border border-surface-30"
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
                className="flex items-center justify-center px-4 py-2 bg-primary-0 hover:bg-primary-20 text-surface-0 rounded-lg transition-all duration-normal font-medium"
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
                className="flex items-center justify-center px-4 py-2 border border-surface-30 text-primary-0 hover:border-primary-0 rounded-lg transition-all duration-normal font-medium"
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
