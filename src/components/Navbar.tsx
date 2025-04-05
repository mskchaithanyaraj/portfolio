"use client";

import { useState, useEffect } from "react";
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

  const navItems = ["About", "Skills", "Projects", "Certifications", "Contact"];
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
        if (section.element.offsetTop <= scrollPosition) {
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
    <nav className="sticky top-0 z-50 bg-background border-b backdrop-blur-sm bg-opacity-80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-1">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl sm:text-md font-bold text-foreground relative group"
            >
              <span className="relative z-10">My Tech Realm</span>
              <motion.div
                className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-purple-500 via-blue-400 to-cyan-300"
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
                      className="text-foreground px-3 py-[0.5] text-md font-medium relative group"
                      onMouseEnter={() => setHoveredItem(item)}
                      onMouseLeave={() => setHoveredItem(null)}
                      onClick={() => handleNavItemClick(item)}
                    >
                      {item}
                      <div className="absolute -bottom-1 left-0 w-full h-[2px] overflow-hidden">
                        <motion.div
                          className="h-full w-full bg-gradient-to-r from-purple-500 via-blue-400 to-cyan-300"
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
                        className="h-full w-full bg-gradient-to-r from-purple-500 via-blue-400 to-cyan-300"
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
                  className="text-foreground pr-[7.5rem] py-2 text-md font-medium relative group"
                  onMouseEnter={() => setHoveredItem("back")}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  Back to Home
                  <div className="absolute -bottom-1 left-0 w-52 h-[2px] overflow-hidden">
                    <motion.div
                      className="h-full w-full bg-gradient-to-r from-purple-500 via-blue-400 to-cyan-300"
                      initial={{ x: "-50%" }}
                      animate={{
                        x: hoveredItem === "back" ? "-50%" : "-100%",
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
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "light" ? (
                <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <SunIcon className="h-[1.2rem] w-[1.2rem]" />
              )}
            </Button>
            <div className="md:hidden ml-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="z-50 relative"
              >
                <span className="sr-only">Open main menu</span>
                {/* Fixed hamburger menu icon */}
                <div className="flex flex-col justify-center items-center w-6 h-6">
                  <motion.span
                    className="block w-5 h-[2px] bg-foreground rounded-full mb-[5px]"
                    animate={{
                      rotate: isOpen ? 45 : 0,
                      y: isOpen ? 7 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    className="block w-5 h-[2px] bg-foreground rounded-full"
                    animate={{
                      opacity: isOpen ? 0 : 1,
                      width: isOpen ? 0 : 20,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    className="block w-5 h-[2px] bg-foreground rounded-full mt-[5px]"
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
          theme === "dark" ? "bg-black/95 text-white" : "bg-white/95 text-black"
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
        <div className="flex-1 flex flex-col items-center justify-center px-2 pt-16 pb-3 space-y-8">
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
                        className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 via-blue-400 to-cyan-300"
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
                    Timeline
                    <motion.div
                      className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 via-blue-400 to-cyan-300"
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
                    className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 via-blue-400 to-cyan-300"
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
