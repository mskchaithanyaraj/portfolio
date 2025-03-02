"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { certifications, type Certification } from "../data/certifications";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Certifications = () => {
  const categories = [
    "Intercollege Competitions",
    "NPTEL",
    "Course Completions",
    "Podcasts",
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <section id="certifications" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-foreground mb-8">
          Certifications
        </h2>

        {/* Category Selection */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="mb-2"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Certifications Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {selectedCategory}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {certifications
                .filter((cert) => cert.category === selectedCategory)
                .map((cert) => (
                  <CertificationCard key={cert.id} certification={cert} />
                ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

const CertificationCard = ({
  certification,
}: {
  certification: Certification;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        layout
        className="h-[360px] w-full" // Fixed height for all cards
      >
        <Card className="h-full flex flex-col">
          <CardContent className="p-0 flex-1 flex flex-col h-full">
            <div className="h-48 w-full overflow-hidden">
              <img
                src={
                  certification.imageUrl ||
                  "/placeholder.svg?height=192&width=384"
                }
                alt={certification.name}
                className="w-full h-full object-cover rounded-t-lg cursor-pointer"
              />
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h4 className="text-lg font-semibold text-foreground mb-2">
                {certification.name}
              </h4>
              {certification.issuer && (
                <p className="text-sm text-muted-foreground mb-1">
                  Issuer: {certification.issuer}
                </p>
              )}
              {certification.date && (
                <p className="text-sm text-muted-foreground">
                  Date: {certification.date}
                </p>
              )}
              <div className="mt-auto pt-2">
                <Badge>{certification.category}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
          onClick={() => setIsOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative max-w-4xl max-h-[90vh] w-full bg-background rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <img
              src={
                certification.imageUrl ||
                "/placeholder.svg?height=600&width=800"
              }
              alt={certification.name}
              className="w-full h-full object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Certifications;
