import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { certifications, type Certification } from "../data/certifications";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";

const useResponsiveItemsPerPage = () => {
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const updateItems = () => {
      const width = window.innerWidth;
      if (width < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(4);
      }
    };

    updateItems();
    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, []);

  return itemsPerPage;
};

type Category = Certification["category"];

const Certifications = () => {
  const categories: Category[] = [
    "Intercollege Competitions",
    "NPTEL",
    "Course Completions",
    "Podcasts",
    "Workshops",
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[2]);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

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

  const itemsPerPage = useResponsiveItemsPerPage();
  const filteredCertifications = sortedCertifications(selectedCategory);
  const totalPages = Math.ceil(filteredCertifications.length / itemsPerPage);
  const paginatedCertifications = filteredCertifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category as Category);
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl font-extrabold text-primary-0 mb-8 flex items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="mr-3">Certifications</span>
          <span className="h-px flex-grow bg-surface-30" />
        </motion.h2>

        {/* Category Selection */}
        <div className="mb-8">
          {/* Mobile Category Selector */}
          <div className="block md:hidden px-4 py-3 bg-surface-0 rounded-lg border border-surface-30 mb-6">
            <label className="block text-sm font-medium text-primary-30 mb-2">
              Browse Certifications By
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full bg-surface-0 border border-surface-30 rounded-md px-3 py-2 text-primary-0 focus:border-primary-0 transition-all duration-normal"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-normal ${
                  selectedCategory === category
                    ? "bg-primary-0 text-surface-0"
                    : "border border-surface-30 text-primary-0 hover:border-primary-0"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
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
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="h-full"
                >
                  <div className="h-full overflow-hidden border border-surface-30 hover:border-primary-40 hover:shadow-lg transition-all duration-normal rounded-lg bg-surface-0">
                    <div className="p-0 flex flex-col h-full">
                      <div
                        className="h-48 w-full overflow-hidden cursor-pointer relative group"
                        onClick={() => setSelectedCert(cert)}
                      >
                        <img
                          src={cert.imageUrl || "placeholder.png"}
                          alt={cert.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all duration-normal flex items-center justify-center">
                          <Maximize2 className="text-white h-10 w-10 drop-shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-normal scale-75 group-hover:scale-100" />
                        </div>
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <h4 className="text-lg font-semibold text-primary-0 mb-2 line-clamp-2">
                          {cert.name}
                        </h4>
                        {cert.issuer && (
                          <p className="text-sm text-primary-30 mb-1">
                            Issuer: {cert.issuer}
                          </p>
                        )}
                        {cert.date && (
                          <p className="text-sm text-primary-30">
                            Date: {cert.date}
                          </p>
                        )}
                        <div className="mt-auto pt-2">
                          <span className="inline-block px-3 py-1 text-sm border border-surface-30 text-primary-0 rounded-md">
                            {cert.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-full border border-surface-30 text-primary-0 hover:border-primary-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-normal flex items-center justify-center"
                >
                  <ChevronLeft className="h-4 w-4" />
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
                  className="w-10 h-10 rounded-full border border-surface-30 text-primary-0 hover:border-primary-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-normal flex items-center justify-center"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modal for viewing certificate */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh] w-full bg-surface-0 rounded-lg overflow-hidden border border-surface-30 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <button
                className="absolute top-2 right-2 z-10 bg-black/60 text-white hover:bg-black/80 rounded-full p-2 transition-all duration-normal shadow-md backdrop-blur-sm"
                onClick={() => setSelectedCert(null)}
              >
                <X className="h-5 w-5" />
              </button>

              <div className="p-4 bg-black/60 absolute top-0 left-0 right-0 text-white border-b border-white/10 backdrop-blur-sm">
                <h3 className="font-medium text-lg text-white drop-shadow-sm">
                  {selectedCert.name}
                </h3>
                {selectedCert.issuer && (
                  <p className="text-sm text-white/80 drop-shadow-sm">
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
