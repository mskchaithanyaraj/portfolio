import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experiences, type Experience } from "../data/experience";
import {
  Calendar,
  Building2,
  ExternalLink,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

const Experience = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = experiences.length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section id="experience" className="py-10 bg-surface-0">
      {/* Section Heading */}
      <motion.h2
        className="text-3xl font-extrabold text-primary-0 mb-8 px-6 lg:px-8 max-w-7xl mx-auto flex items-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="mr-3">Experience</span>
        <span className="h-px flex-grow bg-surface-30" />
      </motion.h2>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-start w-full gap-8">
          {/* Big Page Number */}
          <div className="w-[15%] flex justify-center items-start pt-10 max-md:hidden">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.05 }}
              exit={{ opacity: 0 }}
              className="text-[10vw] font-extrabold text-primary-0 leading-none"
            >
              {currentPage}
            </motion.div>
          </div>

          {/* Experience Content */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <ExperienceCard experience={experiences[currentPage - 1]} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-full border border-surface-30 text-primary-0 hover:border-primary-0 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-normal"
            >
              <ChevronLeft className="h-4 w-4 mx-auto" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 rounded-full transition-all duration-normal ${
                    pageNum === currentPage
                      ? "bg-primary-0 text-surface-0"
                      : "border border-surface-30 text-primary-0 hover:border-primary-0"
                  }`}
                >
                  {pageNum}
                </button>
              )
            )}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-full border border-surface-30 text-primary-0 hover:border-primary-0 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-normal"
            >
              <ChevronRight className="h-4 w-4 mx-auto" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const ExperienceCard = ({ experience }: { experience: Experience }) => {
  const [expanded, setExpanded] = useState(false);
  const maxVisible = 2;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
    >
      <div className="overflow-hidden border border-surface-30 rounded-lg hover:border-primary-40 transition-all duration-normal bg-surface-0">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Company Logo */}
            <div className="flex-shrink-0 flex items-start justify-center">
              <div className="w-20 h-20 rounded-lg bg-surface-0 border border-surface-30 p-2 flex items-center justify-center">
                <img
                  src={experience.logo}
                  alt={`${experience.company} Logo`}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "assets/logos/placeholder-logo.png";
                  }}
                />
              </div>
            </div>

            {/* Experience Details */}
            <div className="flex-grow space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <h3 className="text-2xl font-bold text-primary-0">
                  {experience.role}
                </h3>
                <a
                  href={experience.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary-0 hover:opacity-80 group transition-opacity duration-fast"
                >
                  Visit Website
                  <ExternalLink
                    size={16}
                    className="group-hover:scale-110 transition-transform duration-fast"
                  />
                </a>
              </div>

              <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-primary-30">
                <div className="flex items-center gap-2">
                  <Building2 size={18} className="text-primary-0" />
                  <span>{experience.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-primary-0" />
                  <span>{experience.period}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-primary-0" />
                  <span>{experience.location}</span>
                </div>
              </div>

              <p className="text-primary-30 leading-relaxed">
                {experience.description}
              </p>

              <div className="pt-2">
                <h4 className="font-semibold text-primary-0 mb-2">
                  Key Responsibilities:
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-primary-30">
                  {(expanded
                    ? experience.responsibilities
                    : experience.responsibilities.slice(0, maxVisible)
                  ).map((responsibility, index) => (
                    <li key={index}>{responsibility}</li>
                  ))}
                </ul>
                {experience.responsibilities.length > maxVisible && (
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="group mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium bg-primary-0 text-surface-0 hover:bg-primary-20 transition-all duration-normal"
                  >
                    {expanded ? "View less" : "View more"}
                    <motion.span
                      initial={false}
                      animate={{ rotate: expanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                    </motion.span>
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2 pt-4">
                {experience.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm border border-surface-30 text-primary-0 rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Experience;
