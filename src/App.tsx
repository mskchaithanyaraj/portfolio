import { motion } from "framer-motion";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import About from "./components/About";
import SkillSet from "./components/SkillSet";
import Certifications from "./components/Certifications";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <ThemeProvider>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-background text-foreground"
      >
        <Navbar />
        <About />
        <SkillSet />
        <Certifications />
        <Projects />
        <Contact />
        <Footer />
      </motion.div>
      <Toaster position="top-center" reverseOrder={false} />
    </ThemeProvider>
  );
};

export default App;
