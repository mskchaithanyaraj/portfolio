import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experiences, type Experience } from "../data/experience";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Building2,
  ExternalLink,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";

const Experience = () => {
  const { theme } = useTheme();
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
    <section
      id="experience"
      className="relative overflow-hidden min-h-screen flex flex-col justify-center"
    >
      {/* Section Heading */}
      <motion.h2
        className="text-3xl font-extrabold text-foreground mb-8 flex items-center px-40 pt-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <span className="mr-3">Professional Experience</span>
        <span className="h-px flex-grow bg-gradient-to-r from-primary/50 to-transparent" />
      </motion.h2>

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-24 w-96 h-96 rounded-full opacity-10 bg-gradient-to-tr from-primary to-blue-500 blur-3xl" />
        <div className="absolute bottom-1/4 -right-24 w-96 h-96 rounded-full opacity-10 bg-gradient-to-br from-primary to-purple-500 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center relative z-10">
        <div className="flex items-start w-full">
          {/* Big Page Number */}
          <div className="w-[20%] flex justify-center items-start pt-10">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              exit={{ opacity: 0 }}
              className="text-[10vw] font-extrabold text-primary leading-none"
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
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <Button
                  key={pageNum}
                  variant={pageNum === currentPage ? "default" : "outline"}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 rounded-full ${
                    pageNum === currentPage
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }`}
                >
                  {pageNum}
                </Button>
              )
            )}
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

const ExperienceCard = ({ experience }: { experience: Experience }) => {
  const { theme } = useTheme();

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
    >
      <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Company Logo */}
            <div className="flex-shrink-0 flex items-start justify-center">
              <div className="w-20 h-20 rounded-lg bg-white p-2 shadow-md flex items-center justify-center">
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
                <h3 className="text-2xl font-bold text-foreground">
                  {experience.role}
                </h3>
                <a
                  href={experience.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary hover:underline group"
                >
                  Visit Website
                  <ExternalLink
                    size={16}
                    className="group-hover:scale-110 transition-transform"
                  />
                </a>
              </div>

              <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-foreground/80">
                <div className="flex items-center gap-2">
                  <Building2 size={18} className="text-primary" />
                  <span>{experience.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-primary" />
                  <span>{experience.period}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-primary" />
                  <span>{experience.location}</span>
                </div>
              </div>

              <p className="text-foreground/80 leading-relaxed">
                {experience.description}
              </p>

              <div className="pt-2">
                <h4 className="font-semibold mb-2">Key Responsibilities:</h4>
                <ul className="list-disc pl-5 space-y-1 text-foreground/80">
                  {experience.responsibilities.map((responsibility, index) => (
                    <li key={index}>{responsibility}</li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 pt-4">
                {experience.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    className={`${
                      theme === "dark"
                        ? "bg-primary/10 text-primary border-primary/20"
                        : "bg-primary/10 text-primary border-primary/20"
                    }`}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Experience;
