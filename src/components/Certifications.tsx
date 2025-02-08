import { useState } from "react";
import { motion } from "framer-motion";
import { certifications, Certification } from "../data/certifications";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Certifications = () => {
  const categories = [
    "Intercollege Competitions",
    "NPTEL",
    "Course Completions",
    "Podcasts",
  ];

  return (
    <section id="certifications" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-foreground mb-8">
          Certifications
        </h2>
        <div className="flex flex-wrap ">
          {categories.map((category) => (
            <div key={category} className="mb-12">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center">
                {certifications
                  .filter((cert) => cert.category === category)
                  .map((cert) => (
                    <CertificationCard key={cert.id} certification={cert} />
                  ))}
              </div>
            </div>
          ))}
        </div>
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
      >
        <Card>
          <CardContent className="p-0">
            <img
              src={certification.imageUrl || "/placeholder.png"}
              alt={certification.name}
              className="w-full h-48 object-cover rounded-t-lg cursor-pointer"
            />
            <div className="p-4">
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
              <Badge className="mt-2">{certification.category}</Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={() => setIsOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.img
            src={certification.imageUrl || "/placeholder.png"}
            alt={certification.name}
            className="max-w-full max-h-full rounded-lg cursor-pointer"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          />
        </motion.div>
      )}
    </>
  );
};

export default Certifications;
