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
          <div className="hidden lg:block">
            <div className="flex items-center space-x-4">
              {isHomePage ? (
                <>
                  {navItems.map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="text-primary-30 px-3 py-1 text-sm font-medium relative group transition-colors duration-normal hover:text-primary-0"
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

                  {/* Work Button with Simpler Split Animation */}
                  <div className="flex items-center ml-4 border-l border-surface-20 pl-4">
                    <div
                      className="relative flex items-center"
                      onMouseEnter={() => setIsWorkHovered(true)}
                      onMouseLeave={() => setIsWorkHovered(false)}
                    >
                      {/* Single Work Button */}
                      <motion.div
                        className="px-3 py-1.5 text-xs font-medium border border-surface-30 rounded-md bg-transparent cursor-pointer transition-all duration-normal hover:border-primary-0"
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

                      {/* Split Buttons */}
                      <motion.div
                        className="absolute left-0 flex items-center space-x-2"
                        animate={{
                          opacity: isWorkHovered ? 1 : 0,
                          x: isWorkHovered ? 0 : 20,
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
                          className="px-3 py-1.5 text-xs font-medium border border-surface-30 rounded-md hover:border-primary-0 transition-all duration-normal whitespace-nowrap"
                          onMouseEnter={() => setHoveredItem("more-work")}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          <span className="flex items-center text-primary-0">
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
                          className="px-3 py-1.5 text-xs font-medium border border-info-0 text-info-0 rounded-md hover:border-info-10 transition-all duration-normal whitespace-nowrap"
                          onMouseEnter={() => setHoveredItem("hobby-projects")}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          <span className="flex items-center">
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

            <div className="lg:hidden">
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

      {/* Mobile Menu */}
      <motion.div
        className="fixed inset-0 z-40 lg:hidden flex flex-col min-h-screen bg-surface-0"
        initial={{ opacity: 0, y: "-100%" }}
        animate={{
          opacity: isOpen ? 1 : 0,
          y: isOpen ? 0 : "-100%",
        }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      >
        <div className="flex-1 flex flex-col items-center justify-center px-2 pt-1 pb-3 space-y-8">
          {isHomePage ? (
            <>
              {navItems.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: isOpen ? 1 : 0,
                    y: isOpen ? 0 : 20,
                  }}
                  transition={{
                    delay: 0.1 + index * 0.05,
                    duration: 0.3,
                  }}
                >
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="block px-3 py-2 text-2xl font-medium text-center relative text-primary-0"
                    onClick={() => handleNavItemClick(item)}
                  >
                    <span className="relative">
                      {item}
                      <motion.div
                        className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary-0"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isOpen ? 1 : 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.2 + index * 0.05,
                        }}
                      />
                    </span>
                  </a>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isOpen ? 1 : 0,
                  y: isOpen ? 0 : 20,
                }}
                transition={{
                  delay: 0.1 + navItems.length * 0.05,
                  duration: 0.3,
                }}
              >
                <Link
                  to="/detailed-projects"
                  className="inline-block px-6 py-3 mt-6 text-xl font-medium border border-surface-30 rounded-lg hover:border-primary-0 transition-all duration-normal text-primary-0"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="flex items-center justify-center">
                    More Work
                    <span className="ml-2">→</span>
                  </span>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isOpen ? 1 : 0,
                  y: isOpen ? 0 : 20,
                }}
                transition={{
                  delay: 0.15 + navItems.length * 0.05,
                  duration: 0.3,
                }}
              >
                <Link
                  to="/hobby-projects"
                  className="inline-block px-6 py-3 mt-2 text-xl font-medium border border-info-0 text-info-0 rounded-lg hover:border-info-10 transition-all duration-normal"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="flex items-center justify-center">
                    Hobby Projects
                    <span className="ml-2">→</span>
                  </span>
                </Link>
              </motion.div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isOpen ? 1 : 0,
                y: isOpen ? 0 : 20,
              }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <Link
                to="/"
                className="block px-3 py-2 text-2xl font-medium text-center relative text-primary-0"
                onClick={() => setIsOpen(false)}
              >
                <span className="relative">
                  Back to Home
                  <motion.div
                    className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary-0"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  />
                </span>
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
