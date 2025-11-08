import { useState } from "react";
import { motion } from "framer-motion";
import {
  materials,
  materialCategories,
  type Material,
} from "../data/materials";
import { ExternalLink, Book, ArrowLeft, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const Materials = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredMaterials = materials.filter(
    (material) =>
      selectedCategory === "All" || material.category === selectedCategory
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen py-10 bg-surface-0">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/"
            className="inline-flex items-center text-primary-30 hover:text-primary-0 transition-colors duration-normal mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <Book className="h-8 w-8 text-primary-0" />
            <h1 className="text-3xl md:text-4xl font-bold text-primary-0">
              Study Materials
            </h1>
          </div>

          <p className="text-primary-30 text-lg max-w-2xl">
            Curated collection of study materials, guides, and resources for
            programming, databases, and career development.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-4 w-4 text-primary-30" />
            <span className="text-sm font-medium text-primary-30">
              Filter by category
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {materialCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-normal ${
                  selectedCategory === category
                    ? "bg-primary-0 text-surface-0"
                    : "border border-surface-30 text-primary-0 hover:border-primary-0"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Materials Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredMaterials.map((material) => (
            <MaterialCard key={material.id} material={material} />
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredMaterials.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Book className="h-12 w-12 text-primary-30 mx-auto mb-4" />
            <p className="text-primary-30 text-lg">
              No materials found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const MaterialCard = ({ material }: { material: Material }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5, scale: 1.02 }}
      className="h-full"
    >
      <div className="h-full border border-surface-30 hover:border-primary-40 hover:shadow-lg transition-all duration-normal rounded-lg bg-surface-0 p-6 flex flex-col">
        {/* Icon and Category */}
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 rounded-lg bg-surface-10">
            {material.icon && (
              <material.icon className="h-6 w-6 text-primary-0" />
            )}
          </div>
          <span className="px-3 py-1 text-xs border border-surface-30 text-primary-30 rounded-md">
            {material.category}
          </span>
        </div>

        {/* Title and Description */}
        <div className="flex-1 mb-4">
          <h3 className="text-xl font-semibold text-primary-0 mb-2">
            {material.title}
          </h3>
          <p className="text-sm text-primary-30 leading-relaxed">
            {material.description}
          </p>
        </div>

        {/* Tags */}
        {material.tags && (
          <div className="flex flex-wrap gap-1 mb-4">
            {material.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-surface-10 text-primary-40 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Button */}
        <a
          href={material.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full px-4 py-2 bg-primary-0 hover:bg-primary-20 text-surface-0 rounded-md transition-all duration-normal font-medium group"
        >
          <span>Open Material</span>
          <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-normal" />
        </a>
      </div>
    </motion.div>
  );
};

export default Materials;
