import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { certifications, type Certification } from "../data/certifications";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const ITEMS_PER_PAGE = 4;

const Certifications = () => {
  const categories = [
    "Intercollege Competitions",
    "NPTEL",
    "Course Completions",
    "Podcasts",
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[2]);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { theme } = useTheme();

  // Helper function to parse date strings
  const parseDate = (dateString: string | undefined): Date => {
    return dateString ? new Date(dateString) : new Date(0);
  };

  // Sort certifications by date in descending order
  const sortedCertifications = (category: string) => {
    return certifications
      .filter((cert) => cert.category === category)
      .sort(
        (a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime()
      );
  };

  const filteredCertifications = sortedCertifications(selectedCategory);
  const totalPages = Math.ceil(filteredCertifications.length / ITEMS_PER_PAGE);
  const paginatedCertifications = filteredCertifications.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when changing category
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="certifications" className="py-10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-10 bg-gradient-to-br from-primary to-purple-500 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full opacity-10 bg-gradient-to-tr from-primary to-blue-500 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          className="text-3xl font-extrabold text-foreground mb-8 flex items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="mr-3">Certifications</span>
          <span className="h-px flex-grow bg-gradient-to-r from-primary/50 to-transparent" />
        </motion.h2>

        {/* Category Selection */}
        <div className="flex justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => handleCategoryChange(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Certifications Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${currentPage}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedCertifications.map((cert) => (
                <motion.div
                  key={cert.id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="h-full"
                >
                  <Card className="h-full overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/80 backdrop-blur-sm">
                    <CardContent className="p-0 flex flex-col h-full">
                      <div
                        className="h-48 w-full overflow-hidden cursor-pointer relative group"
                        onClick={() => setSelectedCert(cert)}
                      >
                        <img
                          src={cert.imageUrl || "placeholder.png"}
                          alt={cert.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <Maximize2 className="text-white h-8 w-8" />
                        </div>
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <h4 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                          {cert.name}
                        </h4>
                        {cert.issuer && (
                          <p className="text-sm text-muted-foreground mb-1">
                            Issuer: {cert.issuer}
                          </p>
                        )}
                        {cert.date && (
                          <p className="text-sm text-muted-foreground">
                            Date: {cert.date}
                          </p>
                        )}
                        <div className="mt-auto pt-2">
                          <Badge
                            variant="outline"
                            className="bg-primary/10 text-primary border-primary/20"
                          >
                            {cert.category}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
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
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modal for viewing certificate */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh] w-full bg-background rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10 bg-black/50 text-white hover:bg-black/70 rounded-full"
                onClick={() => setSelectedCert(null)}
              >
                <X className="h-5 w-5" />
              </Button>

              <div className="p-4 bg-black/50 backdrop-blur-sm absolute top-0 left-0 right-0 text-white">
                <h3 className="font-medium">{selectedCert.name}</h3>
                {selectedCert.issuer && (
                  <p className="text-sm opacity-80">
                    Issuer: {selectedCert.issuer}
                  </p>
                )}
              </div>

              <img
                src={selectedCert.imageUrl || "placeholder.png"}
                alt={selectedCert.name}
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;
