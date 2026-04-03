import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

interface PromotionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PromotionModal = ({ isOpen, onClose }: PromotionModalProps) => {
  const [mounted, setMounted] = useState(false);
  const [showFullModal, setShowFullModal] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleVisitApp = () => {
    window.open("https://stride365.vercel.app/", "_blank");
    handleCloseFullModal();
  };

  const handleYes = () => {
    setShowFullModal(true);
  };

  const handleCloseFullModal = () => {
    setShowFullModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleCloseToast = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Full Modal with Blurred Background - only when showFullModal is true */}
          {showFullModal && (
            <>
              {/* Blurred Background */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={handleCloseFullModal}
                className="fixed inset-0 bg-black/40 backdrop-blur-md z-40"
              />

              {/* Blur effect for navbar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 left-0 right-0 h-20 backdrop-blur-md z-[41] pointer-events-none"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="fixed inset-0 flex items-center justify-center z-50 p-4"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Detailed Project Modal */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-surface-0 dark:bg-surface-900 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-primary-0/10 dark:border-primary-900/10"
                >
                  {/* Cover Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src="/assets/banners/stride-banner.png"
                      alt="Stride365"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Header with close button */}
                  <div className="relative px-8 py-6 bg-gradient-to-r from-primary-0/5 to-primary-500/5 dark:from-primary-900/10 dark:to-primary-600/10 border-b border-primary-0/10 dark:border-primary-900/10 flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-primary-0 dark:text-primary-300">
                        Stride365
                      </h2>
                      <p className="text-sm text-primary-500/70 dark:text-primary-400/70 mt-1">
                        My hobby project • Productivity app
                      </p>
                    </div>
                    <button
                      onClick={handleCloseFullModal}
                      className="p-2 hover:bg-primary-0/10 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                      aria-label="Close modal"
                    >
                      <X
                        size={20}
                        className="text-primary-500 dark:text-primary-400"
                      />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="px-8 py-6 space-y-4">
                    {/* Description */}
                    <p className="text-primary-600 dark:text-primary-300 text-sm leading-relaxed">
                      A modern, minimalistic to-do tracker with smart progress
                      tracking, subtask management, and celebration animations.
                    </p>

                    {/* Features */}
                    <div className="space-y-2 pt-2">
                      <div className="flex items-start gap-3">
                        <Download
                          size={16}
                          className="text-primary-500 dark:text-primary-400 mt-0.5 flex-shrink-0"
                        />
                        <span className="text-sm text-primary-600 dark:text-primary-300">
                          <strong>Downloadable PWA</strong> — Install as a
                          native app on any device
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg
                          className="w-4 h-4 text-primary-500 dark:text-primary-400 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm text-primary-600 dark:text-primary-300">
                          Grayscale UI with light/dark themes
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg
                          className="w-4 h-4 text-primary-500 dark:text-primary-400 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm text-primary-600 dark:text-primary-300">
                          Subtask management with progress tracking
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg
                          className="w-4 h-4 text-primary-500 dark:text-primary-400 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm text-primary-600 dark:text-primary-300">
                          Celebration animations for motivation
                        </span>
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={handleVisitApp}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 group active:scale-95 shadow-md"
                      >
                        Visit App
                        <ExternalLink
                          size={16}
                          className="group-hover:translate-x-0.5 transition-transform"
                        />
                      </button>
                      <button
                        onClick={handleCloseFullModal}
                        className="flex-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 active:scale-95"
                      >
                        Maybe Later
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}

          {/* Toast Notification at Bottom Right - shows when not in full modal */}
          {!showFullModal && (
            <motion.div
              initial={{ opacity: 0, x: 400 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 400 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="fixed bottom-6 right-6 z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-surface-0 dark:bg-surface-900 rounded-xl shadow-2xl border border-primary-0/10 dark:border-primary-900/10 p-5 max-w-xs">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-primary-0 dark:text-primary-300 mb-1">
                      Check out Stride365
                    </h3>
                    <p className="text-sm text-primary-600 dark:text-primary-300">
                      My latest hobby project - a beautiful todo app
                    </p>
                  </div>
                  <button
                    onClick={handleCloseToast}
                    className="p-1 hover:bg-primary-0/10 dark:hover:bg-primary-900/20 rounded-lg transition-colors flex-shrink-0"
                    aria-label="Close"
                  >
                    <X
                      size={18}
                      className="text-primary-500 dark:text-primary-400"
                    />
                  </button>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={handleYes}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors duration-200 active:scale-95 shadow-md text-sm"
                  >
                    Yes, show me
                  </button>
                  <button
                    onClick={handleCloseToast}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-2 px-3 rounded-lg transition-colors duration-200 active:scale-95 text-sm"
                  >
                    Maybe later
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default PromotionModal;
