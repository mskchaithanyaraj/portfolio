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
import { Toaster } from "react-hot-toast";

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
    <Projects />
    <Certifications />
    <Contact />
    <Footer />
  </motion.div>
);

const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/detailed-projects" element={<DetailedProjects />} />
        </Routes>
        <Toaster position="top-center" reverseOrder={false} />
      </ThemeProvider>
    </Router>
  );
};

export default App;
