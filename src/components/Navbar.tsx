import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isWorkHovered, setIsWorkHovered] = useState(false);

  const navItems = useMemo(
    () => ["About", "Experience", "Projects", "Certifications", "Contact"],
    []
  );
  const isHomePage = location.pathname === "/";

  // Set active item based on URL hash and scroll position
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && navItems.map((item) => item.toLowerCase()).includes(hash)) {
      setActiveItem(hash);
    } else if (isHomePage) {
      setActiveItem("about");
    } else {
      setActiveItem("");
    }

    const handleScroll = () => {
      if (!isHomePage) return;

      const sections = navItems
        .map((item) => ({
          id: item.toLowerCase(),
          element: document.getElementById(item.toLowerCase()),
        }))
        .filter((section) => section.element);

      if (sections.length === 0) return;

      const scrollPosition = window.scrollY + 80;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const el = section.element;
        if (el && el.offsetTop <= scrollPosition) {
          setActiveItem(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location, isHomePage, navItems]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavItemClick = (item: string) => {
    setActiveItem(item.toLowerCase());
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-surface-0 border-b border-surface-20 transition-normal">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center group focus:outline-none"
              aria-label="Home"
            >
              <span
                className="block rounded-full border border-surface-30 overflow-hidden bg-surface-0 transition-all duration-normal group-hover:border-primary-0"
                style={{
                  width: "2.25rem",
                  height: "2.25rem",
                  minWidth: "2.25rem",
                  minHeight: "2.25rem",
                }}
              >
                <img
                  src="/assets/profile.jpg"
                  alt="Chaithanyaraj Logo"
                  className="w-full h-full object-cover rounded-full"
                  style={{ display: "block" }}
                />
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-2 lg:space-x-4">
              {isHomePage ? (
                <>
                  {navItems.map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="text-primary-30 px-2 lg:px-3 py-1 text-xs lg:text-sm font-medium relative group transition-colors duration-normal hover:text-primary-0"
                      onMouseEnter={() => setHoveredItem(item)}
                      onMouseLeave={() => setHoveredItem(null)}
                      onClick={() => handleNavItemClick(item)}
                    >
                      {item}
                      <div className="absolute -bottom-1 left-0 w-full h-[1px] overflow-hidden">
                        <motion.div
                          className="h-full w-full bg-primary-0"
                          initial={{ x: "-100%" }}
                          animate={{
                            x:
                              activeItem === item.toLowerCase()
                                ? 0
                                : hoveredItem === item
                                ? 0
                                : "-100%",
                          }}
                          transition={{
                            duration: 0.25,
                            ease: "easeInOut",
                          }}
                        />
                      </div>
                    </a>
                  ))}

                  {/* Work Button with Responsive Split Animation */}
                  <div className="flex items-center ml-2 lg:ml-4 border-l border-surface-20 pl-2 lg:pl-4">
                    <div
                      className="relative flex items-center"
                      onMouseEnter={() => setIsWorkHovered(true)}
                      onMouseLeave={() => setIsWorkHovered(false)}
                    >
                      {/* Single Work Button */}
                      <motion.div
                        className="px-2 lg:px-3 py-1.5 text-xs font-medium border border-surface-30 rounded-md bg-transparent cursor-pointer transition-all duration-normal hover:border-primary-0"
                        animate={{
                          opacity: isWorkHovered ? 0 : 1,
                          x: isWorkHovered ? -20 : 0,
                          scale: isWorkHovered ? 0.9 : 1,
                        }}
                        transition={{ duration: 0.2 }}
                        style={{
                          pointerEvents: isWorkHovered ? "none" : "auto",
                        }}
                      >
                        <span className="flex items-center text-primary-0">
                          Work
                        </span>
                      </motion.div>

                      {/* Split Buttons - Stack vertically on md, horizontal on lg */}
                      <motion.div
                        className="absolute left-0 top-0 flex flex-col lg:flex-row items-start lg:items-center space-y-1 lg:space-y-0 lg:space-x-2 bg-surface-0 lg:bg-transparent p-2 lg:p-0 rounded-lg lg:rounded-none border lg:border-0 border-surface-30 shadow-lg lg:shadow-none min-w-[140px] lg:min-w-0"
                        animate={{
                          opacity: isWorkHovered ? 1 : 0,
                          x: isWorkHovered ? 0 : 20,
                          y: isWorkHovered ? 0 : -10,
                        }}
                        transition={{
                          duration: 0.2,
                          delay: isWorkHovered ? 0.1 : 0,
                        }}
                        style={{
                          pointerEvents: isWorkHovered ? "auto" : "none",
                        }}
                      >
                        <Link
                          to="/detailed-projects"
                          className="px-2 lg:px-3 py-1.5 text-xs font-medium border border-surface-30 rounded-md hover:border-primary-0 transition-all duration-normal whitespace-nowrap w-full lg:w-auto text-center"
                          onMouseEnter={() => setHoveredItem("more-work")}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          <span className="flex items-center justify-center text-primary-0">
                            More Work
                            <motion.span
                              className="ml-1 inline-block text-xs"
                              animate={{
                                x: hoveredItem === "more-work" ? 2 : 0,
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              →
                            </motion.span>
                          </span>
                        </Link>

                        <Link
                          to="/hobby-projects"
                          className="px-2 lg:px-3 py-1.5 text-xs font-medium border border-info-0 text-info-0 rounded-md hover:border-info-10 transition-all duration-normal whitespace-nowrap w-full lg:w-auto text-center"
                          onMouseEnter={() => setHoveredItem("hobby-projects")}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          <span className="flex items-center justify-center">
                            Hobby
                            <motion.span
                              className="ml-1 inline-block text-xs"
                              animate={{
                                x: hoveredItem === "hobby-projects" ? 2 : 0,
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              →
                            </motion.span>
                          </span>
                        </Link>

                        <Link
                          to="/materials"
                          className="px-2 lg:px-3 py-1.5 text-xs font-medium border border-warning-0 text-warning-0 rounded-md hover:border-warning-10 transition-all duration-normal whitespace-nowrap w-full lg:w-auto text-center"
                          onMouseEnter={() => setHoveredItem("materials")}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          <span className="flex items-center justify-center">
                            Materials
                            <motion.span
                              className="ml-1 inline-block text-xs"
                              animate={{
                                x: hoveredItem === "materials" ? 2 : 0,
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              →
                            </motion.span>
                          </span>
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  to="/"
                  className="text-primary-0 px-3 py-2 text-sm font-medium relative group"
                  onMouseEnter={() => setHoveredItem("back")}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  Back to Home
                  <div className="absolute bottom-0 left-0 w-[95%] h-[1px] overflow-hidden">
                    <motion.div
                      className="h-full w-full bg-primary-0"
                      initial={{ x: "-100%" }}
                      animate={{
                        x: hoveredItem === "back" ? 0 : "-100%",
                      }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    />
                  </div>
                </Link>
              )}
            </div>
          </div>

          {/* Theme Toggle and Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="rounded-full hover:bg-surface-10 w-8 h-8 p-0 transition-all duration-normal"
              aria-label={
                theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
            >
              {theme === "light" ? (
                <MoonIcon className="h-4 w-4 text-primary-0" />
              ) : (
                <SunIcon className="h-4 w-4 text-primary-0" />
              )}
            </Button>

            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="z-50 relative rounded-full hover:bg-surface-10 w-8 h-8 p-0 transition-all duration-normal"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                <div className="flex flex-col justify-center items-center w-5 h-5">
                  <motion.span
                    className="block w-4 h-[2px] bg-primary-0 rounded-full mb-1"
                    animate={{
                      rotate: isOpen ? 45 : 0,
                      y: isOpen ? 6 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    className="block w-4 h-[2px] bg-primary-0 rounded-full"
                    animate={{
                      opacity: isOpen ? 0 : 1,
                      width: isOpen ? 0 : 16,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    className="block w-4 h-[2px] bg-primary-0 rounded-full mt-1"
                    animate={{
                      rotate: isOpen ? -45 : 0,
                      y: isOpen ? -6 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Redesigned */}
      <motion.div
        className="fixed inset-0 z-40 md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      >
        {/* Blurred Background - 20% */}
        <motion.div
          className="absolute inset-0 bg-surface-0/60 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsOpen(false)}
        />

        {/* Slide-in Container - 80% */}
        <motion.div
          className="absolute top-0 right-0 h-full w-[80%] bg-surface-0 shadow-2xl border-l border-surface-20"
          initial={{ x: "100%" }}
          animate={{ x: isOpen ? 0 : "100%" }}
          transition={{
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-surface-20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-surface-30 overflow-hidden">
                <img
                  src="/assets/profile.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-lg font-semibold text-primary-0">Menu</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-surface-10 transition-colors duration-200"
            >
              <svg
                className="w-5 h-5 text-primary-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Content */}
          <div className="flex flex-col h-[calc(100%-80px)] overflow-y-auto">
            {isHomePage ? (
              <>
                {/* Main Navigation */}
                <div className="px-6 py-8 space-y-1">
                  <h3 className="text-xs font-medium text-primary-40 uppercase tracking-wider mb-4">
                    Navigation
                  </h3>
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="flex items-center px-4 py-3 text-base font-medium text-primary-0 rounded-lg hover:bg-surface-10 transition-all duration-200 group"
                      onClick={() => handleNavItemClick(item)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{
                        opacity: isOpen ? 1 : 0,
                        x: isOpen ? 0 : 20,
                      }}
                      transition={{
                        delay: index * 0.1,
                        duration: 0.3,
                      }}
                    >
                      <span className="flex-1">{item}</span>
                      <svg
                        className="w-4 h-4 text-primary-30 group-hover:text-primary-0 group-hover:translate-x-1 transition-all duration-200"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </motion.a>
                  ))}
                </div>

                {/* Work Section */}
                <div className="px-6 py-4 border-t border-surface-20">
                  <h3 className="text-xs font-medium text-primary-40 uppercase tracking-wider mb-4">
                    Work
                  </h3>
                  <div className="space-y-2">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{
                        opacity: isOpen ? 1 : 0,
                        x: isOpen ? 0 : 20,
                      }}
                      transition={{
                        delay: (navItems.length + 1) * 0.1,
                        duration: 0.3,
                      }}
                    >
                      <Link
                        to="/detailed-projects"
                        className="flex items-center px-4 py-3 text-sm font-medium text-primary-0 rounded-lg border border-surface-30 hover:border-primary-0 hover:bg-surface-10 transition-all duration-200 group"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="flex-1">More Work</span>
                        <svg
                          className="w-4 h-4 text-primary-30 group-hover:text-primary-0 group-hover:translate-x-1 transition-all duration-200"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </Link>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{
                        opacity: isOpen ? 1 : 0,
                        x: isOpen ? 0 : 20,
                      }}
                      transition={{
                        delay: (navItems.length + 2) * 0.1,
                        duration: 0.3,
                      }}
                    >
                      <Link
                        to="/hobby-projects"
                        className="flex items-center px-4 py-3 text-sm font-medium text-info-0 rounded-lg border border-info-0 hover:border-info-10 hover:bg-info-0/5 transition-all duration-200 group"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="flex-1">Hobby Projects</span>
                        <svg
                          className="w-4 h-4 text-info-0 group-hover:translate-x-1 transition-all duration-200"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </Link>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{
                        opacity: isOpen ? 1 : 0,
                        x: isOpen ? 0 : 20,
                      }}
                      transition={{
                        delay: (navItems.length + 3) * 0.1,
                        duration: 0.3,
                      }}
                    >
                      <Link
                        to="/materials"
                        className="flex items-center px-4 py-3 text-sm font-medium text-warning-0 rounded-lg border border-warning-0 hover:border-warning-10 hover:bg-warning-0/5 transition-all duration-200 group"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="flex-1">Study Materials</span>
                        <svg
                          className="w-4 h-4 text-warning-0 group-hover:translate-x-1 transition-all duration-200"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </>
            ) : (
              <div className="px-6 py-8">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{
                    opacity: isOpen ? 1 : 0,
                    x: isOpen ? 0 : 20,
                  }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <Link
                    to="/"
                    className="flex items-center px-4 py-3 text-base font-medium text-primary-0 rounded-lg hover:bg-surface-10 transition-all duration-200 group"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg
                      className="w-5 h-5 text-primary-30 mr-3 group-hover:text-primary-0 group-hover:-translate-x-1 transition-all duration-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    <span className="flex-1">Back to Home</span>
                  </Link>
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
