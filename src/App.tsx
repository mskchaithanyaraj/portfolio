import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import About from "./components/About";
import SkillSet from "./components/SkillSet";
import Certifications from "./components/Certifications";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import DetailedProjects from "./components/DetailedProjects";
import HobbyProjects from "./components/HobbyProjects";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader"; // Import the Loader component
import { useState, useEffect } from "react";
import Experience from "./components/Experience";

const HomePage = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="min-h-screen bg-background text-foreground"
  >
    <Navbar />
    <About />
    <SkillSet />
    <Experience />
    <Projects />
    <Certifications />
    <Contact />
    <Footer />
  </motion.div>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay (you can replace this with actual data fetching)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds delay - adjust as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <ThemeProvider>
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-background z-50"
          >
            <Loader />
          </motion.div>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/detailed-projects" element={<DetailedProjects />} />
            <Route path="/hobby-projects" element={<HobbyProjects />} />
          </Routes>
        )}
        <Toaster position="top-center" reverseOrder={false} />
      </ThemeProvider>
    </Router>
  );
};

export default App;
