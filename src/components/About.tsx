import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "@/contexts/ThemeContext";
import { Typewriter } from "react-simple-typewriter";
import "../styles/globals.css";
import "@fontsource/audiowide";
import "@fontsource/press-start-2p";

const About = () => {
  const { theme } = useTheme();
  return (
    <motion.section
      id="about"
      className="py-20 bg-muted"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-foreground mb-8">
          About Me
        </h2>
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
              <div className="flex justify-center relative">
                {/* Gradient Dotted Circle for Dark Theme */}
                {theme === "dark" && (
                  <div
                    className="absolute top-[-8px] h-52 w-52 rounded-full animate-spin-slow"
                    style={{
                      background:
                        "conic-gradient(from 180deg, #1e3a8a, #3b82f6, #2563eb, #1e3a8a)",
                      WebkitMask:
                        "radial-gradient(closest-side, transparent 80%, black 100%)",
                      mask: "radial-gradient(closest-side, transparent 80%, black 100%)",
                    }}
                  ></div>
                )}

                {/* Ocean Blue Gradient Dotted Circle for Light Theme */}
                {theme === "light" && (
                  <div
                    className="absolute top-[-8px] h-52 w-52 rounded-full animate-spin-slow"
                    style={{
                      background:
                        "conic-gradient(from 180deg, #00bfff, #87cefa, #1e90ff, #00bfff)",
                      WebkitMask:
                        "radial-gradient(closest-side, transparent 80%, black 100%)",
                      mask: "radial-gradient(closest-side, transparent 80%, black 100%)",
                    }}
                  ></div>
                )}
                {/* Profile Image */}
                <img
                  src="/assets/profile.jpg"
                  alt="Developer"
                  className="rounded-full shadow-lg h-48 w-48 object-cover z-10"
                />
              </div>

              <div className="container mx-auto px-4 py-12 text-center space-y-8">
                <h1 className="font-press text-2xl md:text-2xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text tracking-wide">
                  <Typewriter
                    words={["Hi, I'm Sri Krishna Chaithanya Raj Masimukku"]}
                    cursor
                    cursorStyle="❤"
                    typeSpeed={90}
                  />
                </h1>

                <ul className="list-disc text-md bg-gradient-to-r from-blue-500 to-green-400 text-transparent bg-clip-text text-left mx-auto w-fit space-y-4 pl-5 font-audiowide">
                  <li>
                    I believe in using my skills to help others and make their
                    lives easier and more fulfilling.
                  </li>
                </ul>

                <div className="flex flex-wrap gap-3 items-center justify-center">
                  <a
                    href="#projects"
                    className="inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-5 py-3 rounded-2xl hover:scale-105 transition-transform shadow-lg font-medium tracking-wide text-sm"
                  >
                    See My Work
                  </a>
                  <a
                    href="/assets/resume.pdf" // Ensure the file is in the public folder
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-5 py-3 rounded-2xl hover:scale-105 transition-transform shadow-lg font-medium tracking-wide text-sm"
                  >
                    View Resume
                  </a>
                  <a
                    href="/assets/resume.pdf" // Replace with your actual resume file path
                    download="Sri_Krishna_Resume.pdf" // Set the download filename
                    className="inline-block bg-gradient-to-r from-green-500 to-teal-500 text-white px-5 py-3 rounded-2xl hover:scale-105 transition-transform shadow-lg font-medium tracking-wide text-sm"
                  >
                    Download Resume
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.section>
  );
};

export default About;
