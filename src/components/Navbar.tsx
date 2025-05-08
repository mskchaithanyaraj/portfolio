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
  const [hoveredItem, setHoveredItem] = useState(null);

  const navItems = useMemo(
    () => [
      "About",
      "Skills",
      "Experience",
      "Projects",
      "Certifications",
      "Contact",
    ],
    []
  );
  const isHomePage = location.pathname === "/";

  // Set active item based on URL hash and scroll position
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && navItems.map((item) => item.toLowerCase()).includes(hash)) {
      setActiveItem(hash);
    } else if (isHomePage) {
      setActiveItem("about"); // Default to first item on home page
    } else {
      setActiveItem("");
    }

    // Handle scroll to set active section
    const handleScroll = () => {
      if (!isHomePage) return;

      const sections = navItems
        .map((item) => ({
          id: item.toLowerCase(),
          element: document.getElementById(item.toLowerCase()),
        }))
        .filter((section) => section.element);

      if (sections.length === 0) return;

      const scrollPosition = window.scrollY + 100;

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
    handleScroll(); // Initial check

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

  const handleNavItemClick = (item) => {
    setActiveItem(item.toLowerCase());
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 border-b border-border/40 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-xl sm:text-2xl font-bold relative group"
            >
              <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-transparent bg-clip-text">
                My Tech Realm
              </span>
              <motion.div
                className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-primary via-purple-500 to-pink-500"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-6">
              {isHomePage ? (
                <>
                  {navItems.map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="text-foreground px-3 py-1 text-sm font-medium relative group"
                      onMouseEnter={() => setHoveredItem(item)}
                      onMouseLeave={() => setHoveredItem(null)}
                      onClick={() => handleNavItemClick(item)}
                    >
                      {item}
                      <div className="absolute -bottom-1 left-0 w-full h-[2px] overflow-hidden">
                        <motion.div
                          className="h-full w-full bg-gradient-to-r from-primary via-purple-500 to-pink-500"
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
                            duration: 0.3,
                            ease: "easeInOut",
                          }}
                        />
                      </div>
                    </a>
                  ))}
                  <Link
                    to="/detailed-projects"
                    className="text-foreground px-3 py-2 text-sm font-medium relative group"
                    onMouseEnter={() => setHoveredItem("more-work")}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    More Work
                    <div className="absolute -bottom-1 left-0 w-full h-[2px] overflow-hidden">
                      <motion.div
                        className="h-full w-full bg-gradient-to-r from-primary via-purple-500 to-pink-500"
                        initial={{ x: "-100%" }}
                        animate={{
                          x: hoveredItem === "more-work" ? 0 : "-100%",
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                    </div>
                  </Link>
                </>
              ) : (
                <Link
                  to="/"
                  className="text-foreground px-3 py-2 text-sm font-medium relative group"
                  onMouseEnter={() => setHoveredItem("back")}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  Back to Home
                  <div className="absolute -bottom-1 left-0 w-full h-[2px] overflow-hidden">
                    <motion.div
                      className="h-full w-full bg-gradient-to-r from-primary via-purple-500 to-pink-500"
                      initial={{ x: "-100%" }}
                      animate={{
                        x: hoveredItem === "back" ? 0 : "-100%",
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                  </div>
                </Link>
              )}
            </div>
          </div>

          {/* Theme Toggle and Mobile Menu Button */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full hover:bg-foreground/10 dark:ring-1 dark:ring-purple-500/30"
              aria-label={
                theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
            >
              {theme === "light" ? (
                <MoonIcon className="h-[1.2rem] w-[1.2rem] text-primary" />
              ) : (
                <SunIcon className="h-[1.2rem] w-[1.2rem] text-purple-400" />
              )}
            </Button>
            <div className="md:hidden ml-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="z-50 relative rounded-full hover:bg-foreground/10 dark:ring-1 dark:ring-purple-500/30"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                {/* Hamburger menu icon */}
                <div className="flex flex-col justify-center items-center w-6 h-6">
                  <motion.span
                    className="block w-5 h-[2px] bg-gradient-to-r from-primary to-purple-500 rounded-full mb-[5px]"
                    animate={{
                      rotate: isOpen ? 45 : 0,
                      y: isOpen ? 7 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    className="block w-5 h-[2px] bg-gradient-to-r from-primary to-purple-500 rounded-full"
                    animate={{
                      opacity: isOpen ? 0 : 1,
                      width: isOpen ? 0 : 20,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    className="block w-5 h-[2px] bg-gradient-to-r from-primary to-purple-500 rounded-full mt-[5px]"
                    animate={{
                      rotate: isOpen ? -45 : 0,
                      y: isOpen ? -7 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu with theme-specific background */}
      <motion.div
        className={`fixed inset-0 z-40 md:hidden flex flex-col min-h-screen ${
          theme === "dark"
            ? "bg-black/95 text-white backdrop-blur-md"
            : "bg-white/95 text-black backdrop-blur-md"
        }`}
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
                    className="block px-3 py-2 text-2xl font-medium text-center relative"
                    onClick={() => handleNavItemClick(item)}
                  >
                    <span className="relative">
                      {item}
                      <motion.div
                        className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-primary via-purple-500 to-pink-500"
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
                  className="block px-3 py-2 text-2xl font-medium text-center relative"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="relative">
                    More Work
                    <motion.div
                      className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-primary via-purple-500 to-pink-500"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isOpen ? 1 : 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.2 + navItems.length * 0.05,
                      }}
                    />
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
                className="block px-3 py-2 text-2xl font-medium text-center relative"
                onClick={() => setIsOpen(false)}
              >
                <span className="relative">
                  Back to Home
                  <motion.div
                    className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-primary via-purple-500 to-pink-500"
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
